# Amant Backend

A comprehensive backend API for an e-commerce jewelry platform built with Node.js, Express, and MongoDB. Manages products, collections, reviews, enquiries, and homepage content with admin authentication and authorization.

## 🌟 Features

- **Product Management** - Create, read, update, and delete products with slug-based routing
- **Collection Management** - Organize products into collections
- **Reviews & Ratings** - Customer reviews and ratings for products
- **Enquiries** - Handle customer enquiries for specific products
- **Homepage Content** - Dynamic homepage management
- **Admin Authentication** - Secure JWT-based admin authentication
- **Error Handling** - Comprehensive global error handling
- **Input Validation** - Request body validation

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Utilities**: slugify, dotenv

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amant-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp config.env.example config.env
   # Edit config.env with your values
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## 🔐 Environment Variables

Create a `config.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/amant
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=1h
ADMIN_KEY=your-admin-key-here
```

## 🔐 Authentication

### Admin Login

**Endpoint:**
```
POST /realSilver/login
```

**Request Body:**
```json
{
  "adminKey": "your-admin-key-here"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid admin key",
  "statusCode": 401
}
```

**Usage:** Include token in subsequent requests:
```
Authorization: Bearer <token>
```

---

## 🛍️ Product Routes

### GET /realSilver/products - Get All Products

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "results": 12,
  "data": {
    "products": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Silver Ring",
        "slug": "silver-ring",
        "description": "Beautiful handcrafted silver ring",
        "price": 4999,
        "images": ["url1", "url2"],
        "materials": ["Silver"],
        "careInstructions": "Clean with soft cloth",
        "featured": true,
        "isNewArrival": true,
        "category": "jewelry",
        "tags": ["ring", "silver"],
        "collectionId": "507f1f77bcf86cd799439012",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

### GET /realSilver/products/:slug - Get Product by Slug

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "data": {
    "product": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Silver Ring",
      "slug": "silver-ring",
      "description": "Beautiful handcrafted silver ring",
      "price": 4999,
      "images": ["url1", "url2"],
      "materials": ["Silver"],
      "careInstructions": "Clean with soft cloth",
      "featured": true,
      "isNewArrival": true,
      "category": "jewelry",
      "tags": ["ring", "silver"],
      "collectionId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Rings",
        "slug": "rings"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

---

### GET /realSilver/products/featured - Get Featured Products

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "results": 5,
  "data": {
    "products": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Silver Ring",
        "slug": "silver-ring",
        "price": 4999,
        "images": ["url1"],
        "featured": true,
        "category": "jewelry"
      }
    ]
  }
}
```

---

### GET /realSilver/products/new-arrivals - Get New Arrivals

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "results": 10,
  "data": {
    "products": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "New Silver Brooch",
        "slug": "new-silver-brooch",
        "price": 5999,
        "images": ["url1"],
        "isNewArrival": true,
        "category": "broche",
        "createdAt": "2024-01-17T10:30:00Z"
      }
    ]
  }
}
```

---

### POST /realSilver/products - Create Product (Admin)

**Access:** Private/Admin

**Request Body:**
```json
{
  "name": "Diamond Pendant",
  "collectionId": "507f1f77bcf86cd799439012",
  "description": "Exquisite diamond pendant necklace",
  "price": 25000,
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "materials": ["Gold", "Diamond"],
  "careInstructions": "Handle with care, store in soft pouch",
  "category": "jewelry",
  "featured": true,
  "isNewArrival": true,
  "tags": ["pendant", "diamond", "luxury"]
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "product": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Diamond Pendant",
      "slug": "diamond-pendant",
      "collectionId": "507f1f77bcf86cd799439012",
      "description": "Exquisite diamond pendant necklace",
      "price": 25000,
      "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      "materials": ["Gold", "Diamond"],
      "careInstructions": "Handle with care, store in soft pouch",
      "category": "jewelry",
      "featured": true,
      "isNewArrival": true,
      "tags": ["pendant", "diamond", "luxury"],
      "createdAt": "2024-01-17T10:30:00Z",
      "updatedAt": "2024-01-17T10:30:00Z"
    }
  }
}
```

---

### PATCH /realSilver/products/:id - Update Product (Admin)

**Access:** Private/Admin

**Request Body:**
```json
{
  "price": 26000,
  "featured": false,
  "isNewArrival": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "product": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Diamond Pendant",
      "slug": "diamond-pendant",
      "price": 26000,
      "featured": false,
      "isNewArrival": false,
      "updatedAt": "2024-01-17T11:30:00Z"
    }
  }
}
```

---

### PATCH /realSilver/products/add-to-new-arrivals/:id - Add to New Arrivals (Admin)

**Access:** Private/Admin

**Response (200):**
```json
{
  "success": true,
  "data": {
    "product": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Diamond Pendant",
      "isNewArrival": true,
      "updatedAt": "2024-01-17T12:00:00Z"
    }
  }
}
```

---

### DELETE /realSilver/products/:id - Delete Product (Admin)

**Access:** Private/Admin

**Response (204):**
```json
{
  "success": true,
  "data": null
}
```

---

## 📂 Collection Routes

### GET /realSilver/collections - Get All Collections

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "results": 4,
  "data": {
    "collections": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Rings",
        "slug": "rings",
        "description": "Exquisite collection of rings",
        "heroImage": "https://example.com/rings-hero.jpg",
        "createdAt": "2024-01-10T10:30:00Z",
        "updatedAt": "2024-01-10T10:30:00Z"
      }
    ]
  }
}
```

---

### GET /realSilver/collections/slug/:slug - Get Collection by Slug

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "data": {
    "collection": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Rings",
      "slug": "rings",
      "description": "Exquisite collection of rings",
      "heroImage": "https://example.com/rings-hero.jpg",
      "createdAt": "2024-01-10T10:30:00Z",
      "updatedAt": "2024-01-10T10:30:00Z"
    }
  }
}
```

---

### POST /realSilver/collections - Create Collection (Admin)

**Access:** Private/Admin

**Request Body:**
```json
{
  "name": "Brooches",
  "description": "Beautiful collection of vintage and modern brooches",
  "heroImage": "https://example.com/brooches-hero.jpg"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "collection": {
      "_id": "507f1f77bcf86cd799439014",
      "name": "Brooches",
      "slug": "brooches",
      "description": "Beautiful collection of vintage and modern brooches",
      "heroImage": "https://example.com/brooches-hero.jpg",
      "createdAt": "2024-01-17T10:30:00Z",
      "updatedAt": "2024-01-17T10:30:00Z"
    }
  }
}
```

---

### PATCH /realSilver/collections/:id - Update Collection (Admin)

**Access:** Private/Admin

**Request Body:**
```json
{
  "description": "Updated description for brooches",
  "heroImage": "https://example.com/brooches-hero-updated.jpg"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "collection": {
      "_id": "507f1f77bcf86cd799439014",
      "name": "Brooches",
      "slug": "brooches",
      "description": "Updated description for brooches",
      "heroImage": "https://example.com/brooches-hero-updated.jpg",
      "updatedAt": "2024-01-17T11:30:00Z"
    }
  }
}
```

---

### DELETE /realSilver/collections/:id - Delete Collection (Admin)

**Access:** Private/Admin

**Response (204):**
```json
{
  "success": true,
  "data": null
}
```

---

## 💬 Review Routes

### GET /realSilver/reviews - Get All Reviews

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "results": 8,
  "data": {
    "reviews": [
      {
        "_id": "507f1f77bcf86cd799439015",
        "name": "John Doe",
        "location": "New York, USA",
        "rating": 5,
        "text": "Amazing quality and beautiful design. Highly recommended!",
        "product": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Silver Ring",
          "slug": "silver-ring",
          "images": ["url1"]
        },
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

### GET /realSilver/reviews/product/:productId - Get Reviews by Product

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "results": 3,
  "data": {
    "reviews": [
      {
        "_id": "507f1f77bcf86cd799439015",
        "name": "John Doe",
        "location": "New York, USA",
        "rating": 5,
        "text": "Amazing quality and beautiful design!",
        "product": "507f1f77bcf86cd799439011",
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

### POST /realSilver/reviews - Create Review

**Access:** Public

**Request Body:**
```json
{
  "name": "Sarah Smith",
  "location": "London, UK",
  "rating": 4,
  "text": "Beautiful piece! Arrived in perfect condition. Would order again.",
  "product": "507f1f77bcf86cd799439011"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "review": {
      "_id": "507f1f77bcf86cd799439016",
      "name": "Sarah Smith",
      "location": "London, UK",
      "rating": 4,
      "text": "Beautiful piece! Arrived in perfect condition. Would order again.",
      "product": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-17T10:30:00Z",
      "updatedAt": "2024-01-17T10:30:00Z"
    }
  }
}
```

---

### PATCH /realSilver/reviews/:id - Update Review (Admin)

**Access:** Private/Admin

**Request Body:**
```json
{
  "rating": 5,
  "text": "Even better than expected! 5 stars!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "review": {
      "_id": "507f1f77bcf86cd799439016",
      "name": "Sarah Smith",
      "location": "London, UK",
      "rating": 5,
      "text": "Even better than expected! 5 stars!",
      "product": "507f1f77bcf86cd799439011",
      "updatedAt": "2024-01-17T11:30:00Z"
    }
  }
}
```

---

### DELETE /realSilver/reviews/:id - Delete Review (Admin)

**Access:** Private/Admin

**Response (204):**
```json
{
  "success": true,
  "data": null
}
```

---

## 📧 Enquiry Routes

### POST /realSilver/enquiries - Create Enquiry

**Access:** Public

**Request Body:**
```json
{
  "name": "Michael Johnson",
  "email": "michael@example.com",
  "message": "Do you offer customization for this ring? I'd like to request a specific size.",
  "productId": "507f1f77bcf86cd799439011"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "enquiry": {
      "_id": "507f1f77bcf86cd799439017",
      "name": "Michael Johnson",
      "email": "michael@example.com",
      "message": "Do you offer customization for this ring? I'd like to request a specific size.",
      "productId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-17T10:30:00Z",
      "updatedAt": "2024-01-17T10:30:00Z"
    }
  }
}
```

---

### GET /realSilver/enquiries/:id - Get Enquiry by ID

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "data": {
    "enquiry": {
      "_id": "507f1f77bcf86cd799439017",
      "name": "Michael Johnson",
      "email": "michael@example.com",
      "message": "Do you offer customization for this ring?",
      "productId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Silver Ring",
        "slug": "silver-ring",
        "images": ["url1"]
      },
      "createdAt": "2024-01-17T10:30:00Z"
    }
  }
}
```

---

### GET /realSilver/enquiries - Get All Enquiries (Admin)

**Access:** Private/Admin

**Response (200):**
```json
{
  "success": true,
  "results": 5,
  "data": {
    "enquiries": [
      {
        "_id": "507f1f77bcf86cd799439017",
        "name": "Michael Johnson",
        "email": "michael@example.com",
        "message": "Do you offer customization for this ring?",
        "productId": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Silver Ring",
          "slug": "silver-ring"
        },
        "createdAt": "2024-01-17T10:30:00Z"
      }
    ]
  }
}
```

---

### DELETE /realSilver/enquiries/:id - Delete Enquiry (Admin)

**Access:** Private/Admin

**Response (204):**
```json
{
  "success": true,
  "data": null
}
```

---

## 🏠 Homepage Routes

### GET /realSilver/homepage - Get Homepage Content

**Access:** Public

**Response (200):**
```json
{
  "success": true,
  "data": {
    "homepage": {
      "_id": "507f1f77bcf86cd799439018",
      "heroTitle": "Timeless Elegance",
      "heroSubtitle": "Handcrafted Silver & Gold Jewelry",
      "heroImage": "https://example.com/hero.jpg",
      "brandStoryShort": "We craft beautiful, timeless pieces that tell your story.",
      "craftsmanshipTitle": "Exceptional Craftsmanship",
      "craftsmanshipDescription": "Each piece is handcrafted by our master artisans with attention to detail.",
      "craftsmanshipImage": "https://example.com/craftsmanship.jpg",
      "createdAt": "2024-01-10T10:30:00Z",
      "updatedAt": "2024-01-10T10:30:00Z"
    }
  }
}
```

---

### POST /realSilver/homepage - Create Homepage Content (Admin)

**Access:** Private/Admin

**Request Body:**
```json
{
  "heroTitle": "Timeless Elegance",
  "heroSubtitle": "Handcrafted Silver & Gold Jewelry",
  "heroImage": "https://example.com/hero.jpg",
  "brandStoryShort": "We craft beautiful, timeless pieces that tell your story.",
  "craftsmanshipTitle": "Exceptional Craftsmanship",
  "craftsmanshipDescription": "Each piece is handcrafted by our master artisans with attention to detail.",
  "craftsmanshipImage": "https://example.com/craftsmanship.jpg"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "homepage": {
      "_id": "507f1f77bcf86cd799439018",
      "heroTitle": "Timeless Elegance",
      "heroSubtitle": "Handcrafted Silver & Gold Jewelry",
      "heroImage": "https://example.com/hero.jpg",
      "brandStoryShort": "We craft beautiful, timeless pieces that tell your story.",
      "craftsmanshipTitle": "Exceptional Craftsmanship",
      "craftsmanshipDescription": "Each piece is handcrafted by our master artisans with attention to detail.",
      "craftsmanshipImage": "https://example.com/craftsmanship.jpg",
      "createdAt": "2024-01-17T10:30:00Z",
      "updatedAt": "2024-01-17T10:30:00Z"
    }
  }
}
```

---

### PATCH /realSilver/homepage/:id - Update Homepage Content (Admin)

**Access:** Private/Admin

**Request Body:**
```json
{
  "heroTitle": "Luxury Redefined",
  "heroSubtitle": "Premium Jewelry Collection"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "homepage": {
      "_id": "507f1f77bcf86cd799439018",
      "heroTitle": "Luxury Redefined",
      "heroSubtitle": "Premium Jewelry Collection",
      "updatedAt": "2024-01-17T11:30:00Z"
    }
  }
}
```

---

## 📁 Project Structure

```
amant-backend/
├── controllers/
│   ├── productController.js
│   ├── collectionController.js
│   ├── reviewController.js
│   ├── enquiryController.js
│   ├── homePageController.js
│   └── adminAuthController.js
├── models/
│   ├── product.js
│   ├── collection.js
│   ├── review.js
│   ├── enquiry.js
│   └── homePage.js
├── routers/
│   ├── adminRoutes.js
│   ├── collectionRoutes.js
│   ├── reviewRoutes.js
│   ├── enquiryRoutes.js
│   └── productRoutes.js (if exists)
├── middleware/
│   └── authMiddleware.js
├── utils/
│   ├── appError.js
│   ├── catchAsync.js
│   ├── globalErrorHandler.js
│   └── validators.js
├── app.js
├── server.js
├── config.js
├── package.json
└── README.md
```

---

## 🗄️ Database Models

### Product Schema
- `name` (String, required) - Product name
- `slug` (String, unique, auto-generated) - URL-friendly identifier
- `collectionId` (ObjectId, ref: Collection) - Parent collection
- `description` (String, required) - Product description
- `materials` (Array of Strings) - List of materials used
- `careInstructions` (String, required) - Care instructions
- `images` (Array of Strings, required) - Product images
- `featured` (Boolean, default: false) - Is featured product
- `tags` (Array of Strings) - Search tags
- `category` (String: "jewelry" or "broche") - Product category
- `price` (Number, required) - Product price
- `isNewArrival` (Boolean, default: false) - New arrival status
- `createdAt`, `updatedAt` (Timestamps) - Auto-generated timestamps

### Collection Schema
- `name` (String, required) - Collection name
- `slug` (String, unique, auto-generated) - URL-friendly identifier
- `description` (String, required) - Collection description
- `heroImage` (String, required) - Hero image URL
- `createdAt`, `updatedAt` (Timestamps) - Auto-generated timestamps

### Review Schema
- `name` (String, required) - Reviewer name
- `location` (String, required) - Reviewer location
- `rating` (Number, required, 1-5) - Star rating
- `text` (String, required) - Review text
- `product` (ObjectId, ref: Product) - Related product
- `createdAt`, `updatedAt` (Timestamps) - Auto-generated timestamps

### Enquiry Schema
- `name` (String, required) - Enquirer name
- `email` (String, required) - Enquirer email
- `message` (String, required) - Enquiry message
- `productId` (ObjectId, ref: Product, optional) - Related product
- `createdAt`, `updatedAt` (Timestamps) - Auto-generated timestamps

### HomepageContent Schema
- `heroTitle` (String, required) - Hero section title
- `heroSubtitle` (String, required) - Hero section subtitle
- `heroImage` (String, required) - Hero image URL
- `brandStoryShort` (String, required) - Brand story text
- `craftsmanshipTitle` (String, required) - Craftsmanship section title
- `craftsmanshipDescription` (String, required) - Craftsmanship description
- `craftsmanshipImage` (String, required) - Craftsmanship image URL
- `createdAt`, `updatedAt` (Timestamps) - Auto-generated timestamps

---

## ⚠️ Error Handling

The API uses centralized error handling with consistent response format:

**Error Response Example:**
```json
{
  "success": false,
  "message": "Product not found",
  "statusCode": 404
}
```

Common error codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid token)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## 🚀 Deployment

### Environment Setup
1. Set up MongoDB Atlas cluster
2. Configure all environment variables in `config.env`
3. Deploy to your hosting platform (Heroku, AWS, Railway, etc.)

### Starting the Server
```bash
npm start
```

---

## 📝 License

This project is proprietary and confidential.

---

## 👥 Contributors

- Development Team

---

## 📞 Support

For issues or questions, please contact the development team.
