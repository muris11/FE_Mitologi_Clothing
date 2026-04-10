export type Maybe<T> = T | null;

export type Cart = {
  id: string | undefined;
  sessionId?: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: CartItem[];
  totalQuantity: number;
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  path: string;
  updatedAt: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: ProductVariant[];
  featuredImage: Image;
  images: Image[];
  seo: SEO;
  tags: string[];
  totalStock?: number;
  updatedAt: string;
  isWishlisted?: boolean;
  averageRating?: number;
  totalReviews?: number;
  totalSold?: number;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
  sku?: string; // optional SKU returned by API
  stock?: number; // optional stock/inventory quantity
};

export type SEO = {
  title: string;
  description: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  phone?: string;
  addresses?: Address[];
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Address = {
  id: number;
  label: string;
  recipientName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
};

export type ReviewItem = {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  comment: string;
  adminReply?: string;
  adminRepliedAt?: string;
  createdAt: string;
};

export type ReviewSummary = {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: Record<string, number>;
};

export type WishlistItem = {
  id: number;
  productId: number;
  product: Product;
  createdAt: string;
};

export type OrderItem = {
  id: number;
  productTitle: string;
  variantTitle: string;
  price: number;
  quantity: number;
  total: number;
  productHandle?: string;
  productImage?: string;
};

export type Order = {
  id: number;
  orderNumber: string;
  status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "completed"
    | "cancelled"
    | "refunded";
  trackingNumber?: string;
  paymentStatus?: string;
  total: number;
  subtotal: number;
  shippingCost: number;
  shippingAddress?: {
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    province?: string;
    postalCode?: string;
  };
  itemsCount?: number;
  createdAt: string;
  refundRequestedAt?: string;
  refundReason?: string;
  items: OrderItem[];
};

export type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  sortOrder: number;
  isActive: boolean;
};

export type Feature = {
  id: number;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl: string | null;
  isActive: boolean;
};

export type Material = {
  id: number;
  name: string;
  description: string;
  colorTheme: string;
  sortOrder: number;
};

export type PortfolioItem = {
  id: number;
  title: string;
  slug: string;
  category: string;
  imageUrl: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
};

export type OrderStep = {
  id: number;
  stepNumber: number;
  title: string;
  description: string;
  type: "langsung" | "ecommerce";
  sortOrder: number;
};

export type CtaData = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  handle: string;
  description: string | null;
  image: string | null;
  productsCount?: number;
};

export type SiteSettings = {
  general?: {
    siteName?: string;
    siteTagline?: string;
    siteDescription?: string;
    siteLogo?: string;
    companyFoundedYear?: string;
  };
  about?: {
    aboutHeadline?: string;
    companyFoundedYear?: string;
    aboutDescription1?: string;
    aboutDescription2?: string;
    aboutShortHistory?: string;
    aboutLogoMeaning?: string;
    aboutLogoMeaningDetailed?: { letter: string; description: string }[];
    aboutImage?: string;
    visionText?: string;
    missionText?: string;
    valuesText?: string;
    legalCompanyName?: string;
    legalAddress?: string;
    legalBusinessField?: string;
    legalNpwp?: string;
    legalNib?: string;
    legalNmid?: string;
    // Founder Story
    founderName?: string;
    founderRole?: string;
    founderStory?: string;
    founderPhoto?: string;
  };
  visionMission?: {
    visionText?: string;
    missionText?: string;
    valuesText?: string;
  };
  legality?: {
    legalCompanyName?: string;
    legalAddress?: string;
    legalBusinessField?: string;
    legalNpwp?: string;
    legalNib?: string;
    legalNmid?: string;
  };
  // Dynamic arrays from JSON
  servicesData?: {
    title: string;
    desc: string;
    image: string;
    materials?: string;
    keunggulan?: string;
  }[];
  guaranteesData?: {
    title: string;
    description?: string;
    desc?: string;
  }[];
  companyValuesData?: {
    title: string;
    description?: string;
    desc?: string;
  }[];
  // Deprecated fixed fields (optional for backward compatibility)
  guarantee?: {
    guarantee1Title?: string;
    guarantee1Desc?: string;
    guarantee2Title?: string;
    guarantee2Desc?: string;
    guarantee3Title?: string;
    guarantee3Desc?: string;
  };
  services?: {
    service1Title?: string;
    service1Desc?: string;
    service1Image?: string;
    service2Title?: string;
    service2Desc?: string;
    service2Image?: string;
    service3Title?: string;
    service3Desc?: string;
    service3Image?: string;
  };
  pricing?: {
    pricingMinOrder?: string;
    pricingPlastisolData?: string; // JSON string
    pricingAddonsData?: string; // JSON string
  };
  beranda?: {
    pricingPlastisolData?: string | PlastisolPrice[];
    pricingAddonsData?: string | PricingAddon[];
    pricingMinOrder?: string;
    garansiBonusData?: Array<{ title: string; description: string }>;
  };
  cta?: {
    ctaTitle?: string;
    ctaSubtitle?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
  };
  contact?: {
    contactEmail?: string;
    contactPhone?: string;
    contactAddress?: string;
    contactMapsEmbed?: string;
    contactWhatsapp?: string;
    contactOperationalHours?: string;
    operatingHoursWeekdayLabel?: string;
    operatingHoursWeekday?: string;
    operatingHoursWeekendLabel?: string;
    operatingHoursWeekend?: string;
    socialInstagram?: string;
    socialInstagramEnabled?: string; // '1' or '0'
    socialTiktok?: string;
    socialTiktokEnabled?: string;
    socialFacebook?: string;
    socialFacebookEnabled?: string;
    socialShopee?: string;
    socialShopeeEnabled?: string;
    socialTwitter?: string;
    socialTwitterEnabled?: string;
    whatsappNumber?: string;
  };
  seo?: {
    seoMetaTitle?: string;
    seoMetaDescription?: string;
    seoOgImage?: string;
  };
};

export type TeamMember = {
  id: number;
  name: string;
  position: string;
  photoUrl: string | null;
  parentId: number | null;
  level: number;
  sortOrder: number;
};

export type Partner = {
  id: number;
  name: string;
  logo: string;
  websiteUrl?: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
};

export type PrintingMethod = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  pros: string[];
  priceRange: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type ProductPricing = {
  id: number;
  categoryName: string;
  items: Array<{ name: string; priceRange: string }>;
  minOrder: string | null;
  notes: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type Facility = {
  id: number;
  name: string;
  description: string;
  image: string | null;
  isActive: boolean;
  sortOrder: number;
};

export type LandingPageData = {
  heroSlides: HeroSlide[];
  features: Feature[];
  testimonials: Testimonial[];
  materials: Material[];
  portfolioItems: PortfolioItem[];
  orderSteps: OrderStep[];
  partners: Partner[];
  printingMethods: PrintingMethod[];
  productPricings: ProductPricing[];
  facilities: Facility[];
  cta: CtaData;
  siteSettings?: SiteSettings;
  categories: Category[];
  newArrivals: Product[];
  bestSellers: Product[];
  teamMembers?: TeamMember[];
};

// Midtrans Snap Types
export type MidtransTransactionStatus =
  | "capture"
  | "settlement"
  | "pending"
  | "deny"
  | "cancel"
  | "expire"
  | "failure";

export type MidtransPaymentResponse = {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: MidtransTransactionStatus;
  fraud_status?: string;
  redirect_url?: string;
};

export type MidtransSnapCallbacks = {
  onSuccess: (result: MidtransPaymentResponse) => void;
  onPending: (result: MidtransPaymentResponse) => void;
  onError: (result: MidtransPaymentResponse) => void;
  onClose: () => void;
};

export type MidtransSnap = {
  pay: (token: string, callbacks: MidtransSnapCallbacks) => void;
};

// API Response Types
export type ApiErrorResponse = {
  error: string;
  message?: string;
  status?: number;
  details?: Record<string, string[]>;
};

export type CheckoutResponse = {
  snapToken?: string;
  orderId?: string | number;
  orderNumber?: string;
  redirectUrl?: string;
  mock?: boolean;
  error?: string;
};

export type CheckoutPayload = {
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingProvince: string;
  shippingPostalCode: string;
  notes?: string;
};

// Pricing Types
export type PlastisolPrice = {
  title: string;
  price?: string;
  short?: string;
  long?: string;
  popular?: boolean;
};

export type PricingAddon = {
  name: string;
  price: string;
};

// Generic API Error for catch blocks
export type UnknownError = Error & {
  status?: number;
  response?: {
    data?: ApiErrorResponse;
    status?: number;
  };
};
