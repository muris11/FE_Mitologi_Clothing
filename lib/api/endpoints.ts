export const ENDPOINTS = {
  // ═══ PUBLIC (no auth required) ═══
  // Public Data
  LANDING_PAGE: "/v1/landing-page",
  SITE_SETTINGS: "/v1/site-settings",

  // Catalog
  PRODUCTS: "/v1/products",
  PRODUCTS_BEST_SELLERS: "/v1/products/best-sellers",
  PRODUCTS_NEW_ARRIVALS: "/v1/products/new-arrivals",
  PRODUCT_DETAIL: (handle: string) => `/v1/products/${handle}`,
  PRODUCT_REVIEWS: (handle: string) => `/v1/products/${handle}/reviews`,
  PRODUCT_RECOMMENDATIONS: (id: string | number) =>
    `/v1/products/${id}/recommendations`,

  CATEGORIES: "/v1/categories",
  CATEGORY_DETAIL: (handle: string) => `/v1/categories/${handle}`,

  COLLECTIONS: "/v1/collections",
  COLLECTION_DETAIL: (handle: string) => `/v1/collections/${handle}`,
  COLLECTION_PRODUCTS: (handle: string) => `/v1/collections/${handle}/products`,

  MATERIALS: "/v1/materials",
  ORDER_STEPS: "/v1/order-steps",

  // Cart
  CART: "/v1/cart",
  CART_ITEMS: "/v1/cart/items",
  CART_ITEM_DETAIL: (id: string | number) => `/v1/cart/items/${id}`,

  // Content
  PAGES: "/v1/pages",
  PAGE_DETAIL: (handle: string) => `/v1/pages/${handle}`,
  PORTFOLIOS: "/v1/portfolios",
  PORTFOLIO_DETAIL: (slug: string) => `/v1/portfolios/${slug}`,
  MENU: (handle: string) => `/v1/menus/${handle}`,

  // Auth
  AUTH_REGISTER: "/v1/auth/register",
  AUTH_LOGIN: "/v1/auth/login",
  AUTH_LOGOUT: "/v1/auth/logout",
  AUTH_USER: "/v1/auth/user",
  AUTH_FORGOT_PASSWORD: "/v1/auth/forgot-password",
  AUTH_RESET_PASSWORD: "/v1/auth/reset-password",

  // ═══ SANCTUM (auth required) ═══
  // Profile (Protected)
  PROFILE: "/v1/profile",
  PROFILE_PASSWORD: "/v1/profile/password",
  PROFILE_AVATAR: "/v1/profile/avatar",

  // Addresses (Protected) - nested under profile
  ADDRESSES: "/v1/profile/addresses",

  // Orders & Checkout (Protected)
  ORDERS: "/v1/orders",
  ORDER_DETAIL: (orderNumber: string) => `/v1/orders/${orderNumber}`,
  ORDER_PAY: (orderNumber: string) => `/v1/orders/${orderNumber}/pay`,
  ORDER_CONFIRM_PAYMENT: (orderNumber: string) =>
    `/v1/orders/${orderNumber}/confirm-payment`,
  ORDER_REQUEST_REFUND: (orderNumber: string) =>
    `/v1/orders/${orderNumber}/request-refund`,
  CHECKOUT_PROCESS: "/v1/checkout",

  // Wishlist (Protected)
  WISHLIST: "/v1/wishlist",
  WISHLIST_ADD: (productId: string | number) => `/v1/wishlist/${productId}`,
  WISHLIST_REMOVE: (productId: string | number) => `/v1/wishlist/${productId}`,
  WISHLIST_CHECK: (productId: string | number) =>
    `/v1/wishlist/check/${productId}`,

  // Reviews (Protected)
  REVIEW_STORE: (handle: string) => `/v1/products/${handle}/reviews`,
  REVIEW_UPDATE: (reviewId: string | number) => `/v1/reviews/${reviewId}`,
  REVIEW_DELETE: (reviewId: string | number) => `/v1/reviews/${reviewId}`,

  // User Behaviors / Recommendations
  INTERACTIONS_BATCH: "/v1/interactions/batch",
  USER_RECOMMENDATIONS: "/v1/recommendations",

  // Integrations
  CHATBOT: "/v1/chatbot",

  // Team Member Photos (bypass symlink issues on Windows)
  TEAM_MEMBER_PHOTO: (id: string | number) => `/v1/team-members/${id}/photo`,

  // ═══ NOT CALLABLE BY STOREFRONT ═══
  // admin:   /v1/admin/reports/*, /v1/admin/ml/*, /v1/admin/rfid/status
  // webhook: /v1/checkout/notification
  // local:   /v1/test/fix-orders
} as const;
