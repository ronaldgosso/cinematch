# 🎬 CineMatch — Hybrid Movie Recommendation Engine

> A full-stack AI-powered web app that blends content-based and collaborative filtering to surface movies you'll actually love.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-E8001C?style=for-the-badge&logo=firefox)](https://christian-response-ai-fc241c.gitlab.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
[![Python](https://img.shields.io/badge/Python-3.9%2B-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![TMDB](https://img.shields.io/badge/Data-TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase)](https://www.themoviedb.org)
[![HuggingFace](https://img.shields.io/badge/AI-HuggingFace-FFD21E?style=for-the-badge&logo=huggingface)](https://huggingface.co)

---

## 📖 Table of Contents

- [About](#-about)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [How to Run](#-how-to-run)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Get Your HuggingFace API Key](#2-get-your-huggingface-api-key)
  - [3. Get Your TMDB API Key](#3-get-your-tmdb-api-key)
  - [4. Configure the .env File](#4-configure-the-env-file)
  - [5. Run Locally](#5-run-locally)
- [Deploy to a Server](#-deploy-to-a-server)
- [CI/CD — GitLab Pages](#-cicd--gitlab-pages)
- [CI/CD — GitHub Pages](#-cicd--github-pages)
- [Project Structure](#-project-structure)

---

## 🎯 About

CineMatch is a full-stack web application that uses a **hybrid AI approach** to provide personalized movie recommendations. The application analyzes movie metadata and user behaviour to suggest relevant films, helping users discover content they will enjoy.

The project demonstrates expertise in data science, machine learning, and modern web development — with a resilient dual-model AI architecture and an automated deployment pipeline.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎯 **Hybrid Recommendation Engine** | Combines content-based filtering and collaborative filtering for precision results |
| 📝 **TF-IDF + Cosine Similarity** | Recommends movies with similar genres, cast, and plot descriptions |
| ☁️ **Online + Offline AI** | Primary HuggingFace cloud model with automatic fallback to a local model |
| 🔁 **Automated CI/CD** | Webhook-triggered GitLab/GitHub pipelines: test → build → deploy |
| 🎞️ **Live TMDB Data** | Real-time movie posters, ratings, and metadata via TMDB API |
| 📱 **Responsive UI** | Clean HTML5/CSS3/JS front-end that works on all screen sizes |
| ⚡ **Scalable Backend** | Node.js + Express architecture designed for growth |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Front-end** | HTML5, JavaScript (ES6+), CSS3 |
| **Back-end** | Node.js, Express.js |
| **AI / ML** | Python, scikit-learn, pandas, HuggingFace Inference API |
| **Data Source** | TMDB (The Movie Database) API |
| **DevOps** | GitLab CI/CD, GitHub Actions |

---

## 🚀 How to Run

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) v18 or higher
- A free [HuggingFace](https://huggingface.co) account


---

### 1. Clone the Repository

```bash
# Clone the project
git clone https://gitlab.com/your-username/cinematch.git
cd cinematch

# Install Node.js dependencies
npm install
```

---

### 2. Get Your HuggingFace API Key 🤗

CineMatch uses HuggingFace Inference API as its primary AI model layer. Here's how to get your key in under 2 minutes:

1. Go to **[huggingface.co](https://huggingface.co)** and sign in (or create a free account)
2. Click your **profile avatar** in the top-right corner
3. Go to **Settings → Access Tokens**
4. Click **"New token"**
5. Give it a name (e.g. `cinematch-local`) and set the role to **Read**
6. Click **Generate** and copy the token — it starts with `hf_…`

> 💡 **Keep this token secret.** Never commit it to git. It goes in your `.env` file only.

---

### 3. Configure the `.env` File 🔑

The `.env` file is **already included** in the project — you just need to fill in your keys. Open it in any text editor:

```bash
# .env — fill in your values below

# ── AI Model ──────────────────────────────────────────────
HF_API_KEY=hf_your_token_here
HUGGINGFACE_MODEL=sentence-transformers/all-MiniLM-L6-v2

# ── Server ────────────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ── Offline Fallback Model ────────────────────────────────
LOCAL_MODEL_PATH=./models/local-fallback
```

**Environment variable reference:**

| Variable | Required | Description |
|---|---|---|
| `HF_API_KEY` | ✅ Required | Your HuggingFace token (`hf_…`) |
| `HUGGINGFACE_MODEL` | Optional | Any compatible sentence-transformer model |
| `LOCAL_MODEL_PATH` | Optional | Path to your offline fallback model directory |
| `PORT` | Optional | Defaults to `5000` |
| `NODE_ENV` | Optional | `development` or `production` |

---

### . Run Locally ▶️

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

The app will be live at **[http://localhost:5000](http://localhost:5000)** 🎉

---

## ☁️ Deploy to a Server

When deploying, set your `.env` variables directly in the platform's **environment / secrets dashboard** — never push secrets to git. Make sure `.env` is listed in your `.gitignore`.

### 🟢 Railway (Recommended — easiest)

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Set env vars in the Railway dashboard under **Variables**.

---

### 🔵 Render

1. Connect your GitLab or GitHub repo at [render.com](https://render.com)
2. Set **Build Command**: `npm install`
3. Set **Start Command**: `npm start`
4. Add all env vars under **Environment → Add Environment Variable**
5. Push to your main branch — Render deploys automatically

---

### 🟣 Fly.io

```bash
npm install -g flyctl
fly auth login
fly launch
fly secrets set HF_API_KEY=hf_...
fly deploy
```

---

### 🟠 Heroku

```bash
# Install Heroku CLI, then:
heroku create cinematch-app
heroku config:set HF_API_KEY=hf_...
git push heroku main
```

---

## 🔁 CI/CD — GitLab Pages

The project ships with a `.gitlab-ci.yml` that automates testing, building, and deploying static HTML to GitLab Pages on every push to `main`.

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm install
    - npm test

build:
  stage: build
  image: node:18
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - public/

pages:
  stage: deploy
  script:
    - echo "Deploying to GitLab Pages..."
  artifacts:
    paths:
      - public/
  only:
    - main
```

> The `public/` folder is the magic directory — GitLab Pages serves whatever ends up there.

---

## 🐙 CI/CD — GitHub Pages

To achieve the same automated static HTML deployment on **GitHub**, add the following workflow file to your repository:

### Step 1 — Add the workflow file

Create the file at `.github/workflows/deploy.yml`:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main          # Trigger on every push to main
  workflow_dispatch:  # Allow manual trigger from GitHub UI

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # ── Job 1: Test ────────────────────────────────────────
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

  # ── Job 2: Build ───────────────────────────────────────
  build:
    name: Build Static Files
    runs-on: ubuntu-latest
    needs: test           # Only runs if tests pass
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build
        env:
          NODE_ENV: production

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public     # Folder containing your built HTML/CSS/JS

  # ── Job 3: Deploy ──────────────────────────────────────
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 2 — Enable GitHub Pages in repository settings

1. Go to your repository on GitHub
2. Click **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Save — GitHub will now serve your `public/` folder

### Step 3 — Add secrets for environment variables

GitHub Actions does not read your `.env` file — secrets must be added to the repository:

1. Go to **Settings → Secrets and variables → Actions**
2. Click **"New repository secret"** and add each key:

| Secret Name | Value |
|---|---|
| `HF_API_KEY` | Your `hf_…` token |

3. Reference them in the workflow under `env:` if your build step needs them:

```yaml
      - name: Build project
        run: npm run build
        env:
          NODE_ENV: production
          HUGGINGFACE_API_KEY: ${{ secrets.HUGGINGFACE_API_KEY }}
          TMDB_API_KEY: ${{ secrets.TMDB_API_KEY }}
```

### GitLab vs GitHub — Quick Comparison

| | GitLab CI/CD | GitHub Actions |
|---|---|---|
| Config file | `.gitlab-ci.yml` | `.github/workflows/deploy.yml` |
| Pages folder | `public/` | `public/` (configurable) |
| Secrets | **Settings → CI/CD → Variables** | **Settings → Secrets → Actions** |
| Manual trigger | Pipelines → Run pipeline | Actions → Run workflow |
| Free tier | ✅ 400 CI mins/month | ✅ 2,000 CI mins/month |

---

## 📄 License

MIT © CineMatch Contributors

---

> Built with ❤️ using Node.js, and HuggingFace.
