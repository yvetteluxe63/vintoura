
import { motion } from 'framer-motion';
import { Users, Heart, Star, Award, Clock, Globe, Target, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Fashion',
      description: 'We believe that fashion is a powerful form of self-expression that should be accessible to everyone.'
    },
    {
      icon: Users,
      title: 'Client-Centered Approach',
      description: 'Every styling session is tailored to your unique personality, lifestyle, and goals.'
    },
    {
      icon: Star,
      title: 'Excellence in Service',
      description: 'We strive for perfection in every detail, from consultation to final styling.'
    },
    {
      icon: Award,
      title: 'Professional Expertise',
      description: 'Our team brings years of experience and industry knowledge to every project.'
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'We respect your time and ensure all services are delivered promptly and efficiently.'
    },
    {
      icon: Globe,
      title: 'Global Trends',
      description: 'We stay updated with international fashion trends to bring you the latest styles.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Lead Stylist',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'With over 10 years in fashion styling, Sarah brings unmatched expertise and vision to every project.',
      specialties: ['Personal Styling', 'Color Analysis', 'Wardrobe Planning']
    },
    {
      name: 'Michael Chen',
      role: 'Senior Style Consultant',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Michael specializes in corporate and formal wear, helping professionals look their absolute best.',
      specialties: ['Corporate Styling', 'Formal Wear', 'Men\'s Fashion']
    },
    {
      name: 'Emma Rodriguez',
      role: 'Personal Shopping Specialist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Emma has an eye for trends and helps clients discover pieces that perfectly match their style.',
      specialties: ['Personal Shopping', 'Trend Forecasting', 'Accessories']
    },
    {
      name: 'David Kim',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'David brings innovative styling concepts and creative vision to our team.',
      specialties: ['Creative Styling', 'Editorial Fashion', 'Brand Consulting']
    },
    {
      name: 'Lisa Wang',
      role: 'Luxury Fashion Specialist',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Lisa specializes in luxury fashion and high-end styling for special occasions.',
      specialties: ['Luxury Fashion', 'Evening Wear', 'Special Occasions']
    }
  ];

  const achievements = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower individuals through personalized fashion experiences that boost confidence and express unique personalities.'
    },
    {
      icon: Lightbulb,
      title: 'Our Vision',
      description: 'To become the leading fashion consultancy that transforms how people perceive and experience personal style.'
    },
    {
      icon: Heart,
      title: 'Our Promise',
      description: 'Every client leaves feeling more confident, stylish, and authentically themselves than when they arrived.'
    }
  ];

  return (
    <div className="min-h-screen py-20">
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
              About Vintoura
            </motion.h1>
            <motion.p 
              className="text-xl text-deep-navy/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              We're passionate about helping you discover and express your unique style. 
              Our mission is to make fashion accessible, personal, and transformative.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-deep-navy">Our Story</h2>
              <div className="space-y-4 text-deep-navy/80 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Founded in 2020, Vintoura began with a simple belief: everyone deserves to feel confident 
                  and beautiful in their own skin. What started as a personal styling service for friends 
                  has grown into a comprehensive fashion consultancy.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  We understand that fashion isn't just about clothes—it's about expressing your personality, 
                  building confidence, and feeling authentic. Our approach combines professional expertise 
                  with genuine care for each client's journey.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Today, we're proud to have helped hundreds of clients discover their signature style, 
                  whether they're preparing for a special occasion, rebuilding their wardrobe, or simply 
                  wanting to feel more confident in their daily lives.
                </motion.p>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8"
              >
                <Button 
                  asChild 
                  className="bg-soft-pink hover:bg-soft-pink/90 text-deep-navy shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Link to="/services">
                    Discover Our Services
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-soft-pink/20 to-sage-green/20 rounded-2xl"
                animate={{
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.img
                src="/public/lovable-uploads/LAMI 10 (1).jpg"
                alt="Our styling process"
                className="rounded-lg shadow-xl relative z-10"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section with Infinite Scroll */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-deep-navy">Our Values</h2>
            <p className="text-xl text-deep-navy/70 max-w-2xl mx-auto">
              These core principles guide everything we do at Vintoura
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -100 * values.length]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
              style={{ width: `${values.length * 200}%` }}
            >
              {[...values, ...values].map((value, index) => (
                <motion.div
                  key={`${value.title}-${index}`}
                  className="flex-shrink-0 w-80"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full text-center border-lavender/50 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <motion.div 
                        className="w-16 h-16 bg-sage-green/20 rounded-full flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <value.icon className="h-8 w-8 text-sage-green" />
                      </motion.div>
                      <h3 className="text-xl font-serif font-medium mb-3 text-deep-navy">{value.title}</h3>
                      <p className="text-deep-navy/70 leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Promise Section */}
      <section className="py-20 bg-gradient-to-br from-lavender/10 to-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-deep-navy">Our Foundation</h2>
            <p className="text-xl text-deep-navy/70 max-w-2xl mx-auto">
              The principles that drive our passion for fashion and excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-soft-pink/20 to-lime-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <achievement.icon className="h-10 w-10 text-deep-navy" />
                </motion.div>
                <h3 className="text-2xl font-serif font-medium mb-4 text-deep-navy">{achievement.title}</h3>
                <p className="text-deep-navy/70 leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Infinite Scroll */}
      <section className="py-20 bg-gradient-to-br from-lavender/10 to-soft-pink/10 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-deep-navy">Meet Our Team</h2>
            <p className="text-xl text-deep-navy/70 max-w-2xl mx-auto">
              Passionate professionals dedicated to making you look and feel amazing
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -100 * team.length]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
              style={{ width: `${team.length * 200}%` }}
            >
              {[...team, ...team].map((member, index) => (
                <motion.div
                  key={`${member.name}-${index}`}
                  className="flex-shrink-0 w-80"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full text-center border-lavender/50 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <motion.div
                        className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <h3 className="text-xl font-serif font-medium mb-2 text-deep-navy">{member.name}</h3>
                      <p className="text-sage-green font-medium mb-3">{member.role}</p>
                      <p className="text-deep-navy/70 leading-relaxed mb-4 text-sm">
                        {member.description}
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {member.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-soft-pink/30 text-deep-navy rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-deep-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-serif mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Ready to Transform Your Style?
            </motion.h2>
            <motion.p 
              className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Join hundreds of satisfied clients who have discovered their signature style with Vintoura
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button 
                asChild 
                size="lg"
                className="bg-soft-pink hover:bg-soft-pink/90 text-deep-navy px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/contact">
                  Schedule Consultation
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-deep-navy px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                <a href="tel:+1234567890">
                  Call Now
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
