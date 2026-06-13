# Shree Radhe Shyam Bhakti Sarover Trust

An elegant, robust, and fully responsive platform built for the Shree Radhe Shyam Bhakti Sarover Trust. This application serves as the primary digital presence for the NGO, featuring a dynamic frontend for visitors and a comprehensive, secure admin dashboard for internal management.

## 🌟 Key Features

- **Modern & Premium Design**: Custom design system with a dark, gold, and charcoal aesthetic. Fluid typography and responsive layouts.
- **Razorpay Integration**: Production-ready, secure payment gateway integration for seamless online donations (with strict backend HMAC signature verification).
- **Offline Donations & Currency Conversion**: Log offline donations in multiple currencies (USD, EUR, GBP) via the Admin Panel, powered by the Open Exchange Rates API for live conversion to INR.
- **Dynamic Content Management**: Fully dynamic CMS built into the admin dashboard allowing administrators to edit homepage text, testimonials, and upload images to Cloudinary.
- **Secure Admin Panel**: NextAuth.js Google OAuth integration restricted to specific admin email addresses.
- **Color & Theme Versioning**: Admins can change the entire color scheme of the site on the fly, with revisions automatically saved to the database.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/) (Mongoose)
- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/)
- **Media Storage**: [Godaddy Hosting](https://godaddy.com/)
- **Payments**: [Razorpay](https://razorpay.com/)
- **Currency Conversion**: [Open Exchange Rates](https://openexchangerates.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd shreeradheshyamtrust
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the following keys. Make sure to replace the placeholder values with your actual credentials:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
AUTH_SECRET=your_generated_auth_secret
AUTH_URL=http://localhost:3000

# Google OAuth (For Admin Login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Allowed Admin Emails (comma separated)
ADMIN_EMAILS=your_email@gmail.com

# Cloudinary (For Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay (For Donations)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id

# Open Exchange Rates (For Currency Conversion)
OPEN_EXCHANGE_APP_ID=your_open_exchange_app_id
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. To access the admin panel, navigate to `/admin`.



## 📄 License
All rights reserved © Shree Radhe Shyam Bhakti Sarover Trust.
