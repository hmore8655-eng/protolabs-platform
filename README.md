# ProtoLabs — Full-Stack Engineering Platform

> **BUILD • EXPERIMENT • INNOVATE — Electronics • Telecommunication • Real Solutions**

ProtoLabs is a full-stack engineering marketplace, hardware showcase, and proposal management platform designed for electronics, telecommunications, IoT, robotics, and embedded systems. Founded by **Harsh More** at Narhe, Pune.

---

## 🌟 Platform Highlights

- **Interactive Engineering Catalog**: Dynamic catalog of industry-grade hardware prototypes, schematics, PCB designs, robotics vehicles, and CST/HFSS RF antennas with real-time category filtering and INR pricing.
- **Client Inquiry & Proposal System**: Interactive inquiry submission wizard allowing clients to select pre-defined solutions or submit custom engineering specifications.
- **Interactive 3D Hardware Cards**: Modern CSS 3D perspective mouse-tilt cards with dynamic light glare effects and pure vector hardware badges.
- **Admin Management Portal**: Secure administrative portal to manage catalog offerings, reorder items, quote client milestones, and configure site settings.
- **Persistent Cloud Database**: Connected to MongoDB Atlas cloud database ensuring all dynamic inquiries, chat threads, and catalog updates survive server spin-downs.
- **Production SEO & Rich Snippets**: Fully indexed on Google with JSON-LD Schema.org structured data (`ProfessionalService`, `WebSite`), custom XML sitemap, and robots.txt crawler optimization.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Vanilla CSS Design System, Responsive 3D Canvas & Micro-Animations |
| **Backend** | Node.js, Express.js REST API, Multer (schematic & BOM uploads), Nodemailer |
| **Database** | MongoDB Atlas (Persistent Cloud Storage) + Local Failover Cache |
| **Security** | JWT (JSON Web Tokens), Bcrypt password hashing |
| **Deployment** | Render Web Services, Cloudflare SSL |

---

## 📁 Project Architecture

```text
protolabs-platform/
├── public/                 # Static assets, sitemap.xml, robots.txt, favicon.svg
├── server/
│   ├── data/               # Local JSON database failover cache
│   ├── services/           # Authentication, email, and notification services
│   ├── db.cjs              # Database abstraction with MongoDB Atlas cloud sync
│   └── index.cjs           # Express REST API server endpoints
├── src/
│   ├── components/
│   │   ├── admin/          # Admin dashboard, project editor, inquiries manager
│   │   ├── public/         # Hero section, project catalog, contact forms, navbar, footer
│   │   └── common/         # Pure SVG hardware icons and brand vectors
│   ├── context/            # Global React application state (AppContext)
│   ├── data/               # Initial verified engineering solutions
│   ├── services/           # Frontend API client service
│   ├── App.jsx             # Root layout and view controller
│   └── main.jsx            # React application entry point
├── package.json            # Node.js dependencies and scripts
└── vite.config.js          # Vite build configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# 1. Clone repository
git clone https://github.com/hmore8655-eng/protolabs-platform.git
cd protolabs-platform

# 2. Install dependencies
npm install

# 3. Start development server (Frontend + Backend)
npm run dev
```

- **Frontend Application**: `http://localhost:5173`
- **Backend REST API**: `http://localhost:5000/api`

---

## 🌐 Environment Variables (Production)

To run the application in a production environment (such as Render), configure the following environment variables in your hosting dashboard:

| Variable | Description |
| :--- | :--- |
| `PORT` | Server listening port (default: 5000) |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Secure secret key for signing admin authentication tokens |
| `ADMIN_EMAIL` | Admin account login email |
| `ADMIN_PASSWORD` | Admin account secure password |

---

## 👨‍💻 Founder & Contact Info

- **Founder & Lead Specialist**: Harsh More
- **Location**: Narhe, Pune - 411041, Maharashtra, India
- **Email**: [protolabs26@gmail.com](mailto:protolabs26@gmail.com)
- **Phone**: +91 8856082411
- **UPI ID**: `hmore8655@okicici`
- **GitHub**: [@hmore8655-eng](https://github.com/hmore8655-eng)
- **LinkedIn**: [Harsh More](https://www.linkedin.com/in/harsh-more-593a87300)

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
