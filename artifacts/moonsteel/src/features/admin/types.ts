export type AdminTabKey =
  | "customer-logos"
  | "hero-images"
  | "products"
  | "projects"
  | "testimonials";

export type CustomerLogo = {
  id: string;
  image_url: string;
  created_at: string;
};

export type HeroImage = {
  id: string;
  slot: number;
  image_url: string;
  label: string | null;
  created_at: string;
};

export type ProductCategory = {
  id: string;
  title: string;
  specs: string;
  description: string;
  uses: string;
  sort_order: number;
  created_at: string;
};
