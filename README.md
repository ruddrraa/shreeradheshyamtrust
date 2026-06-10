# Shree Radhe Shyam Bhakti Sarover Trust

A premium, modern spiritual trust website built with Next.js 15, featuring Gau Seva, Bhakti teachings, Naam Sankirtan, dynamic gallery, events, donations, and an admin dashboard.

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** — custom ivory, charcoal, gold, maroon palette
- **Framer Motion** — scroll reveals, parallax, premium transitions
- **MongoDB Atlas** — dynamic content storage
- **NextAuth** — Google authentication for admin
- **Cloudinary** — image uploads and optimization
- **Razorpay** — donation payments

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env.local` and fill in your credentials:

   ```bash
   cp .env.example .env.local
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

4. **Admin access**

   Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in with a Google account listed in `ADMIN_EMAILS`.

## Features

### Public Website
- Immersive hero with parallax
- Animated impact statistics
- About, pillars, and vision sections
- Masonry gallery with category filters
- YouTube video showcase
- Events with countdown timers
- Razorpay donation flow
- Testimonials and premium footer

### Admin Dashboard (`/admin`)
- Gallery management (upload, categorize, delete)
- Video management (YouTube links)
- Event management (banners, Luma links)
- Donation analytics
- Website settings (hero, contact, social, stats)

## Deployment

Deploy to Vercel and set all environment variables from `.env.example`. Ensure:

- MongoDB Atlas allows connections from your deployment IP (or `0.0.0.0/0` for Vercel)
- Google OAuth redirect URI includes your production domain
- Razorpay webhook/domain is configured for production keys

## Registration

**Shree Radhe Shyam Bhakti Sarover Trust**  
Reg. No. WB/2022/032510300209546/2022  
Howrah, Kolkata, West Bengal
