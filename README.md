# briantruong.page

Personal portfolio website built with [Astro](https://astro.build), hosted on GitHub Pages.

**Live site:** [www.briantruong.page](https://www.briantruong.page)

## Features

- **Portfolio** — Work experience, education, publications, certifications, and projects
- **Blog** — Three categories: Life & Thoughts, Food, and Art
- **Loading screen** — Animated percentage counter on first visit
- **CRT TV animation** — Retro TV frame on the homepage playing a demo video
- **Dark theme** — Custom color scheme with Creato Display typography
- **Responsive** — Mobile-friendly layout with proper breakpoints
- **Content collections** — Zod-validated Markdown content for blog posts, experience, projects, education, and publications

## Tech Stack

- **Astro 4** — Static site generator
- **TypeScript**
- **Vanilla CSS** — Custom properties, animations, media queries
- **GitHub Pages** — Hosting & deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── pages/           # Astro page routes (index, about, experience, projects, blog)
├── content/         # Markdown content collections
├── components/      # Reusable components (Nav, Footer, BlogCard)
├── layouts/         # BaseLayout, BlogPost layout
└── styles/          # Global CSS
public/
├── fonts/           # Creato Display font files
├── images/          # Photos and assets
└── videos/          # Demo video
```
