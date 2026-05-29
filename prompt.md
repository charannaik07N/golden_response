As a Senior Full Stack Developer, you will create an entire eCommerce application platform that allows users to purchase items from the platform easily. The eCommerce application platform allows the user to search for and browse for items; view product details; modify their cart; log into their account using their Google account; and securely check out once they have completed shopping.

The eCommerce application platform shall be responsive (so it can be used on mobile, tablet, and desktop devices) as well as efficient, providing users with fast and accurate responses to their queries. Additionally, the eCommerce application will be built in compliance with the Americans with Disabilities Act (ADA), the Payment Card Industry (PCI) Standards, and other applicable regulations, providing the user with an outstanding user experience.

All features for the eCommerce application platform will be designed and developed in their entirety, so that all required features are included (no features will be left unbuilt, partially built, or in a mock-up form).

## Technology Stack

### Front End Technologies

**React.js**
Being that this application requires multiple user interfaces which are interactive, such as product listings, product details, shopping cart management, user authentication and checkout flows while React will provide component based architecture, which will enable you to structure these interactive UI components to be reusable and maintainable

**Vite**
the application contains multiple pages, API integration and dynamic user interactions it will help the project and make the project faster and more efficient 
**Tailwind CSS**
The application's design has to be fully responsive on mobile, tablet and desktop devices so Tailwind CSS has been chosen; this will assist with the rapid iteration of UI development as well as creating and maintaining a standard design system throughout the application.

**Framer Motion**
Framer Motion provides high-quality animations which increase the level of interactivity for users and result in the highest levels of performance for the overall application.

**React Router DOM**
The application will leverage React Router DOM for navigation between multiple routes within the application such as Home, Products, Product Details, Cart, Checkout, Profile and Order Success, and it will also provide a seamless way to navigate within the application by not needing to reload the entire page

**Axios**
The frontend will require communication with backend APIs for products, authentication, cart operations and orders; therefore, Axios has been chosen to meet these requirements. State management is required for handling authentication state, cart state, user information, and application-wide data efficiently.

### Backend Technologies

**Node.js**
by the nodejs it will handle the api for cart and product display and google sigin used to store the product by adding the cart

**Express.js**
We chose Express.js because the project requires a structured REST API to expose products, users, carts, and orders. Express provides middleware support, routing, validation, and security integration.

**MongoDB**
mongodb is used to store the data and manage the storage in the

**Firebase Authentication**
Firebase Authentication is used for secure Google Sign-In integration and user identity management.

**JWT Authentication**
JWT is used for maintaining secure authenticated sessions between the frontend and backend.

**dotenv**
dotenv is used to securely manage environment variables and protect sensitive credentials.

### External Product API

The application must use the following API as the product source:

**API Endpoint:**
`https://dummyjson.com/products`

**Requirements:**

- Fetch products through the backend.
- Never call the external API directly from frontend components.
- Backend must act as a secure middleware layer.
- Product data must be normalized before sending to the frontend.
- Implement caching to reduce unnecessary external API requests.
- Implement retry logic for failed requests.

---

## Backend Load Management and API Protection

To ensure production readiness and prevent server overload:

### Rate Limiting

Implement rate limiting using Express middleware.

**Requirements:**

- Maximum 100 requests per IP every 15 minutes.
- Return HTTP 429 when limit exceeds.
- Provide meaningful error messages.

### API Caching

Implement caching for product requests.

**Requirements:**

- Cache frequently requested products.
- Reduce unnecessary calls to external APIs.
- Improve response times.

### Request Compression

Enable Gzip compression for API responses.

### Debounced Search

Frontend search requests must be debounced by 300–500 milliseconds to avoid excessive API traffic.

### Pagination

Product listing APIs must support pagination.

**Example:**
`GET /api/products?page=1&limit=12`

### Database Indexing

Create indexes for:

- Product title
- Category
- User email
- Order creation date

to improve query performance.

---

## Security Requirements

The application must implement:

### Authentication Security

- JWT Authentication
- Protected Routes
- Token Expiration
- Secure Logout

### API Security

- Rate Limiting
- Helmet Security Middleware
- CORS Configuration
- Input Validation
- Request Sanitization

### Database Security

- MongoDB Injection Protection
- Mongoose Validation
- Sanitized Queries

### Frontend Security

- XSS Protection
- Secure Local Storage Handling
- Protected API Calls

### Environment Security

Sensitive information must never be hardcoded.

Store:

- MongoDB URI
- Firebase Keys
- JWT Secret
- API Keys
  inside environment variables only.

---

## Core Features

### Navigation Bar

**Must include:**

- Brand Logo
- Home
- Products
- Search Bar
- Cart Icon
- Profile Icon
- Login Button

**After Login:**

- User Profile Image
- User Name
- Logout Button

**Search must:**

- Update results instantly
- Support partial matching
- Support case-insensitive matching
- Use debounced requests

### Home Page

**Hero Section Requirements:**

- Promotional banner : used to promate the porducts
- CTA button : call to action button used to click by the user
- Framer Motion entrance animation : animations
- Featured Products: hot deals, etc

**Requirements:**

- Fetch products from backend API
- Responsive product cards
- Hover interactions
- Quick preview support

**Categories Include:**

- Electronics
- Fashion
- Shoes
- Accessories
- Gadgets

### Products Page

Display products using a responsive grid layout.

**Each card must contain:**

- Product Image
- Product Name
- Price
- Stock
- Rating
- Add To Cart Button

**Animations:**

- Hover Scale
- Hover Shadow
- Hover Elevation
- Smooth Motion Effects

### Product Details Page

**Route:** `/products/:id`

**Display:**

- Multiple Images
- Product Gallery
- Product Name
- Description
- Price
- Category
- Rating
- Stock Quantity
- Quantity Selector
- Add To Cart
- Buy Now

**Image Features:**

- Thumbnail Selection
- Zoom Effect
- Smooth Transitions

### Cart System

**Users must be able to:**

- Add Items
- Remove Items
- Update Quantity
- View Totals

**Cart Persistence:**

- Maintain cart after refresh
- Sync with backend after login

### Authentication Flow

Google Sign-In must be fully implemented.

**Flow:**

- User clicks Login.
- Google popup opens.
- User authenticates.
- Backend verifies user.
- Check phone number.
- If missing:
  - Open modal
  - Collect phone number
  - Save to MongoDB

**Store:**

- Name
- Email
- Profile Picture
- Phone Number
- Google ID

### Checkout Flow

Users may browse and add items without login.

**However:**

- Checkout must require authentication.
- Unauthenticated users must be redirected to Login.
- Show a clear authentication message.

**Checkout Page must display:**

- Shipping Details
- Product Summary
- Quantity
- Total Amount
- Order Review

### Order Success Page

**Display:** Order Placed Successfully

**Include:**

- Success Animation
- Confetti Effect
- Order Number
- Continue Shopping Button

Use Framer Motion animations.

---

## REST API Requirements

### Products

- `GET /api/products` : by that api call it will display the all the products
- `GET /api/products/:id` : by clicking on that api it shows the particular product
- `POST /api/products` : post is use to create an api product
- `PUT /api/products/:id` : put is used to replace the api
- `DELETE /api/products/:id` : delete is used to delet the product

### Authentication

- `POST /api/auth/google`

### Users

- `GET /api/users/profile`
- `PUT /api/users/profile`

### Cart

- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/:id`
- `DELETE /api/cart/:id`

### Orders

- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`

---

## Database Design

### Product Schema

- title
- description
- images[]
- price
- stock
- category
- rating
- createdAt

### User Schema

- name
- email
- profileImage
- phoneNumber
- googleId
- createdAt

### Cart Schema

- userId
- products[]
- quantity
- totalAmount

### Order Schema

- userId
- products[]
- totalAmount
- shippingDetails
- orderStatus
- createdAt

---

## Animation Standards

Use Framer Motion only.

**Allowed Properties:**

- transform
- opacity

**Avoid:**

- Layout Thrashing
- Heavy Repaints
- Unnecessary Re-renders

**Animations Required:**

- Page Fade In
- Slide Up
- Staggered Lists
- Hover Effects
- Modal Transitions
- Success Celebrations

---

## Accessibility Requirements

**Implement:**

- Semantic HTML
- ARIA Labels
- Keyboard Navigation
- Focus States
- Screen Reader Support

Target WCAG compliance.

---

## Performance Requirements

**Must include:**

- Lazy Loading : used to load the application
- Code Splitting : split the code
- Image Optimization: optimize the image so that I will not break website
- Pagination : break the website into pages
- API Caching : cache the error
- Debounced Search : No repeated api calls when we start search
- React Memoization : used to store the memory
- Efficient State Updates

Target:

- Lighthouse Performance Score above 90
- Accessibility Score above 90

---

## Documentation Requirements

Provide complete documentation including:

- Folder Structure
- Setup Guide
- Environment Variables
- MongoDB Setup
- Firebase Setup
- API Documentation
- Deployment Instructions
- Production Build Guide

---

## Definition of Done

The project is complete only when:

- All APIs are functional.
- Products load from backend services.
- Search works correctly.
- Product details support multiple images.
- Cart functionality works correctly.
- Google Authentication works.
- Phone number collection works.
- Checkout is protected.
- Orders are stored in MongoDB.
- Rate limiting is implemented.
- Caching is implemented.
- Security protections are implemented.
- Animations are smooth.
- Application is fully responsive.
- No console errors exist.
- Frontend and backend run successfully.
- Code is production-ready, scalable, secure, and deployment-ready.
