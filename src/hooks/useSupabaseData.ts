
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Types that match our database schema
export interface FeaturedCollection {
  id: string;
  title: string;
  image: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  created_at?: string;
  updated_at?: string;
}

export interface SiteSettings {
  id: string;
  site_name: string;
  description: string;
  logo: string;
  primary_color: string;
  secondary_color: string;
  currency: string;
  created_at?: string;
  updated_at?: string;
}

// Hook for Featured Collections
export const useFeaturedCollections = () => {
  const [collections, setCollections] = useState<FeaturedCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('featured_collections')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
      toast({
        title: "Error",
        description: "Failed to load featured collections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addCollection = async (collection: Omit<FeaturedCollection, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('featured_collections')
        .insert([collection])
        .select()
        .single();
      
      if (error) throw error;
      setCollections(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Featured collection added successfully",
      });
    } catch (error) {
      console.error('Error adding collection:', error);
      toast({
        title: "Error",
        description: "Failed to add featured collection",
        variant: "destructive",
      });
    }
  };

  const updateCollection = async (id: string, updates: Partial<FeaturedCollection>) => {
    try {
      const { data, error } = await supabase
        .from('featured_collections')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      setCollections(prev => prev.map(c => c.id === id ? data : c));
      toast({
        title: "Success",
        description: "Featured collection updated successfully",
      });
    } catch (error) {
      console.error('Error updating collection:', error);
      toast({
        title: "Error",
        description: "Failed to update featured collection",
        variant: "destructive",
      });
    }
  };

  const removeCollection = async (id: string) => {
    try {
      const { error } = await supabase
        .from('featured_collections')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setCollections(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Success",
        description: "Featured collection removed successfully",
      });
    } catch (error) {
      console.error('Error removing collection:', error);
      toast({
        title: "Error",
        description: "Failed to remove featured collection",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return { collections, loading, addCollection, updateCollection, removeCollection, refetch: fetchCollections };
};

// Hook for Gallery Items
export const useGalleryItems = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .insert([item])
        .select()
        .single();
      
      if (error) throw error;
      setItems(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Gallery item added successfully",
      });
    } catch (error) {
      console.error('Error adding gallery item:', error);
      toast({
        title: "Error",
        description: "Failed to add gallery item",
        variant: "destructive",
      });
    }
  };

  const updateItem = async (id: string, updates: Partial<GalleryItem>) => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      setItems(prev => prev.map(i => i.id === id ? data : i));
      toast({
        title: "Success",
        description: "Gallery item updated successfully",
      });
    } catch (error) {
      console.error('Error updating gallery item:', error);
      toast({
        title: "Error",
        description: "Failed to update gallery item",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setItems(prev => prev.filter(i => i.id !== id));
      toast({
        title: "Success",
        description: "Gallery item removed successfully",
      });
    } catch (error) {
      console.error('Error removing gallery item:', error);
      toast({
        title: "Error",
        description: "Failed to remove gallery item",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, addItem, updateItem, removeItem, refetch: fetchItems };
};

// Hook for Services
export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([service])
        .select()
        .single();
      
      if (error) throw error;
      setServices(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Service added successfully",
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
      });
    }
  };

  const updateService = async (id: string, updates: Partial<Service>) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      setServices(prev => prev.map(s => s.id === id ? data : s));
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
    }
  };

  const removeService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setServices(prev => prev.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Service removed successfully",
      });
    } catch (error) {
      console.error('Error removing service:', error);
      toast({
        title: "Error",
        description: "Failed to remove service",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return { services, loading, addService, updateService, removeService, refetch: fetchServices };
};

// Hook for Site Settings
export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .single();
      
      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error('Error fetching site settings:', error);
      toast({
        title: "Error",
        description: "Failed to load site settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    if (!settings) return;
    
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ ...newSettings, updated_at: new Date().toISOString() })
        .eq('id', settings.id)
        .select()
        .single();
      
      if (error) throw error;
      setSettings(data);
      toast({
        title: "Success",
        description: "Settings updated successfully",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, updateSettings, refetch: fetchSettings };
};
