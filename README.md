# Mind Flow - Smart Yoga Products Website

This repository contains the source code for **Mind Flow**, a prototype website for selling smart yoga products. The website is built using **Next.js**, providing a seamless user experience with server-side rendering, dynamic routing, and API integrations. The project also includes an admin panel for managing products, blog posts, and social media links.

---

## **Features**

### **Core Features**

1. **Homepage**

   - Attractive design showcasing smart yoga products.
   - Highlights product benefits with a clear "Shop Now" call to action.

2. **Product Listing Page**

   - Displays multiple smart yoga products with images, descriptions, and prices.
   - Each product links to a **Product Details Page**, allowing users to view more details and add items to a cart.

3. **Blog Section**

   - Lists articles on yoga and wellness with previews for users to explore.

4. **Social Media Integration**

   - Displays recent social media posts or an embedded Instagram feed.

5. **Admin Panel**
   - Add, edit, and delete products (name, description, price, image).
   - Write and publish blog articles.
   - Update social media links.

---

### **Optional Challenge**

- **Analytics Overview**
  - Basic stats page for admins to view the number of products and blog articles.

---

## **Technology Stack**

- **Frontend and Backend:** [Next.js](https://nextjs.org/)
  - Server-side rendering (SSR) for better performance and SEO.
  - API routes to manage data interactions.
  - Dynamic routing for scalability.
- **Database:** MongoDB for data storage.
- **Styling:** Tailwind CSS with DaisyUI for UI components.
- **Authentication:** NextAuth for secure user management.
- **Notifications:** SweetAlert2 and Sonner for admin and user feedback.
- **Carousel/Slider:** Swiper for interactive product displays.

---

## **Installation and Setup**

### **Prerequisites**

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### **Steps**

1. Clone the repository:

   ```bash
   git clone https://github.com/shaishabcoding/mind-flow.git
   cd mind-flow
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:  
   Create a `.env.local` file in the root directory with the following keys:

   ```env
   DB_URI=<your-mongodb-connection-string>
   BASE_URL=http://localhost:3000
   AUTH_SECRET=<auth_secret>
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Access the site at `http://localhost:3000`.

5. Build for production:
   ```bash
   npm run build
   npm start
   ```

---

## **Folder Structure**

```
mind-flow/
├── components/            # Reusable React components
├── app/                   # App directory for Next.js App Router
│   ├── api/               # API routes for server-side operations
│   ├── dashboard/         # Dashboard pages
│   │   ├── admin/         # Admin panel pages
│   │   └── analytics/     # Optional analytics pages
│   ├── blog/              # Blog-related pages
│   │   ├── [slug]/        # Dynamic routes for individual blog articles
│   └── products/          # Product-related pages
│       ├── [productId]/   # Dynamic routes for individual product pages
│       └── layout.tsx     # Layout for product pages
├── public/                # Static assets (images, etc.)
├── styles/                # Tailwind and global CSS files
└── utils/                 # Helper functions and utilities
```

---

## **Admin Panel Credentials**

- Default admin credentials (for demo purposes):
  - **Email:** `admin@gmail.com`
  - **Password:** `password123`

---

## **Unique Features and Approach**

1. **Server-Side Rendering:** Ensures fast page loads and better SEO for product and blog pages.
2. **Dynamic Routing:** Allows for individual pages for products and blog posts.
3. **Tailwind CSS with DaisyUI:** Simplifies styling and improves design consistency.
4. **Admin Functionality:** Simplified management for products and blogs.
5. **Social Media Integration:** Boosts user engagement with embedded posts.

---

## **Deployment**

- Hosted on Vercel. [View Live Demo](https://mind-flow-one.vercel.app)

---

## **Challenges and Solutions**

1. **Dynamic Product and Blog Routing:**

   - Implemented Next.js `getStaticProps` and `getStaticPaths` for dynamic pages.

2. **Admin Authentication:**

   - Used NextAuth with bcrypt for secure password handling.

3. **UI Design:**
   - Leveraged Tailwind CSS for rapid development and responsive design.

---

## **Future Enhancements**

- Add user authentication for customers.
- Implement advanced analytics with charts.
- Enhance the cart functionality with real-time updates.

---

## **Contact**

For questions or feedback, please reach out to:  
**Shaishab Chandra Shil**

- GitHub: [@shaishabcoding](https://github.com/shaishabcoding)
- Email: shaishabchandrashil@gmail.com
