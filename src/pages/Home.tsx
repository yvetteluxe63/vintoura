import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, Quote, Users, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedCollections, type FeaturedCollection } from '@/store/adminStore';

const Home = () => {
  const [featuredCollections, setFeaturedCollections] = useState<FeaturedCollection[]>([]);

  useEffect(() => {
    setFeaturedCollections(getFeaturedCollections());
  }, []);

  const testimonials = [
    {
      name: 'Emma Thompson',
      role: 'Business Executive',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      quote: 'Vintoura completely transformed my wardrobe and confidence. The personal styling session was incredible!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      quote: 'The attention to detail and understanding of my style preferences was outstanding. Highly recommend!',
      rating: 5
    },
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      quote: 'Professional, creative, and results that exceeded my expectations. My style journey started here!',
      rating: 5
    }
  ];

  const stats = [
    { icon: Users, number: '500+', label: 'Happy Clients' },
    { icon: Award, number: '50+', label: 'Style Awards' },
    { icon: Heart, number: '1000+', label: 'Transformations' },
    { icon: Star, number: '4.9', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="/lovable-uploads/hero.jpg"
            alt="Fashion Hero"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-deep-navy/70 to-lavender/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-lime-yellow/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center text-white px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <Star className="h-5 w-5 text-lime-yellow" />
            <span className="text-sm font-medium">Premium Fashion Experience</span>
            <Star className="h-5 w-5 text-lime-yellow" />
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-light mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Where Elegance
            </motion.span>
            <br />
            <motion.span 
              className="font-medium text-lime-yellow"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Meets Confidence
            </motion.span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Discover your signature style with our curated fashion experience
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-soft-pink hover:bg-soft-pink/90 text-deep-navy px-8 py-6 text-lg border-0 shadow-2xl hover:shadow-soft-pink/25 transition-all duration-300"
            >
              <Link to="/contact" className="group">
                <motion.span
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  Unleash Your Style
                </motion.span>
                <motion.div
                  whileHover={{ x: 5, scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-deep-navy px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <a href="tel:+1234567890" className="group">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  Call Now
                </motion.span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Featured Collections */}
      <section className="py-20 bg-background relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(var(--soft-pink)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--sage-green)) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          
    
                
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <motion.img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-deep-navy/60 to-transparent"
                    whileHover={{ from: 'deep-navy/80' }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-lime-yellow/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    initial={false}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                >
                  <h3 className="text-xl font-serif font-medium mb-2 text-deep-navy group-hover:text-soft-pink transition-colors duration-300">
                    {collection.title}
                  </h3>
                  {collection.tags && (
                    <div className="flex flex-wrap gap-2">
                      {collection.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.15 + tagIndex * 0.1 + 0.5, duration: 0.3 }}
                          className="text-sm px-3 py-1 bg-sage-green/30 text-deep-navy rounded-full hover:bg-sage-green/50 transition-colors duration-300"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-cream via-sage-green/10 to-soft-pink/10 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(var(--soft-pink)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--sage-green)) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <Quote className="h-6 w-6 text-lime-yellow" />
              <span className="text-deep-navy font-medium">Client Love</span>
              <Quote className="h-6 w-6 text-lime-yellow" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-deep-navy">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                What Our
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-soft-pink"
              >
                Clients Say
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Real transformations, real confidence, real results
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="h-full text-center border-lavender/50 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500">
                  <CardContent className="p-6">
                    <motion.div
                      className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + i * 0.1, duration: 0.3 }}
                        >
                          <Star className="h-4 w-4 text-lime-yellow fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.p 
                      className="text-deep-navy/80 italic mb-4 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                    >
                      "{testimonial.quote}"
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
                    >
                      <h4 className="font-serif font-medium text-deep-navy">{testimonial.name}</h4>
                      <p className="text-sm text-sage-green">{testimonial.role}</p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-soft-pink/20 to-sage-green/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-8 w-8 text-deep-navy" />
                </motion.div>
                <motion.h3 
                  className="text-3xl md:text-4xl font-serif font-bold text-deep-navy mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                >
                  {stat.number}
                </motion.h3>
                <motion.p 
                  className="text-deep-navy/70 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
