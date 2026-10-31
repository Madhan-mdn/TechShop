# Tech-Shop — E-Commerce Web Application

Tech-Shop is a modern, responsive single-page e-commerce web application specializing in audio gear, including headphones, earbuds, earphones, and neckbands. Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Redux Toolkit**, the application provides a smooth shopping experience featuring interactive product sliders, multi-attribute catalog filtering, dynamic product detail galleries, tabbed specifications, related product recommendations, and a persistent shopping cart.

---

## Table of Contents

1. [Application Overview & Purpose](#application-overview--purpose)
2. [User Journey & Navigation](#user-journey--navigation)
3. [Main Pages & Components](#main-pages--components)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [State Management Architecture](#state-management-architecture)
7. [Development Process](#development-process)
8. [Installation & Local Setup](#installation--local-setup)
9. [System Limitations & Known Boundaries](#system-limitations--known-boundaries)
10. [Required Proofs / Screenshots](#required-proofs--screenshots)

---

## Application Overview & Purpose

Tech-Shop is designed as a focused digital storefront for consumer electronics in the personal audio segment (featuring products from brands such as **JBL**, **boAt**, and **Sony**). 

The application serves several core objectives:
- **Showcase Featured Audio Devices**: Present hero banners and featured products using smooth carousels.
- **Categorical Exploration**: Allow customers to browse audio equipment by category (`Headphones`, `Earbuds`, `Earphones`, `Neckbands`) and brand.
- **Detailed Product Examination**: Provide high-resolution galleries, technical specifications, qualitative overviews, customer reviews, and category-based related recommendations.
- **Persistent Cart Operations**: Enable instant item additions, quantity updates, item deletions, and order totals calculated in real time, persisted across browser reloads via `localStorage`.
- **Search & Authentication Interfaces**: Provide quick keyboard-friendly search autocomplete and a responsive modal dialog for login and registration.

---

## User Journey & Navigation

```
[ Homepage (/) ]
       │
       ├──> Hero Banner Slider (ProductSlider) ──> Product Details (/products/:id)
       ├──> Featured Carousel (FeaturedProducts) ──> Product Details (/products/:id)
       ├──> Top Products Filter Tabs (TopProducts) ──> Product Details (/products/:id)
       │         └──> "Browse All Products" Card ──> [ Products Page (/products) ]
       │
[ Products Page (/products) ]
       ├──> Filter by Brand (JBL, BoAt, Sony)
       ├──> Filter by Category (Headphones, Earbuds, Earphones, Neckbands)
       ├──> Filter by Price Range Slider (₹0 - Max Price)
       ├──> Sort By (Latest, Featured, Top Rated, Price Low-High, Price High-Low)
       ├──> "Clear Filters" (Conditional button when active filters exist)
       └──> Click Product Card ──> [ Product Details Page (/products/:id) ]
       
[ Product Details Page (/products/:id) ]
       ├──> Image Gallery (Thumbnail switcher & enlarged primary preview)
       ├──> Pricing, Savings Badge & In-Stock indicator
       ├──> "Add to cart" Button (Triggers 2-second visual confirmation)
       ├──> Tabbed Details: Specifications | Overview | Reviews
       └──> Related Products Carousel ──> Navigate to related product details
       
[ Header & Modals (Global) ]
       ├──> Search Icon ──> SearchOverlay (Live autocomplete, keyboard navigation)
       ├──> User Icon ──> Profile Dropdown ──> AuthModal (Login / Signup toggle)
       └──> Cart Icon (Badge Count) ──> [ Cart Page (/cart) ]

[ Cart Page (/cart) ]
       ├──> Empty State: Cart icon, prompt, and "Start Shopping" button
       └──> Populated State: Item list, qty controls (+/-), remove item (trash),
            sticky Order Summary (Original, Discount, Free Delivery, Total),
            and Checkout button.
```

### Step-by-Step User Flow

1. **Discovery & Browsing**:
   - The user lands on the **Homepage (`/`)**, which opens with an automatic hero slider showcasing top audio gear with taglines and "Shop Now" links.
   - Below the hero, an infinite carousel displays **Featured Products**.
   - Further down, the **Top Products** section offers instant category filtering tabs (`All`, `Headphones`, `Earbuds`, `Earphones`, `Neckbands`).
2. **Accessing the Full Catalog**:
   - To access the full catalog, the user clicks the dedicated **"Browse All Products &rarr;"** card in the Top Products grid, which navigates to `/products`.
   - On the **Products Page**, the user refines products using the left sidebar by selecting brands (multi-select), categories, a price range slider, or sorting criteria. A **"Clear Filters"** button appears dynamically whenever filters or sorting are active.
3. **Inspecting Product Details**:
   - Clicking any product title or image navigates to `/products/:productId` (or `/product-details/:productId`).
   - The user selects different thumbnail images to update the main high-resolution image display.
   - The user reviews pricing, savings calculations, tax notices, and active promotional offers.
   - The user toggles between the **Specifications** table, **Overview** description, and **Reviews** list.
   - At the bottom, the user can browse other items in the same category via the **Related Products** carousel.
4. **Managing the Cart**:
   - Clicking **"Add to cart"** updates the global Redux cart state, provides immediate visual feedback ("Added" state for 2 seconds), and increments the Header cart badge.
   - Navigating to `/cart` displays the order list with item images, titles, unit prices, quantity increment/decrement controls, item removal, and an order summary showing original price, discounts, free delivery, and final total.

---

## Main Pages & Components

### 1. Pages (`src/pages/`)

| Page Component | Route(s) | Description |
| :--- | :--- | :--- |
| `Home.jsx` | `/` | Primary landing page hosting the hero slider, featured carousel, top products section, advantages, and footer. |
| `Products.jsx` | `/products` | Catalog browsing page with sidebar sorting, multi-brand and category filters, price range slider, and responsive grid. |
| `ProductDetails.jsx` | `/products/:productId`, `/product-details/:productId` | Dynamic product details page with multi-image gallery, pricing, stock indicators, tabs, and related products carousel. |
| `Cart.jsx` | `/cart` | Shopping cart view with empty-state handling, item quantity controls, deletion, sticky order summary calculation, and checkout trigger. |

### 2. Components (`src/components/`)

- **`Header.jsx`**: Sticky navigation header with the "Tech-Shop" brand logo (links to `/`), search button, cart icon with dynamic badge count of unique items, and user profile icon toggling a dropdown menu with login/signup actions.
- **`ProductCard.jsx`**: Reusable product display card showing product image, 5-star rating display, title, subtitle, price with strike-through original price, and an "Add to cart" button with 2-second visual feedback. Clicking the image or title navigates to the product details.
- **`ProductSlider.jsx`**: Hero section carousel powered by `react-slick` with large typography, tagline, pricing, and autoplay support.
- **`FeaturedProducts.jsx`**: Infinite autoplay carousel displaying featured audio products with custom pagination dot controls.
- **`TopProducts.jsx`**: Categorized product grid with quick-filter buttons (`All`, `Headphones`, `Earbuds`, `Earphones`, `Neckbands`) and the "Browse All Products &rarr;" card.
- **`ProductSpecifications.jsx`**: Formatted key-value table showing Brand, Model, Generic Name, Headphone Type, Connectivity, and Microphone specs.
- **`ProductOverview.jsx`**: Editorial overview highlighting sound quality features, bulleted highlights, and marketing summary.
- **`ProductReviews.jsx`**: Customer feedback list rendering reviewer names, star ratings, review dates, and testimonials from `reviewsData.js`.
- **`RelatedProducts.jsx`**: Horizontal carousel featuring products matching the current product's category (excluding the current item), with custom navigation arrows and pagination dots.
- **`SearchOverlay.jsx`**: Full-screen modal overlay with search input, live filtering against `productsData.js`, keyboard navigation (Up/Down/Enter/Escape), and click-to-scroll navigation.
- **`AuthModal.jsx`**: Authentication dialog with tabbed toggle between "Login" and "Signup", form validation (email format, required fields, password match), and notice informing users that the backend service is not yet connected.
- **`Advantages.jsx`**: Value proposition grid featuring 4 customer service benefits: Express Delivery, Brand Warranty, Exciting Deals, and Secure Payments.
- **`Footer.jsx`**: Footer section with newsletter subscription form, categorization links, social media links, and copyright text.

---

## Technology Stack

| Category | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime & Bundler** | [Vite](https://vitejs.dev/) | `8.3.4` | High-performance frontend tooling, fast HMR, and production bundler. |
| **Frontend Framework** | [React](https://react.dev/) | `19.3.1` | Modern UI library with concurrent rendering features and hooks. |
| **DOM Renderer** | [React DOM](https://react.dev/) | `19.3.1` | React package for DOM rendering. |
| **Styling & Design** | [Tailwind CSS](https://tailwindcss.com/) | `4.3.3` | Utility-first CSS framework with `@tailwindcss/vite` plugin. |
| **State Management** | [Redux Toolkit](https://redux-toolkit.js.org/) | `2.13.0` | Predictable state container managing cart, search modal, and auth state. |
| **React Redux Binding** | [React-Redux](https://react-redux.js.org/) | `9.3.1` | React bindings for Redux state subscription and dispatching. |
| **Client-Side Routing**| [React Router DOM](https://reactrouter.com/) | `7.18.5` | Declarative client-side routing and dynamic URL parameter handling. |
| **Carousels & Sliders** | [React Slick](https://react-slick.neostack.com/) | `0.31.0` | Carousel component for hero banners, featured items, and related products. |
| **Carousel Core** | [Slick-Carousel](https://kenwheeler.github.io/slick/) | `1.8.1` | CSS styles and core carousel mechanics. |
| **Iconography** | [React Icons](https://react-icons.github.io/react-icons/) | `5.7.0` | Vector icon set (Feather, FontAwesome 6, Tabler, Bootstrap, Ionicons). |
| **Code Quality** | [ESLint](https://eslint.org/) | `10.13.0` | Static analysis checking syntax, React hooks rules, and refresh rules. |

---

## Project Structure

```
TechShop/
├── index.html                      # HTML entry point with viewport and meta tags
├── package.json                    # Project metadata, dependencies, and npm scripts
├── vite.config.js                  # Vite configuration loading React and Tailwind CSS plugins
├── eslint.config.js                # ESLint configuration with react-hooks and react-refresh
├── dist/                           # Production build output generated by vite build
└── src/
    ├── main.jsx                    # Application bootstrapping with Redux Provider
    ├── App.jsx                     # Top-level routing, modals, and layout structure
    ├── App.css                     # Global app CSS overrides
    ├── index.css                   # Tailwind imports and scoped slick slider styles
    ├── assets/                     # Static media and images
    ├── components/                 # Reusable UI components
    │   ├── Advantages.jsx          # 4-column value proposition banner
    │   ├── AuthModal.jsx           # Login and Signup modal dialog with validation
    │   ├── FeaturedProducts.jsx    # Infinite autoplay carousel of featured products
    │   ├── Footer.jsx              # Footer with newsletter form and navigation links
    │   ├── Header.jsx              # Sticky header with search, cart badge, and profile
    │   ├── ProductCard.jsx         # Product card with image, price, rating, and Add to Cart
    │   ├── ProductOverview.jsx     # Qualitative description tab component
    │   ├── ProductReviews.jsx      # Customer review list tab component
    │   ├── ProductSlider.jsx       # Hero autoplay banner carousel
    │   ├── ProductSpecifications.jsx# Key-value technical specifications tab component
    │   ├── RelatedProducts.jsx     # Category-matched related products carousel
    │   ├── SearchOverlay.jsx       # Search overlay with live autocomplete
    │   └── TopProducts.jsx         # Categorized top products grid with "Browse All" card
    ├── data/                       # Local static mock datasets
    │   ├── filterBarData.js        # Sort options, brands list, and category list
    │   ├── footerData.js           # Footer menu links and social channels
    │   ├── headerData.js           # Header navigation definitions
    │   ├── productsData.js         # Master audio products catalog (19 items)
    │   ├── reviewsData.js          # Customer review records
    │   └── servicesData.js         # Service highlights data
    ├── pages/                      # Top-level route pages
    │   ├── Cart.jsx                # Shopping cart with empty/populated states & summary
    │   ├── Home.jsx                # Landing page assembling home components
    │   ├── ProductDetails.jsx      # Dynamic product details page with tabs and gallery
    │   └── Products.jsx            # Filterable, sortable full product catalog
    └── redux/                      # Redux Toolkit state management
        ├── authSlice.js            # Slice managing auth modal open/close and login/signup mode
        ├── cartSlice.js            # Slice managing cart items and localStorage persistence
        ├── searchSlice.js          # Slice managing search overlay visibility
        └── store.js                # Configured Redux store combining slices
```

---

## State Management Architecture

State is managed centrally using **Redux Toolkit** and React Redux hooks (`useSelector`, `useDispatch`):

```
                       ┌──────────────────────┐
                       │     Redux Store      │
                       │    (src/redux/)      │
                       └──────────┬───────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
  │  cartSlice   │         │  authSlice   │         │ searchSlice  │
  ├──────────────┤         ├──────────────┤         ├──────────────┤
  │ items: []    │         │ isAuthOpen   │         │ isOpen       │
  │ localStorage │         │ authMode:    │         └──────────────┘
  │ sync         │         │ "login" |    │
  └──────────────┘         │ "signup"     │
                           └──────────────┘
```

1. **`cartSlice`**:
   - `addToCart(product)`: Appends an item or increments existing item quantity. Saves updated items array to `localStorage` (`techshop_cart`).
   - `removeFromCart(productId)`: Filters out the specified product ID and updates storage.
   - `increaseQuantity(productId)`: Increments product quantity by 1.
   - `decreaseQuantity(productId)`: Decrements quantity by 1, automatically removing the item if its quantity drops below 1.
   - `clearCart()`: Clears all items.
2. **`authSlice`**:
   - `openAuthModal(mode)`: Opens the authentication modal in `"login"` or `"signup"` mode.
   - `closeAuthModal()`: Closes the modal.
   - `setAuthMode(mode)`: Toggles between login and signup views.
3. **`searchSlice`**:
   - `openSearch()`: Activates the search modal and locks body scrolling.
   - `closeSearch()`: Closes the search modal.
   - `toggleSearch()`: Toggles search visibility.

---

## Development Process

Based on verified Git commit history and codebase evolution, development proceeded through distinct stages:

```
[Phase 1: Setup & Core UI]
  ebf406a Initial commit with Header Component
  846bfe3 Added Product Slider using React Slick
  9a4e5a3 Created Home component and section architecture
  de6d91a Created Featured Products slider
  48adba5 Built Top Products component with category filters
  d561fa0 Created Advantages component
  22865ed & 2842b39 Built Footer component and integrated footerData
  e5b011f Polished Hero Slider presentation

[Phase 2: State Management & Interactive Features]
  16ff284 Installed Redux Toolkit and React-Redux
  a24b427 Created Cart component with React Router
  7e688be Implemented Cart functionality and UI design
  fad12b5 Built floating Search bar and live autocomplete
  5ee9c12 Built Login/Register modals with validation

[Phase 3: Catalog Browsing, Filtering & Product Details]
  279abec Created Products page and catalog grid
  02f6547 Implemented multi-criteria filter and sort engine
  1ed06ca Built Product Details page structure
  259e4e9 Added dynamic product routing and detail tab components
  597ef9a Added Related Products carousel component
  7a68433 Optimized category matching for related products
```

---

## Installation & Local Setup

### Prerequisites

Ensure you have Node.js installed on your system:
- **Node.js**: Version `18.x`, `20.x`, or `22.x` recommended
- **npm**: Version `9.x` or higher (bundled with Node.js)

### Step-by-Step Installation

1. **Clone or Open the Repository**:
   ```bash
   cd TechShop
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local URL displayed in your terminal (typically `http://localhost:5173`).

4. **Available NPM Scripts**:

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run dev` | Starts Vite Dev Server | Launches local development environment with instant HMR. |
| `npm run build` | Builds for Production | Compiles JavaScript chunks and CSS into the `dist/` folder. |
| `npm run preview`| Previews Production Build | Spins up a local web server serving the `dist/` output. |
| `npm run lint` | Runs ESLint | Executes static analysis across all `.js` and `.jsx` files. |

---

## System Limitations & Known Boundaries

The following limitations and implementation boundaries are confirmed directly by the code:

1. **Static Local Dataset**:
   - The application relies entirely on client-side mock datasets (`src/data/productsData.js`, `reviewsData.js`, `servicesData.js`).
   - No external REST or GraphQL database (e.g., MongoDB, PostgreSQL, Firebase) is connected.
2. **Authentication Mock**:
   - `AuthModal.jsx` provides form validation (email format, required fields, password matching), but does not issue tokens (JWT) or authenticate against a remote user directory.
   - Submitting the form displays an informational notice: *"Authentication backend is not connected yet."* Social sign-in buttons (Google, Facebook, Twitter) are UI placeholders.
3. **Cart Checkout Mock**:
   - Clicking **"Checkout"** on `/cart` executes a browser `alert("Checkout functionality is ready!")`. No payment gateway (Stripe, Razorpay, PayPal) or order storage is integrated.
4. **Search Result Navigation**:
   - In `SearchOverlay.jsx`, selecting a product navigates to `/` and attempts to scroll to the product element ID on the homepage (`document.getElementById('product-' + id)`), rather than routing directly to `/products/:productId`.
5. **Product Date Tracking**:
   - The "Latest" option in the Products page sorting menu preserves the dataset order because `productsData.js` records do not contain a `date` or `createdAt` timestamp.
6. **Local Storage Scope**:
   - Cart items persist inside the individual browser's `localStorage` (`techshop_cart`). Cart data is not shared across devices or browser profiles.

---

## Required Proofs / Screenshots

The following table lists the recommended screenshots to capture for project submission. Each proof directly corresponds to an existing, verifiable feature in the application:

| # | Screenshot Target | Suggested Filename | Caption / Description | What It Demonstrates |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Homepage Hero & Navigation** | `01_home_hero_slider.png` | Tech-Shop Homepage with Hero Slider and Navigation Header | Confirms dark-theme header with logo, search icon, cart badge, profile button, and the `ProductSlider` hero banner with active slide typography and price. |
| **2** | **Featured Products Carousel** | `02_featured_products.png` | Featured Products Section with Multi-Card Slider | Demonstrates the `FeaturedProducts` horizontal carousel, product imagery, center-mode focus, and active custom pagination dots. |
| **3** | **Top Products with Category Tabs** | `03_top_products_tabs.png` | Top Products Section with Category Filters and Browse Card | Shows category filter buttons (`All`, `Headphones`, `Earbuds`, etc.), the responsive product card grid, and the "Browse All Products &rarr;" card. |
| **4** | **Products Page with Active Filters** | `04_products_filtered.png` | Filtered Products Catalog with Sidebar Controls | Demonstrates `/products` with selected brand checkboxes (e.g. JBL, Sony), price slider adjusted, active sort mode, and the conditional **"Clear Filters"** button visible. |
| **5** | **Product Details Gallery & Info** | `05_product_details_top.png` | Product Details View with Gallery and Pricing | Shows `/products/:productId` with multi-image thumbnail gallery, enlarged main image, ratings, pricing, discount percentage, "In Stock" badge, and "Add to cart" button. |
| **6** | **Product Specifications Tab** | `06_product_specs_tab.png` | Specifications Tab Content on Product Details Page | Demonstrates the left-aligned two-column key-value specifications grid (Brand, Model, Generic Name, Headphone Type, Connectivity, Microphone). |
| **7** | **Product Overview & Reviews Tabs** | `07_product_overview_reviews.png`| Product Overview / Customer Reviews Tab View | Shows the editorial product overview with highlight bullets or customer review entries with reviewer name, star rating, date, and testimonial text. |
| **8** | **Category-Based Related Products** | `08_related_products_carousel.png`| Related Products Carousel on Details Page | Confirms category matching (showing only same-category items, excluding current item), previous/next navigation arrow buttons, and pagination dots. |
| **9** | **Search Overlay Modal** | `09_search_overlay.png` | Live Autocomplete Search Overlay with Suggestions | Shows the search modal opened with an active query, showing real-time autocomplete suggestions filtered from `productsData.js`. |
| **10**| **Authentication Modal (Login / Signup)**| `10_auth_modal.png` | Authentication Modal Dialog with Form Validation | Displays the `AuthModal` popup with tabbed Login/Signup views, input fields, social login buttons, and form validation error states. |
| **11**| **Populated Shopping Cart & Summary** | `11_cart_populated.png` | Shopping Cart View with Items and Order Summary | Demonstrates `/cart` with added items, image thumbnails, quantity increment/decrement controls, item deletion button, and sticky Order Summary calculations. |
| **12**| **Empty Shopping Cart State** | `12_cart_empty.png` | Empty Shopping Cart Display with Call to Action | Confirms the empty cart fallback UI featuring the large red `BsCartX` icon, "Your Cart is Empty" message, and the "Start Shopping" return button. |
