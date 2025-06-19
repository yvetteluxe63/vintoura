
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Base64ImageUploadProps {
  onImageUploaded: (base64: string) => void;
  currentImage?: string;
  className?: string;
}

const Base64ImageUpload = ({ onImageUploaded, currentImage, className }: Base64ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, file.type, file.size);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit for base64)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setPreview(base64String);
      onImageUploaded(base64String);
      setUploading(false);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    };

    reader.onerror = () => {
      setUploading(false);
      toast({
        title: "Error",
        description: "Failed to process image",
        variant: "destructive",
      });
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    onImageUploaded('');
    
    // Clear the file input
    const fileInput = document.getElementById('base64-image-upload') as HTMLInputElement;
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
              <div className="text-white text-sm font-medium">Processing...</div>
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
            PNG, JPG, GIF up to 5MB
          </p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id="base64-image-upload"
          />
          <label htmlFor="base64-image-upload">
            <Button 
              asChild 
              disabled={uploading}
              className="bg-deep-navy hover:bg-deep-navy/90 text-white"
            >
              <span>
                {uploading ? 'Processing...' : 'Choose Image'}
              </span>
            </Button>
          </label>
        </div>
      )}
    </div>
  );
};

export default Base64ImageUpload;
