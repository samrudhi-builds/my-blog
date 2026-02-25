# Blog Development Plan — `samrudhi-builds/my-blog`

**Author:** Samrudhi B — Software Engineer • Full-Stack Developer • UI/UX Designer  
**Portfolio:** https://samrudhib-portfolio.web.app/  
**Blog URL:** https://elysian0987.github.io/my-blog  
**Substacks:** [Containers & Coffee](https://containersandcoffee.substack.com/) • [Frames & Frappes](https://framesandfrappes.substack.com/)

---

## Phase 1 — Housekeeping & Config

### 1.1 Personalize `_config.yml`
Replace all placeholder values with real ones:

```yaml
title: Samrudhi Builds         # or "Containers & Coffee" to align with Substack
email: samrudhib24@gmail.com
description: >-
  B.Tech IT student with Honors in Cybersecurity at KJSCE. Writing about
  blockchain, cybersecurity, full-stack development, and building things that matter.
github_username: samrudhi-builds
# remove twitter_username or replace with your actual handle
```

### 1.2 Add `.gitignore`
- [ ] Create `.gitignore` with:
  ```
  _site/
  .jekyll-cache/
  .sass-cache/
  Gemfile.lock
  ```
- [ ] Remove `_site/` from version control: `git rm -r --cached _site/`

---

## Phase 2 — Core Pages

### 2.1 Rewrite `about.markdown`
Replace the Jekyll boilerplate entirely. Include:
- [ ] Bio — B.Tech IT w/ Honors in Cybersecurity @ KJSCE, Mumbai
- [ ] What you build: blockchain systems, cybersecurity tools, full-stack apps, UI/UX
- [ ] Highlight 2–3 achievements (climate hackathon ₹1.5L win, Commonwealth challenge, Springer publication)
- [ ] Links to: GitHub (`samrudhi-builds`), LinkedIn (`samrudhi-b-4564a1258`), portfolio, Substacks, email

### 2.2 Upgrade `index.markdown` (Home Page)
Currently only shows a certifications list. Improve to:
- [ ] Add a short intro paragraph ("B.Tech IT student building at the intersection of cybersecurity, blockchain, and design.")
- [ ] Add a "Featured Projects" or "Currently Building" section (e.g. Blockchain Voting System)
- [ ] Keep certifications — move them under a collapsible section or a dedicated page
- [ ] Add links to Substack newsletters

---

## Phase 3 — Blog Posts

Each post: `_posts/YYYY-MM-DD-title.markdown`

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD HH:MM:SS +0000
categories: [blockchain, cybersecurity]
description: "One-line summary for SEO and feed previews."
---
```

### Post Roadmap — Ordered by Impact & Ease

#### Tier 1 — Write First (story-driven, unique to you)

| # | Title | Category | Source Material |
|---|-------|----------|-----------------|
| 1 | How We Won the Ekonnect Climate Hackathon | hackathon, AI | Ekonnect win — satellite data, ₹1.5L grant, U.S. Consulate |
| 2 | Building Under the Commonwealth Secretariat | governance, leadership | Commonwealth Digital Prototyping Challenge |
| 3 | What Is CADWAS? My Work on a Bitcoin Forensics Tool | blockchain, cybersecurity | EUCLID Lab internship |
| 4 | From Intern to Researcher: My ML Journey at Prodigy InfoTech | machine-learning | ML Internship @ Prodigy InfoTech |

#### Tier 2 — Technical Deep Dives (showcase your skills)

| # | Title | Category | Source Material |
|---|-------|----------|-----------------|
| 5 | Building CanUscrape: A Ruby Recon Tool for Ethical Hackers | ruby, cybersecurity, OSINT | CanUscrape project |
| 6 | Nmap Security Dashboard: Visualizing Network Scans with Python | python, cybersecurity | Nmap Security Dashboard project |
| 7 | Designing a Blockchain Voting System for Indian Elections | blockchain, smart-contracts | Blockchain Voting System (ongoing) |
| 8 | What I Built at MeshCraft: Full-Stack in the Real World | full-stack, internship | MeshCraft Web Dev internship |

#### Tier 3 — Learning & Reflection (accessible, good for SEO)

| # | Title | Category | Source Material |
|---|-------|----------|-----------------|
| 9 | Web App Pentesting with Burp Suite and DVWA | cybersecurity | Academic security testing project |
| 10 | Building an Expense Tracker with Python + MySQL | python, data | Data Science internship @ KJSCE |
| 11 | Nokogiri for Beginners: Web Scraping with Ruby | ruby, web-scraping | NokogiriExplore project |
| 12 | My Springer Publication: Research Process Explained | research, publication | ICICCT-2025 paper |
| 13 | Why I'm Building a Decentralized Voting Platform | blockchain, civic-tech | Blockchain Voting System context |
| 14 | Literary Ledger: Building a Book Tracker with Next.js + Supabase | nextjs, full-stack | Literary Ledger project |

---

## Phase 4 — Visual & UX Improvements

### 4.1 Custom Styling
- [ ] Create `assets/css/custom.css` — override Minima with your own palette
- [ ] Suggested aesthetic: warm, coffee-toned (aligns with "Containers & Coffee" and "Cozy Coffee & Curated Reads" brand)
- [ ] Override via `_includes/head.html` (copy from Minima gem source)

### 4.2 Override Minima Layouts
- [ ] Run `bundle info --path minima` to locate theme files
- [ ] Copy `_layouts/home.html` and `_layouts/post.html` into your repo to customize
- [ ] Add author bio block at the bottom of each post layout

### 4.3 Favicon
- [ ] Use a coffee-cup or code-bracket icon to match your brand
- [ ] Place in `assets/` and link via `_includes/head.html`

---

## Phase 5 — SEO & Discoverability

- [ ] Add `jekyll-seo-tag` plugin:
  - `Gemfile`: `gem "jekyll-seo-tag"`
  - `_config.yml` plugins: `- jekyll-seo-tag`
  - Adds Open Graph, Twitter Card, and canonical URL tags automatically
- [ ] Add per-post `description:` in front matter
- [ ] Cross-link blog posts from your portfolio at `samrudhib-portfolio.web.app`
- [ ] Link to the blog from both Substacks ("long-form technical posts live here")

---

## Phase 6 — GitHub Pages Deployment Check

- [ ] Confirm GitHub Pages source: Settings → Pages → `main` branch, `/ (root)`
- [ ] Confirm `_config.yml` values:
  ```yaml
  baseurl: "/my-blog"
  url: "https://elysian0987.github.io"
  ```
- [ ] After each push to `main`, check the Actions tab for Jekyll build errors
- [ ] Test all internal links after deployment (especially if `baseurl` is set)

---

## Suggested Execution Order

```
Phase 1 (30 min)  →  Phase 2 (1–2 hrs)  →  Tier 1 posts (1 post/week)
                                                      ↓
                                        Phase 6 deployment check
                                                      ↓
                                     Tier 2 posts + Phase 4 styling
                                                      ↓
                                     Phase 5 SEO + Tier 3 posts (ongoing)
```

---

## Content Identity

| Property | Value |
|---|---|
| Voice | Technical but personal — "I built this, here's what I learned" |
| Audience | Recruiters, fellow CS students, open-source community |
| Differentiator | Real internships + real hackathon wins + real published research |
| Brand alignment | "Containers & Coffee" — keep the warm, curious, builder energy |

---

## Quick Reference — Run Locally

```bash
bundle install
bundle exec jekyll serve
# Visit: http://localhost:4000/my-blog
```
