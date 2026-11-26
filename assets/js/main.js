/* ============================================================
   Aakash R Madhavi — Portfolio interactions
   No dependencies. Progressive enhancement only.
   ============================================================ */

(function () {
  "use strict";

  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");

  /* ---------- Theme ---------- */
  const THEME_KEY = "aakash-portfolio-theme";

  function storedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (err) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      const next = theme === "dark" ? "light" : "dark";
      themeToggle.setAttribute("aria-label", `Switch to ${next} theme`);
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#060a12" : "#f6f8fc");
  }

  const saved = storedTheme();
  const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(saved || (prefersLight ? "light" : "dark"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (err) {
        /* storage may be unavailable — theme still applies for this visit */
      }
    });
  }

  /* ---------- Sticky header state ---------- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);

    // The hero has no section id, so clear the nav highlight when we're at the top.
    if (window.scrollY < 140) {
      document.querySelectorAll(".nav-links a.is-active").forEach((link) => {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      });
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile navigation ---------- */
  function closeNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  // Stagger items that share a parent so grids cascade instead of popping together.
  const seen = new Map();
  revealItems.forEach((el) => {
    const parent = el.parentElement;
    const index = seen.get(parent) || 0;
    seen.set(parent, index + 1);
    el.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach((el) => revealObserver.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Animated counters ---------- */
  function animateCounter(el) {
    const target = Number(el.dataset.target || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const counters = Array.from(document.querySelectorAll(".counter"));
  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent = el.dataset.target + (el.dataset.suffix || "");
    });
  }

  /* ---------- Active section in nav ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const topLevelLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));

  function setActive(id) {
    topLevelLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const visible = new Set();
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // Pick the section nearest the top of the viewport among those on screen.
        let current = null;
        let best = Infinity;
        visible.forEach((id) => {
          const el = document.getElementById(id);
          const top = Math.abs(el.getBoundingClientRect().top - 120);
          if (top < best) {
            best = top;
            current = id;
          }
        });
        if (current) setActive(current);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Project filters ---------- */
  const filterButtons = Array.from(document.querySelectorAll(".filter"));
  const projectCards = Array.from(document.querySelectorAll(".project-card"));

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const categories = (card.dataset.cat || "").split(/\s+/);
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !show);
        if (show) card.classList.add("is-visible");
      });
    });
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
