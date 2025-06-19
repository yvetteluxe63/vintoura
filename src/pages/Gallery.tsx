
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { useGalleryItems } from '@/hooks/useSupabaseData';

const Gallery = () => {
  const { items: galleryItems, loading } = useGalleryItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = ['all', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleWhatsAppContact = (item: any) => {
    const message = `Hi! I'm interested in "${item.title}" from your ${item.category} collection. Could you please share details about price, colors, sizes, and availability?`;
    const whatsappUrl = `https://wa.me/+233244567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDirectContact = (item: any) => {
    const subject = `Inquiry about ${item.title}`;
    const body = `Hi! I'm interested in "${item.title}" from your ${item.category} collection. Could you please share details about price, colors, sizes, and availability?`;
    const mailtoUrl = `mailto:hello@vintoura.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-navy mx-auto mb-4"></div>
          <p className="text-deep-navy/70">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      {/* Enhanced Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream via-lavender/20 to-sage-green/20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, hsl(var(--soft-pink)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--sage-green)) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <Sparkles className="h-6 w-6 text-lime-yellow" />
              <span className="text-deep-navy font-medium">Curated Collection</span>
              <Sparkles className="h-6 w-6 text-lime-yellow" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6 text-deep-navy">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Style
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-gradient-to-r from-soft-pink to-sage-green bg-clip-text text-transparent"
              >
                Gallery
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-xl text-deep-navy/70 max-w-3xl mx-auto"
            >
              Explore our curated collection of fashion inspirations and styling transformations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Filters */}
      <section className="py-12 bg-gradient-to-b from-white to-cream/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8"
          >
            <div className="w-full lg:w-96">
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Input
                  type="text"
                  placeholder="Search styles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border-2 border-lavender/50 focus:border-deep-navy transition-all duration-300 shadow-lg hover:shadow-xl"
                />
              </motion.div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Button
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`capitalize transition-all duration-300 ${
                      selectedCategory === category 
                        ? 'bg-gradient-to-r from-deep-navy to-sage-green hover:from-sage-green hover:to-deep-navy text-white shadow-lg transform scale-105' 
                        : 'hover:bg-lavender/20 border-2 border-lavender/50 hover:scale-105 hover:shadow-md'
                    }`}
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ 
                    delay: index * 0.05, 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group cursor-pointer"
                  whileHover={{ y: -8 }}
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[3/4] mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Enhanced overlay content */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 text-white"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                      <p className="text-white/80 text-sm capitalize mb-3">{item.category}</p>
                      
                      {/* Contact buttons */}
                      <div className="flex gap-2">
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsAppContact(item);
                          }}
                          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </motion.button>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDirectContact(item);
                          }}
                          className="flex items-center gap-2 bg-gradient-to-r from-deep-navy to-sage-green hover:from-sage-green hover:to-deep-navy text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Phone className="h-4 w-4" />
                          Contact
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Click to view indicator */}
                    <motion.div
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedImage(item)}
                    >
                      <Sparkles className="h-4 w-4 text-deep-navy" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-16 w-16 text-lavender mx-auto mb-4" />
              </motion.div>
              <p className="text-deep-navy/70 text-lg">
                No items found matching your search criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
              <div className="p-6 bg-gradient-to-r from-sage-green/10 to-soft-pink/10">
                <h3 className="text-2xl font-serif font-medium mb-2 text-deep-navy">{selectedImage.title}</h3>
                <p className="text-deep-navy/70 capitalize mb-4">{selectedImage.category}</p>
                
                {/* Modal contact buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => handleWhatsAppContact(selectedImage)}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Ask on WhatsApp
                  </motion.button>
                  <motion.button
                    onClick={() => handleDirectContact(selectedImage)}
                    className="flex items-center gap-2 bg-gradient-to-r from-deep-navy to-sage-green hover:from-sage-green hover:to-deep-navy text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="h-5 w-5" />
                    Direct Contact
                  </motion.button>
                </div>
              </div>
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
