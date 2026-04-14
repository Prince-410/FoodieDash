# 🍔 FoodieDash

FoodieDash is a premium, real-time food delivery frontend platform built for beautiful user experiences and deep administrative control. From an intuitive storefront with dynamic carts to an advanced real-time Admin Panel loaded with analytics, FoodieDash provides a frictionless, full-loop delivery mock experience.

![FoodieDash Preview](https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000)

## 🚀 Live Demo
**👉 [https://foodiedash.vercel.app](https://foodiedash.vercel.app)**

## ✨ Key Features
- **Real-Time Admin Dashboard**: Fully integrated animated charts (Recharts) that mathematically update in real-time based on live active `orders` and user purchases.
- **Integrated Admin Message Center**: A fully functioning "Contact Us" routing system, complete with a specialized Admin Inbox to securely view, answer, read, and delete user inquiries.
- **Glassmorphic Aesthetic UI**: Powered by Framer Motion, incorporating premium design tokens, beautiful micro-animations, and vibrant color gradients.
- **State Management**: Zero-lag instantaneous state updates engineered entirely through Zustand, serving as a powerful local, rapid-access database.
- **Authentic Integrated Imagery**: Verified curated Unsplash photography dynamically tied into global cuisine tags for the highest visual appeal.
- **Static Documentation Routes**: Seamless SPA generation of Help, Blogs, Policies, and more.

## 🛠️ Tech Stack
- **Framework**: React 18, Vite
- **Routing**: React Router DOM v6 (Configured securely with Vercel rewrites)
- **State Management**: Zustand global store
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Hosting**: Vercel

## 🔑 Admin Access
To test the powerful administrative capabilities, log in with the following credentials via the `/login` route:
- **Email**: `aditya@example.com`
- **Password**: *(Any password, e.g., `123456`)*

Once authenticated, navigate to the **Admin Dashboard** (`/admin`) to experiment with live analytics formatting, order assignments, and user metadata!

## 💻 Local Setup & Installation
Want to run the platform locally on your own machine? 

1. **Clone the repository and move to your project folder**:
```bash
git clone <your-repo-link>
cd foodiedash
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the local Vite development server**:
```bash
npm run dev
```

The application will be running live on `localhost:5173`. 

---

### Folder Structure Overview
* `src/pages/admin/` — All advanced real-time CRM routing code and data-crunching panels.
* `src/store/` — Features `useStore.js` and `data.js` holding the complete structural JSON logic arrays mapping across the site.
* `src/components/` — General UI layout bounds including Navigation, integrated Toasts, Footers, etc.

<br>

*Built thoughtfully with modern engineering principles.*
