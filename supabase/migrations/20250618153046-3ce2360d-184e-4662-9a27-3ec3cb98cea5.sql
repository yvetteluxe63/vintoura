
-- Create table for featured collections
CREATE TABLE public.featured_collections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL, -- This will store the base64 image data
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for gallery items
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL, -- This will store the base64 image data
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for services
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  image TEXT NOT NULL, -- This will store the base64 image data
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for site settings
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT NOT NULL DEFAULT 'Vintoura',
  description TEXT NOT NULL DEFAULT 'Where elegance meets confidence. Discover your signature style with our curated fashion experience.',
  logo TEXT DEFAULT '', -- This will store the base64 logo data
  primary_color TEXT NOT NULL DEFAULT '#f43f5e',
  secondary_color TEXT NOT NULL DEFAULT '#6d28d9',
  currency TEXT NOT NULL DEFAULT 'USD',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default data for featured collections
INSERT INTO public.featured_collections (title, image, tags) VALUES
('Summer Elegance', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', ARRAY['summer', 'elegant']),
('Evening Sophistication', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', ARRAY['evening', 'formal']),
('Casual Chic', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', ARRAY['casual', 'chic']);

-- Insert default data for gallery items
INSERT INTO public.gallery_items (title, image, category) VALUES
('Classic Blazer', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'formal'),
('Summer Dress', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'casual'),
('Evening Gown', 'https://images.unsplash.com/photo-1566479179817-c0a8cb133fc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'evening'),
('Street Style', 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'casual');

-- Insert default data for services
INSERT INTO public.services (title, description, features, image) VALUES
('Personal Styling', 'One-on-one styling sessions tailored to your lifestyle, body type, and personal preferences.', ARRAY['Style assessment', 'Color analysis', 'Body type consultation', 'Personal lookbook'], 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'),
('Wardrobe Makeover', 'Complete transformation of your existing wardrobe with expert curation and organization.', ARRAY['Closet audit', 'Item categorization', 'Styling combinations', 'Shopping recommendations'], 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80');

-- Insert default site settings
INSERT INTO public.site_settings (site_name, description) VALUES
('Vintoura', 'Where elegance meets confidence. Discover your signature style with our curated fashion experience.');

-- Enable RLS on all tables (making them public for now since this is admin functionality)
ALTER TABLE public.featured_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since this is for admin functionality)
CREATE POLICY "Enable read access for all users" ON public.featured_collections FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.featured_collections FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.featured_collections FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.featured_collections FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.gallery_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.gallery_items FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.gallery_items FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.services FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.services FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.services FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.services FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON public.site_settings FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON public.site_settings FOR DELETE USING (true);
