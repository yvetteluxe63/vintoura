
// Legacy interfaces for backward compatibility - these now match the database schema
export interface FeaturedCollection {
  id: string;
  title: string;
  image: string;
  tags?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface AdminStore {
  featuredCollections: FeaturedCollection[];
  galleryItems: GalleryItem[];
  services: Service[];
  currency: string;
}

// Note: This file is kept for backward compatibility
// All data operations now happen through Supabase using the useSupabaseData hooks
// The functions below are deprecated and will be removed in future updates

// Deprecated functions - kept for compatibility
export const getFeaturedCollections = (): FeaturedCollection[] => {
  console.warn('getFeaturedCollections is deprecated. Use useFeaturedCollections hook instead.');
  return [];
};

export const setFeaturedCollections = (collections: FeaturedCollection[]): void => {
  console.warn('setFeaturedCollections is deprecated. Use useFeaturedCollections hook instead.');
};

export const getGalleryItems = (): GalleryItem[] => {
  console.warn('getGalleryItems is deprecated. Use useGalleryItems hook instead.');
  return [];
};

export const setGalleryItems = (items: GalleryItem[]): void => {
  console.warn('setGalleryItems is deprecated. Use useGalleryItems hook instead.');
};

export const getServices = (): Service[] => {
  console.warn('getServices is deprecated. Use useServices hook instead.');
  return [];
};

export const setServices = (services: Service[]): void => {
  console.warn('setServices is deprecated. Use useServices hook instead.');
};

export const getCurrency = (): string => {
  console.warn('getCurrency is deprecated. Use useSiteSettings hook instead.');
  return 'USD';
};

export const setCurrency = (currency: string): void => {
  console.warn('setCurrency is deprecated. Use useSiteSettings hook instead.');
};

export const addFeaturedCollection = (collection: Omit<FeaturedCollection, 'id'>): void => {
  console.warn('addFeaturedCollection is deprecated. Use useFeaturedCollections hook instead.');
};

export const removeFeaturedCollection = (id: string): void => {
  console.warn('removeFeaturedCollection is deprecated. Use useFeaturedCollections hook instead.');
};

export const addGalleryItem = (item: Omit<GalleryItem, 'id'>): void => {
  console.warn('addGalleryItem is deprecated. Use useGalleryItems hook instead.');
};

export const removeGalleryItem = (id: string): void => {
  console.warn('removeGalleryItem is deprecated. Use useGalleryItems hook instead.');
};

export const addService = (service: Omit<Service, 'id'>): void => {
  console.warn('addService is deprecated. Use useServices hook instead.');
};

export const removeService = (id: string): void => {
  console.warn('removeService is deprecated. Use useServices hook instead.');
};
