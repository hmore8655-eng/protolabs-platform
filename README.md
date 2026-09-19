# ProtoLabs — Full-Stack Engineering Platform

> **BUILD • EXPERIMENT • INNOVATE — Electronics • Telecommunication • Real Solutions**

ProtoLabs is a state-of-the-art, full-stack services marketplace and project catalog platform designed for electronics, telecommunications, IoT, and embedded systems engineering. Founded by **Harsh More** at JSPM NTC, Pune.

---

## 🌟 Key Features

- **Public Services Marketplace**: Hero banner with an interactive SVG hardware circuit diagram, pre-defined project catalog, filters, search, and a custom quote request wizard.
- **Full Admin Control Panel**: Log in as Admin (`hmore8655@gmail.com`) to add projects, set custom pricing, update deliverable checklists, review incoming client lead proposals, and manage site settings.
- **RESTful Express Backend**: Node.js REST API (`server/index.cjs`) handling projects, inquiries, portfolio items, client reviews, settings, and file uploads.
- **Clean Production Database**: Zero fake leads or dummy data — database file (`server/data/database.json`) populates strictly when actual clients submit real inquiries.
- **Auto-Responder Email Service**: Automated email notifications upon project inquiry submission and manual quote proposal dispatches.

---

## 👨‍💻 Founder & Contact Info

- **Specialist & Founder**: Harsh More
- **Contact Email**: `hmore8655@gmail.com`
- **Phone Number**: `+91 8856082411`
- **Location**: JSPM NTC, Narhe, Pune - 411041
- **Payment UPI ID**: `hmore8655@okicici`
- **GitHub**: [https://github.com/hmore8655-eng](https://github.com/hmore8655-eng)
- **LinkedIn**: [https://www.linkedin.com/in/harsh-more-593a87300](https://www.linkedin.com/in/harsh-more-593a87300)

---

## 🔐 Admin Login Credentials

- **Admin Email**: `hmore8655@gmail.com`
- **Admin Password**: `PROTOLABS@123`

---

## 🚀 Step-by-Step GitHub Push Instructions

Run the following commands inside this project directory (`C:\Users\hmore\.gemini\antigravity-ide\scratch\entc-platform`) to upload your code to your GitHub repository:

```bash
# 1. Initialize Git repository
git init

# 2. Configure Git user details (if not already set)
git config user.name "Harsh More"
git config user.email "hmore8655@gmail.com"

# 3. Stage all production files
git add .

# 4. Create your initial commit (CRITICAL: This creates the local 'main' branch!)
git commit -m "Initial release of ProtoLabs full-stack platform"

# 5. Set branch to main
git branch -M main

# 6. Link your remote GitHub repository
git remote add origin https://github.com/hmore8655-eng/protolabs-platform.git

# 7. Push to GitHub
git push -u origin main
```

> [!TIP]
> **Fixing `error: src refspec main does not match any`**:
> This error happens when you run `git push` before committing files. Make sure you run `git add .` and `git commit -m "Initial commit"` first before running `git push -u origin main`.
> If your remote GitHub repository already has a default README, run `git pull origin main --rebase` before `git push`.

---

## 🌐 Deploying Live to a Custom Domain (Render / Vercel / Railway)

### Option A: Free 1-Click Deployment on Render.com (Recommended for Full-Stack Node + Express)

1. Sign up on [Render.com](https://render.com) and link your GitHub account (`hmore8655-eng`).
2. Click **New +** -> **Web Service**.
3. Select your repository `hmore8655-eng/protolabs-platform`.
4. Set Build Command: `npm install && npm run build`
5. Set Start Command: `node server/index.cjs`
6. Add Environment Variables:
   - `ADMIN_EMAIL`: `hmore8655@gmail.com`
   - `ADMIN_PASSWORD`: `PROTOLABS@123`
   - `JWT_SECRET`: `protolabs_production_secret_8856082411`
7. Click **Create Web Service**. Your full-stack platform will be live at `https://protolabs-platform.onrender.com`!
8. **Custom Domain**: Go to **Settings** -> **Custom Domains** on Render and attach your domain (e.g. `protolabs.in` or `protolabs.com`).

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run Vite frontend & Express REST server concurrently
npm run server & npm run dev
```

- **Frontend App**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`
