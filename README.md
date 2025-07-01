# 📱 Student Nest Mobile 

Welcome to **Student Nest Mobile**, the modern mobile-first frontend for the Student Nest platform—your all-in-one solution for student housing, apartment bookings, and property management. Built with React, Vite, Capacitor, and a beautiful Shadcn UI, this app brings seamless apartment discovery, booking, and communication to your fingertips.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [📜 Available Scripts](#-available-scripts)
- [🗂️ Folder Overview](#️-folder-overview)
- [🧩 Main Pages & Components](#-main-pages--components)
- [🔌 Services & Integrations](#-services--integrations)
- [🧬 Data Models](#-data-models)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🙌 Credits](#-credits)

---

## ✨ Features

- **Mobile-First UI** with responsive layouts and smooth navigation
- **User Authentication & Roles** (student, owner, admin)
- **Apartment Listings & Filters** (search, recommendations, map view)
- **Booking System** (students can book, owners can manage)
- **Payments Integration** (Lahza payment gateway)
- **Chat & Messaging** (between students and owners)
- **Notifications System** (real-time updates)
- **Owner Dashboard** (manage properties, bookings, messages)
- **Profile Management** (account settings, notifications)
- **Blog & News** (carousel, hero, categories)
- **Modern UI Components** (Shadcn UI, Radix, Tailwind)
- **Dark/Light Theme Support**

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Mobile:** Capacitor (iOS/Android/PWA)
- **UI:** Shadcn UI, Radix UI, Tailwind CSS
- **State Management:** React Context API
- **API Integration:** Axios, Supabase (for auth/data)
- **Routing:** React Router DOM
- **Forms & Validation:** React Hook Form, Zod
- **Charts & Visuals:** Recharts
- **Other:** Framer Motion, Sonner (toasts), Lucide Icons

---

## 📁 Project Structure

```
Student-Nest-Mobile/
├── src/
│   ├── components/      # All UI and feature components
│   ├── contexts/        # React context providers (auth, theme)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Main app pages (Home, Apartments, Profile, etc.)
│   ├── services/        # API and business logic services
│   ├── types/           # TypeScript type definitions
│   ├── index.css        # Tailwind and global styles
│   └── App.tsx          # App entry point
├── module/              # Backend integration helpers/types
├── my-app/              # Capacitor shell and config
├── public/              # Static assets
├── package.json         # Project metadata, scripts, dependencies
└── README.md            # This file
```

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/StudentNest-ps/Student-Nest-Mobile.git
   cd Student-Nest-Mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   - Visit [http://localhost:5173](http://localhost:8080) in your browser.
   - For mobile/PWA: Use Capacitor to run on iOS/Android (see Capacitor docs).

---

## 📜 Available Scripts

- `npm run dev` — Start the Vite development server
- `npm run build` — Build the app for production
- `npm run build:dev` — Build in development mode
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint on the codebase

---

## 🗂️ Folder Overview

### `/src/components`
- **UI/** — Reusable UI primitives (buttons, dialogs, forms, toasts, etc.)
- **Apartments/** — Apartment cards, filters, details, recommendations, map
- **Auth/** — Sign-in and sign-up forms
- **Blog/** — Blog hero, carousel, articles, newsletter
- **Chat/** — Chat interface and modal
- **Dashboard/** — Stats, properties, users tables
- **Layout/** — Mobile layout, navbar, bottom nav
- **Owner/** — Owner's apartments, bookings, messages, property modals
- **Profile/** — Account settings modal
- **Student/** — Student messages list

### `/src/pages`
- **Home.tsx** — Landing page with features and CTA
- **Apartments.tsx** — Browse and filter apartments
- **BookingConfirmation.tsx** — Confirm and pay for bookings
- **Bookings.tsx** — Student's bookings management
- **OwnerDashboard.tsx** — Owner's property and booking management
- **Profile.tsx** — User profile and settings
- **Chat.tsx** — Messaging interface
- **Blog.tsx** — Blog/news section
- **SignIn.tsx / SignUp.tsx** — Auth pages
- **NotFound.tsx** — 404 page

### `/src/services`
- **auth.service.ts** — Authentication logic
- **booking.service.ts** — Booking API and logic
- **chat.service.ts** — Messaging API
- **lahzaPayments.service.ts** — Payment integration
- **notification.service.ts** — Notifications API
- **owner.service.ts** — Owner-specific API
- **property.service.ts** — Apartment/property API
- **admin.service.ts** — Admin dashboard API
- **api.ts** — Axios instance and base API config

### `/src/contexts`
- **AuthContext.tsx** — Auth state and user context
- **ThemeContext.tsx** — Light/dark theme context

### `/src/hooks`
- **use-mobile.tsx** — Mobile device detection
- **use-toast.ts** — Toast notification hook

### `/module`
- **services/** — Backend integration helpers (auth, payment, property, etc.)
- **types/** — Shared backend types (Admin, Owner, Property, Student)

---

## 🧩 Main Pages & Components

- **Home:** Welcome, features, and quick navigation
- **Apartments:** List, filter, and view apartment details (with map and recommendations)
- **Booking Confirmation:** Select dates, pay, and confirm booking
- **Bookings:** Manage student bookings, cancel, pay, or contact owner
- **Owner Dashboard:** Manage properties, bookings, add/edit apartments, view messages
- **Profile:** View and edit user info, account settings, notifications
- **Chat:** Real-time messaging between students and owners
- **Blog:** News, tips, and articles for students
- **UI Components:** Buttons, dialogs, forms, toasts, tables, charts, and more (see `/src/components/UI`)

---

## 🔌 Services & Integrations

- **Supabase:** Authentication and backend data
- **Lahza Payments:** Secure online payment processing
- **Axios:** API requests and error handling
- **Capacitor:** Native mobile features (camera, splash screen, etc.)
- **Sonner:** Toast notifications
- **Radix UI:** Accessible UI primitives

---

## 🧬 Data Models

- **User:** id, name, email, role (student/owner/admin)
- **Apartment/Property:** id, name, description, price, address, amenities, ownerId, availableFrom/To
- **Booking:** id, apartmentId, studentId, date range, status, totalPrice
- **Message:** id, senderId, receiverId, propertyId, message, timestamp
- **Notification:** id, userId, message, type, seen

> See `/src/types` and `/module/types` for full TypeScript definitions.

---

## 🤝 Contributing

Contributions are welcome! 💡 Please open an issue or submit a pull request for any feature requests, bug fixes, or improvements.

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙌 Credits

- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), [Capacitor](https://capacitorjs.com/), [Shadcn UI](https://ui.shadcn.com/), and [Tailwind CSS](https://tailwindcss.com/).
- Icons by [Lucide](https://lucide.dev/).
- Charts by [Recharts](https://recharts.org/).
- Toasts by [Sonner](https://sonner.emilkowal.ski/).

---

## 👥 Contributors

- <a href="https://github.com/mkittani" target="_blank"></a> [**mkittani**](https://github.com/mkittani)
- <a href="https://github.com/OsamaSalah-7" target="_blank"></a> [**OsamaSalah-7**](https://github.com/OsamaSalah-7)
- <a href="https://github.com/Hadi87s" target="_blank"></a> [**Hadi87s**](https://github.com/Hadi87s)
