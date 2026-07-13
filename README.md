# 🛍️ FOREVER — E-Commerce Platform

A full-stack e-commerce application built with **React**, **Node.js/Express**, and **MongoDB**. The project follows a monorepo structure with three independent apps: a customer-facing storefront, an admin dashboard, and a backend API server.

---

## 📁 Project Structure

```
FOREVER/
├── frontend/          # Customer-facing storefront (React + Vite + Tailwind CSS)
├── admin/             # Admin dashboard (React + Vite)
├── backend/           # REST API server (Express + MongoDB)
└── README.md
```

---

## ⚙️ Tech Stack

| Layer        | Technology                                                  |
| ------------ | ----------------------------------------------------------- |
| **Frontend** | React 19, React Router, Tailwind CSS 4, Vite 8              |
| **Admin**    | React 19, Vite 8                                            |
| **Backend**  | Node.js, Express 5, Mongoose (MongoDB), JWT, Bcrypt         |
| **Storage**  | Cloudinary (image uploads via Multer)                       |
| **Payments** | Razorpay                                                    |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** (comes with Node.js)
- **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Cloudinary** account (for image storage)

### 1. Clone the Repository

```bash
git clone https://github.com/Monyvannnnnn/FOREVER.git
cd FOREVER
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on the example:

```bash
cp .env.example .env
```

Fill in your environment variables:

```env
PORT=4000
MONGODB_URI="your_mongodb_connection_uri"
CLOUDINARY_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_SECRET_KEY="your_cloudinary_secret_key"
JWT_SECRET="your_jwt_secret_key"
```

Start the server:

```bash
npm run server    # Development (with nodemon hot-reload)
# or
npm start         # Production
```

The API will be available at `http://localhost:4000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The storefront will be available at `http://localhost:5173`.

### 4. Admin Dashboard Setup

```bash
cd admin
npm install
npm run dev
```

The admin panel will be available at `http://localhost:5174`.

---

## 🗂️ Backend Architecture

```
backend/
├── config/            # Database & Cloudinary connection
├── controllers/       # Business logic
│   ├── productController.js
│   └── userController.js
├── middleware/         # Auth & file upload middleware
│   ├── adminAuth.js
│   └── multer.js
├── models/            # Mongoose schemas
│   ├── productModel.js
│   └── userModel.js
├── routes/            # API route definitions
│   ├── productRoute.js
│   └── userRoute.js
└── server.js          # Entry point
```

### API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| `*`    | `/api/user/*`    | User authentication |
| `*`    | `/api/product/*` | Product CRUD        |
| `GET`  | `/`              | Health check        |

---

## 🎨 Frontend Architecture

```
frontend/src/
├── assets/            # Static assets (images, icons)
├── components/        # Reusable UI components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Footer.jsx
│   ├── SearchBar.jsx
│   ├── ProductItem.jsx
│   ├── BestSeller.jsx
│   ├── LatestCollection.jsx
│   ├── RelatedProducts.jsx
│   ├── CartTotal.jsx
│   ├── Newsletterbox.jsx
│   ├── OurPolicy.jsx
│   └── Title.jsx
├── context/           # React Context for global state
├── pages/             # Route-level page components
│   ├── Home.jsx
│   ├── Collection.jsx
│   ├── Product.jsx
│   ├── Cart.jsx
│   ├── PlaceOrder.jsx
│   ├── Orders.jsx
│   ├── Login.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── App.jsx            # App root with routing
├── main.jsx           # Entry point
└── index.css          # Global styles
```

---

## 🔑 Key Features

- 🔐 **User Authentication** — Register & login with JWT-based auth and bcrypt password hashing
- 📦 **Product Management** — Full CRUD operations with image uploads to Cloudinary
- 🛒 **Shopping Cart** — Add, remove, and manage items
- 💳 **Payments** — Razorpay payment gateway integration
- 📋 **Order Tracking** — View order history and status
- 🔍 **Search & Filter** — Browse and filter product collections
- 🛡️ **Admin Dashboard** — Separate admin panel for managing products and orders
- 📱 **Responsive Design** — Mobile-friendly with Tailwind CSS

---

## 📜 Available Scripts

### Frontend & Admin

| Command           | Description                 |
| ----------------- | --------------------------- |
| `npm run dev`     | Start development server    |
| `npm run build`   | Build for production        |
| `npm run preview` | Preview production build    |
| `npm run lint`    | Run linter (ESLint/OxLint)  |

### Backend

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `npm start`      | Start server                         |
| `npm run server` | Start server with nodemon (hot-reload) |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.
