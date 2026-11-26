# Aakash R Madhavi — Portfolio

A fast, dependency-free portfolio site for a Full Stack .NET Developer working in
fintech — plus a refreshed, print-ready résumé that matches it.

Everything is plain HTML, CSS and JavaScript. No build step, no framework, no npm
install. Open `index.html` and it works.

---

## What's inside

| File | Purpose |
| --- | --- |
| `index.html` | The portfolio: hero, about, skills, experience, projects, recognition, education, contact |
| `assets/css/style.css` | Design system, layout, dark/light themes, responsive rules, print styles |
| `assets/js/main.js` | Theme toggle, mobile nav, scroll reveal, counters, project filters, active-section nav |
| `resume.html` | Updated résumé, styled for the screen and for A4 printing |
| `Aakash_Madhavi_Resume_Updated.pdf` | Two-page PDF generated from `resume.html` |
| `README.md` | This file |

---

## Preview it

**Simplest:** double-click `index.html`.

**With a local server** (recommended if you later add assets or deploy):

```powershell
cd D:\portfolio
npx serve .
```

Then open the URL it prints (usually `http://localhost:3000`).

---

## Before you publish — 3 things to update

1. **LinkedIn URL.** In `index.html`, find `https://www.linkedin.com/in/` and replace
   it with your full profile URL. Do the same in `resume.html`.
2. **Confirm the availability/contact copy.** The contact section is deliberately
   neutral. If you're actively job hunting, consider adding a line like
   "Open to full-time roles — immediate joiner."
3. **Résumé filename.** The site links to `Aakash_Madhavi_Resume_Updated.pdf`.
   Keep that name, or update the link in `resume.html` and the hero button.

Optional polish:

- Add a GitHub link (contact section) if you want code samples public.
- Add a custom domain and update the Open Graph tags in `index.html`.
- Swap client names in the marquee if any engagement is under strict NDA.

---

## The résumé

`resume.html` is a screen-friendly A4 document with a print stylesheet. It contains
the same content as the portfolio, tightened for two pages:

- Updated summary and skills grouped for ATS keyword matching
- Quantified impact (50K+ daily transactions, 20% productivity, 5 developers led)
- Selected projects and a compact "Impact at a glance" block

**To regenerate the PDF** after editing `resume.html` (Chrome or Edge installed):

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="D:\portfolio\Aakash_Madhavi_Resume_Updated.pdf" `
  "file:///D:/portfolio/resume.html"
```

Or just open `resume.html` in a browser and click **Print / Save as PDF** — choose
A4, margins "Default", and enable background graphics.

---

## Deploying

### GitHub Pages (free, permanent URL)

This site is static, so it deploys straight from the `main` branch — no build step
and no GitHub Actions minutes required.

1. Create a repository named `aakash-madhavi.github.io` (replace with your username)
   or any name, e.g. `portfolio`.
2. Upload the contents of this folder (not the folder itself).
3. In **Settings → Pages**, set *Source* to `Deploy from a branch`, branch `main`,
   folder `/ (root)`.
4. Your site appears at `https://<username>.github.io/` (or `/<repo>/`).

### Netlify (drag and drop)

Go to <https://app.netlify.com/drop>, drag the `portfolio` folder in, done. You can
rename the subdomain afterwards.

### Vercel

```powershell
npx vercel --prod
```

No framework preset needed — it's static HTML.

---

## How it's built

- **No dependencies.** Google Fonts is the only external request; everything else is
  local. The page works offline too (fonts fall back to system sans-serif).
- **Responsive** from 320 px phones to wide desktops.
- **Dark and light themes**, remembered in `localStorage`, defaulting to your OS
  preference.
- **Accessible:** semantic landmarks, skip link, keyboard-visible focus rings,
  `aria-expanded` on the mobile menu, reduced-motion support, and readable contrast.
- **Content-first:** every claim on the site comes from the résumé. No invented
  employers, dates or metrics.

### Customising the look

All colours and type live at the top of `assets/css/style.css`:

```css
:root {
  --accent: #38bdf8;   /* primary accent */
  --accent-2: #818cf8; /* gradient partner */
  --accent-3: #34d399; /* success / highlight */
  --bg: #060a12;       /* page background */
}
```

Change those four values and the whole site re-skins, including the light theme
([data-theme="light"] block directly below).

---

Built by hand for Aakash R Madhavi. Update the content, keep the craft.
