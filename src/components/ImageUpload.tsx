
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload = ({ onImageUploaded, currentImage, className }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const { toast } = useToast();

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      console.log('Starting image upload...');
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file');
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      console.log('Uploading to vintoura-images bucket:', filePath);

      const { data, error: uploadError } = await supabase.storage
        .from('vintoura-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('vintoura-images')
        .getPublicUrl(filePath);

      console.log('Public URL generated:', publicUrl);

      setPreview(publicUrl);
      onImageUploaded(publicUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

    } catch (error: any) {
      console.error('Error in uploadImage:', error);
      toast({
        title: "Upload Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      
      // Create local preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Start upload
      uploadImage(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUploaded('');
    
    // Clear the file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg border-2 border-lavender/30"
          />
          <Button
            onClick={removeImage}
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
          {uploading && (
            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
              <div className="text-white text-sm font-medium">Uploading...</div>
            </div>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-lavender/50 hover:border-lavender rounded-lg p-8 text-center transition-colors">
          <Upload className="mx-auto h-12 w-12 text-sage-green mb-4" />
          <p className="text-sm text-deep-navy/70 mb-4">
            Click to upload an image or drag and drop
          </p>
          <p className="text-xs text-deep-navy/50 mb-4">
            PNG, JPG, GIF up to 10MB
          </p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button 
              asChild 
              disabled={uploading}
              className="bg-deep-navy hover:bg-deep-navy/90 text-white"
            >
              <span>
                {uploading ? 'Uploading...' : 'Choose Image'}
              </span>
            </Button>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
