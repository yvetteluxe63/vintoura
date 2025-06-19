
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useServices } from '@/hooks/useSupabaseData';

const Services = () => {
  const { services, loading } = useServices();

  const handleWhatsAppContact = (serviceName?: string) => {
    const phoneNumber = '+233244567890';
    const message = serviceName 
      ? `Hi! I'm interested in learning more about your ${serviceName} service. Could you please provide more information about pricing and availability?`
      : 'Hi! I\'m interested in learning more about Vintoura\'s styling services. Could you please provide more information about pricing and availability?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneCall = () => {
    window.location.href = 'tel:+233244567890';
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-deep-navy mx-auto mb-4"></div>
          <p className="text-deep-navy/70">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cream via-lavender/20 to-sage-green/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif mb-6 bg-gradient-to-r from-deep-navy to-sage-green bg-clip-text text-transparent">Our Services</h1>
            <p className="text-xl text-deep-navy/70 max-w-3xl mx-auto">
              Discover our comprehensive styling services designed to transform your wardrobe 
              and elevate your personal style to new heights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-b from-cream/50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:scale-105 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-medium mb-3 bg-gradient-to-r from-deep-navy to-sage-green bg-clip-text text-transparent">{service.title}</h3>
                    <p className="text-deep-navy/70 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-deep-navy/80">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-sage-green to-lime-yellow rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-3">
                      <Button
                        onClick={() => handleWhatsAppContact(service.title)}
                        className="w-full bg-gradient-to-r from-sage-green to-lime-yellow hover:from-lime-yellow hover:to-sage-green text-deep-navy border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        WhatsApp for Pricing
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={handlePhoneCall}
                          variant="outline"
                          className="border-2 border-deep-navy/20 text-deep-navy hover:bg-deep-navy hover:text-white hover:border-deep-navy transition-all duration-300"
                        >
                          <Phone className="mr-2 h-4 w-4" />
                          Call
                        </Button>
                        <Button asChild variant="outline" className="border-2 border-sage-green/50 text-sage-green hover:bg-sage-green hover:text-white hover:border-sage-green transition-all duration-300">
                          <Link 
                            to={`/contact?service=${encodeURIComponent(service.title)}`}
                            className="flex items-center justify-center"
                          >
                            Contact
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-deep-navy via-deep-navy/95 to-sage-green/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to Transform Your Style?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss your style goals and create a personalized plan that fits your lifestyle and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleWhatsAppContact()}
                size="lg"
                className="px-8 bg-gradient-to-r from-sage-green to-lime-yellow hover:from-lime-yellow hover:to-sage-green text-deep-navy shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start with WhatsApp
              </Button>
              <Button
                onClick={handlePhoneCall}
                size="lg"
                variant="outline"
                className="px-8 border-2 border-white text-white hover:bg-white hover:text-deep-navy shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 border-2 border-sage-green text-sage-green hover:bg-sage-green hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <Link to="/contact">
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
