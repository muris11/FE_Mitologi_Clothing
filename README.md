# Mitologi Clothing - Frontend Storefront

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel" alt="Vercel">
</p>

A high-performance, premium e-commerce storefront for **Mitologi Clothing**, built with the latest Next.js features and optimized for speed and conversion.

## ✨ Features

- **Next.js App Router:** Optimized for SEO and fast initial page loads using Server Components.
- **Premium UI/UX:** Stunning animations powered by Framer Motion and a curated color palette.
- **Shopping Cart:** Seamless session-based cart experience with instant updates.
- **AI-Powered Recommendations:** Dynamic product suggestions fetched from the Python AI microservice.
- **Payment Integration:** Secure checkout via Midtrans Snap API.
- **Responsive Design:** Mobile-first approach ensuring a perfect experience on all devices.
- **Performance:** Optimized images, code splitting, and edge caching for sub-second page loads.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** React Context & Hooks
- **Payment Gateway:** Midtrans
- **Testing:** Playwright (E2E) & Vitest

## 📦 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muris11/FE_Mitologi_Clothing.git
   cd FE_Mitologi_Clothing
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env` file based on `.env.example`:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8011/api"
   NEXT_PUBLIC_AI_SERVICE_URL="http://localhost:8001"
   NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-client-key"
   NEXT_PUBLIC_MIDTRANS_SNAP_URL="https://app.sandbox.midtrans.com/snap/snap.js"
   ```

4. **Run Development Server:**
   ```bash
   pnpm dev
   ```
   *Visit `http://localhost:3000` to see the storefront.*

## 📖 Key Directories

- `/app`: Routing and layout logic using Next.js App Router.
- `/components`: Reusable UI components (Shop, Landing, Shared).
- `/lib`: API client logic, utility functions, and hooks.
- `/public`: Static assets and brand imagery.

## 🧪 Testing

Run E2E tests to ensure critical flows (Checkout, Login) are working:
```bash
pnpm exec playwright test
```

## 📄 License

The Mitologi Clothing Frontend is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
