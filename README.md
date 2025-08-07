# 📷 Infinite Scroll Gallery App

A responsive photo feed app built with React and Vite. It fetches images from the Pexels API and displays them in an infinite scroll layout. Users can favourite images, favourites persist in localStorage.

---

## 🚀 Features

- Infinite scroll photo loading
- Favourite toggle with persistent state
- Responsive images (with `srcSet`)
- Lazy loading for better performance
- Unit tests with Vitest

---

## 🚀 Getting Started

This project uses [Vite](https://vite.dev/) with React and npm.

### 1. Clone the repository

```bash
git clone https://github.com/Eka1984/infinite-scroll-gallery-app.git
cd infinite-scroll-gallery-app

```

### 2. Install dependencies

```bash

npm install

```

### 3. Start the development server

```bash

npm run dev

```

---

## 📁 Folder Structure

```bash
src/
├── components/               # UI components
│   ├── __tests__/           # Tests for components
│   ├── ImageCard.module.css
│   └── ImageCard.tsx
├── hooks/                   # Custom React hooks
│   ├── useInfinitePhotos.ts
│   ├── useLocalFavourites.ts
│   └── useScrollToBottom.ts
├── types/                   # TypeScript types
│   └── photo.ts
├── utils/                   # Utility functions
│   ├── __tests__/           # Tests for utils
│   └── pexelsApi.ts
├── App.module.css
├── App.tsx
├── index.css
├── main.tsx
├── setupTests.ts
└── vite-env.d.ts

root/
├── .env # Contains the Pexels API key
├── .gitignore
├── eslint.config.js
├── homework-assignment.md
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts

```

---

## 🧪 Running Tests

```bash

npx vitest

```

---

## 🛠 Tech Stack

- **React + Vite**
- **TypeScript**
- **CSS Modules**
- **Vitest** (for testing)
- **localStorage API**
- **Pexels API**

---

## 💬 Final Thoughts

This assignment was a fun challenge and a great opportunity to apply skills I already had some experience with, like React, APIs, and responsive web design, while also developing new ones. I got to dive deeper into TypeScript, try out testing with Vitest, and implement features like infinite scroll and responsive images for the first time.

Thanks for checking it out!

---

## 🎬 Demo

![Demo of the app](public/demo.gif)
