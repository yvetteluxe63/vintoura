import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form Data:', formData);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly.",
    })
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Fashion Street', 'Style District, ST 12345'],
      color: 'text-soft-pink'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
      color: 'text-sage-green'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@vintoura.com', 'info@vintoura.com'],
      color: 'text-lime-yellow'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9AM - 7PM', 'Sat - Sun: 10AM - 5PM'],
      color: 'text-deep-navy'
    }
  ];

  return (
    <motion.div 
      className="min-h-screen py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <section className="py-20 fashion-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-serif mb-6 text-deep-navy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              className="text-xl text-deep-navy/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Ready to transform your style? Let's start your fashion journey together.
            </motion.p>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                asChild 
                size="lg"
                className="bg-soft-pink hover:bg-soft-pink/90 text-deep-navy px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <a href="https://wa.me/1234567890?text=Hi! I'm interested in your styling services.">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </a>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-deep-navy text-deep-navy hover:bg-deep-navy hover:text-white px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <a href="tel:+1234567890">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-2xl border-lavender/30 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-soft-pink/10 to-sage-green/10">
                <CardTitle className="text-2xl font-serif text-deep-navy">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <Input
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="border-lavender/30 focus:border-soft-pink transition-all duration-300 hover:border-soft-pink/50"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="border-lavender/30 focus:border-soft-pink transition-all duration-300 hover:border-soft-pink/50"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Input
                      type="tel"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="border-lavender/30 focus:border-soft-pink transition-all duration-300 hover:border-soft-pink/50"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <Input
                      placeholder="Service Interest"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="border-lavender/30 focus:border-soft-pink transition-all duration-300 hover:border-soft-pink/50"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <Textarea
                      placeholder="Tell us about your style goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="min-h-[120px] border-lavender/30 focus:border-soft-pink transition-all duration-300 hover:border-soft-pink/50"
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full bg-soft-pink hover:bg-soft-pink/90 text-deep-navy shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-lg font-medium"
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-serif mb-6 text-deep-navy">Let's Connect</h2>
              <p className="text-lg text-deep-navy/70 leading-relaxed">
                We're here to help you discover your unique style. Reach out through any of these channels 
                and let's start your fashion transformation journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="h-full border-lavender/30 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br from-soft-pink/20 to-sage-green/20 flex items-center justify-center mx-auto mb-4 ${info.color}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <info.icon className="h-6 w-6" />
                      </motion.div>
                      <h3 className="font-serif font-medium text-deep-navy mb-2">{info.title}</h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-deep-navy/70">{detail}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Card className="border-lavender/30 bg-white/90 backdrop-blur-sm shadow-xl overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-sage-green/20 to-soft-pink/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-deep-navy mx-auto mb-4" />
                    <p className="text-deep-navy font-medium">Interactive Map Coming Soon</p>
                    <p className="text-sm text-deep-navy/70">Find us at our stylish studio location</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
