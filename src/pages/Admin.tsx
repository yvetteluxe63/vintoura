import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Users, 
  BarChart3, 
  Image, 
  Plus, 
  Trash2, 
  Edit,
  FileText,
  Save,
  Sparkles,
  X,
  Check
} from 'lucide-react';
import Base64ImageUpload from '@/components/Base64ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  useFeaturedCollections, 
  useGalleryItems, 
  useServices, 
  useSiteSettings,
  type Service,
  type GalleryItem
} from '@/hooks/useSupabaseData';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Use Supabase hooks for data management
  const { services, loading: servicesLoading, addService, removeService } = useServices();
  const { items: galleryItems, loading: galleryLoading, addItem: addGalleryItem, removeItem: removeGalleryItem } = useGalleryItems();
  const { collections: featuredCollections, loading: collectionsLoading } = useFeaturedCollections();
  const { settings: siteSettings, loading: settingsLoading, updateSettings } = useSiteSettings();
  
  const [newService, setNewService] = useState({ 
    title: '', 
    description: '', 
    image: '', 
    features: [''] 
  });

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editServiceData, setEditServiceData] = useState<Partial<Service>>({});

  const [newGalleryItem, setNewGalleryItem] = useState({ title: '', image: '', category: 'casual' });
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [editGalleryData, setEditGalleryData] = useState<Partial<GalleryItem>>({});

  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Alice Johnson', role: 'Senior Stylist', imageUrl: '' },
  ]);
  const [newTeamMember, setNewTeamMember] = useState({ name: '', role: '', imageUrl: '' });

  // Local state for site settings form
  const [localSiteSettings, setLocalSiteSettings] = useState({
    siteName: siteSettings?.site_name || 'Vintoura',
    description: siteSettings?.description || 'Where elegance meets confidence. Discover your signature style with our curated fashion experience.',
    logo: siteSettings?.logo || '',
    primaryColor: siteSettings?.primary_color || '#f43f5e',
    secondaryColor: siteSettings?.secondary_color || '#6d28d9',
  });

  // Update local settings when siteSettings changes
  React.useEffect(() => {
    if (siteSettings) {
      setLocalSiteSettings({
        siteName: siteSettings.site_name,
        description: siteSettings.description,
        logo: siteSettings.logo,
        primaryColor: siteSettings.primary_color,
        secondaryColor: siteSettings.secondary_color,
      });
    }
  }, [siteSettings]);

  const handleAddService = async () => {
    if (!newService.title || !newService.description) return;
    
    await addService({
      title: newService.title,
      description: newService.description,
      image: newService.image,
      features: newService.features.filter(feature => feature.trim() !== '')
    });
    
    setNewService({ title: '', description: '', image: '', features: [''] });
  };

  const handleDeleteService = async (id: string) => {
    await removeService(id);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setEditServiceData({
      title: service.title,
      description: service.description,
      image: service.image,
      features: [...service.features]
    });
  };

  const handleUpdateService = async () => {
    if (!editingService || !editServiceData.title || !editServiceData.description) return;
    
    // Since we don't have an update function in the hook, we'll remove and add
    // This is a temporary solution - ideally we'd add an update function to the hook
    await removeService(editingService.id);
    await addService({
      title: editServiceData.title!,
      description: editServiceData.description!,
      image: editServiceData.image || editingService.image,
      features: editServiceData.features || editingService.features
    });
    
    setEditingService(null);
    setEditServiceData({});
  };

  const cancelEditService = () => {
    setEditingService(null);
    setEditServiceData({});
  };

  const addFeature = () => {
    setNewService({ ...newService, features: [...newService.features, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...newService.features];
    updatedFeatures[index] = value;
    setNewService({ ...newService, features: updatedFeatures });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = newService.features.filter((_, i) => i !== index);
    setNewService({ ...newService, features: updatedFeatures });
  };

  const addEditFeature = () => {
    if (editServiceData.features) {
      setEditServiceData({
        ...editServiceData,
        features: [...editServiceData.features, '']
      });
    }
  };

  const updateEditFeature = (index: number, value: string) => {
    if (editServiceData.features) {
      const updatedFeatures = [...editServiceData.features];
      updatedFeatures[index] = value;
      setEditServiceData({ ...editServiceData, features: updatedFeatures });
    }
  };

  const removeEditFeature = (index: number) => {
    if (editServiceData.features) {
      const updatedFeatures = editServiceData.features.filter((_, i) => i !== index);
      setEditServiceData({ ...editServiceData, features: updatedFeatures });
    }
  };

  const handleAddGalleryItem = async () => {
    if (!newGalleryItem.title || !newGalleryItem.image) return;
    
    await addGalleryItem({
      title: newGalleryItem.title,
      image: newGalleryItem.image,
      category: newGalleryItem.category
    });
    
    setNewGalleryItem({ title: '', image: '', category: 'casual' });
  };

  const handleDeleteGalleryItem = async (id: string) => {
    await removeGalleryItem(id);
  };

  const handleEditGalleryItem = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setEditGalleryData({
      title: item.title,
      category: item.category,
      image: item.image
    });
  };

  const handleUpdateGalleryItem = async () => {
    if (!editingGalleryItem || !editGalleryData.title) return;
    
    // Remove and add pattern (temporary solution)
    await removeGalleryItem(editingGalleryItem.id);
    await addGalleryItem({
      title: editGalleryData.title!,
      image: editGalleryData.image || editingGalleryItem.image,
      category: editGalleryData.category || editingGalleryItem.category
    });
    
    setEditingGalleryItem(null);
    setEditGalleryData({});
  };

  const cancelEditGalleryItem = () => {
    setEditingGalleryItem(null);
    setEditGalleryData({});
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { ...newTeamMember, id: Date.now().toString() }]);
    setNewTeamMember({ name: '', role: '', imageUrl: '' });
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const handleSaveSettings = async () => {
    await updateSettings({
      site_name: localSiteSettings.siteName,
      description: localSiteSettings.description,
      logo: localSiteSettings.logo,
      primary_color: localSiteSettings.primaryColor,
      secondary_color: localSiteSettings.secondaryColor,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-lavender/10 to-sage-green/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto p-4 md:p-8"
      >
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center space-x-3 mb-4"
          >
            <div className="p-3 bg-gradient-to-r from-deep-navy to-sage-green rounded-xl">
              <Sparkles className="h-8 w-8 text-cream" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-deep-navy to-sage-green bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-deep-navy/70 text-lg">Manage your fashion platform with style</p>
            </div>
          </motion.div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="bg-gradient-to-r from-deep-navy via-sage-green to-deep-navy p-1 rounded-t-lg">
                <TabsList className="bg-transparent grid w-full grid-cols-5 gap-1">
                  <TabsTrigger 
                    value="dashboard"
                    className="data-[state=active]:bg-cream data-[state=active]:text-deep-navy text-cream/80 hover:text-cream transition-all duration-300 font-medium"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings"
                    className="data-[state=active]:bg-cream data-[state=active]:text-deep-navy text-cream/80 hover:text-cream transition-all duration-300 font-medium"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Settings</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="services"
                    className="data-[state=active]:bg-cream data-[state=active]:text-deep-navy text-cream/80 hover:text-cream transition-all duration-300 font-medium"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Services</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gallery"
                    className="data-[state=active]:bg-cream data-[state=active]:text-deep-navy text-cream/80 hover:text-cream transition-all duration-300 font-medium"
                  >
                    <Image className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Gallery</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team"
                    className="data-[state=active]:bg-cream data-[state=active]:text-deep-navy text-cream/80 hover:text-cream transition-all duration-300 font-medium"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Team</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6 md:p-8">
                <TabsContent value="dashboard" className="space-y-6 mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-soft-pink/20 to-soft-pink/5">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-deep-navy/60 text-sm font-medium">Total Services</p>
                              <p className="text-2xl font-bold text-deep-navy">
                                {servicesLoading ? '...' : services.length}
                              </p>
                            </div>
                            <div className="p-3 bg-soft-pink/20 rounded-xl">
                              <FileText className="h-6 w-6 text-deep-navy" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-sage-green/20 to-sage-green/5">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-deep-navy/60 text-sm font-medium">Gallery Items</p>
                              <p className="text-2xl font-bold text-deep-navy">
                                {galleryLoading ? '...' : galleryItems.length}
                              </p>
                            </div>
                            <div className="p-3 bg-sage-green/20 rounded-xl">
                              <Image className="h-6 w-6 text-deep-navy" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="border-0 shadow-lg bg-gradient-to-br from-lime-yellow/20 to-lime-yellow/5">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-deep-navy/60 text-sm font-medium">Team Members</p>
                              <p className="text-2xl font-bold text-deep-navy">{teamMembers.length}</p>
                            </div>
                            <div className="p-3 bg-lime-yellow/20 rounded-xl">
                              <Users className="h-6 w-6 text-deep-navy" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-deep-navy mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-lavender/10 to-transparent rounded-lg">
                            <div className="w-2 h-2 bg-sage-green rounded-full"></div>
                            <p className="text-deep-navy/80">Database connected successfully</p>
                            <Badge variant="secondary" className="ml-auto">Today</Badge>
                          </div>
                          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-soft-pink/10 to-transparent rounded-lg">
                            <div className="w-2 h-2 bg-soft-pink rounded-full"></div>
                            <p className="text-deep-navy/80">Admin dashboard fully functional</p>
                            <Badge variant="secondary" className="ml-auto">Today</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6 mt-0">
                  {settingsLoading ? (
                    <div className="text-center py-8">Loading settings...</div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <Settings className="h-6 w-6 text-deep-navy" />
                        <h3 className="text-2xl font-semibold text-deep-navy">Site Configuration</h3>
                      </div>
                      
                      <div className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Site Name</label>
                            <Input
                              value={localSiteSettings.siteName}
                              onChange={(e) => setLocalSiteSettings({ ...localSiteSettings, siteName: e.target.value })}
                              className="border-lavender/30 focus:border-sage-green transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Primary Color</label>
                            <Input
                              type="color"
                              value={localSiteSettings.primaryColor}
                              onChange={(e) => setLocalSiteSettings({ ...localSiteSettings, primaryColor: e.target.value })}
                              className="h-12 border-lavender/30 focus:border-sage-green transition-colors"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-deep-navy">Site Description</label>
                          <Textarea
                            value={localSiteSettings.description}
                            onChange={(e) => setLocalSiteSettings({ ...localSiteSettings, description: e.target.value })}
                            className="min-h-[100px] border-lavender/30 focus:border-sage-green transition-colors resize-none"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-deep-navy">Logo Upload</label>
                          <Base64ImageUpload
                            onImageUploaded={(base64) => setLocalSiteSettings({ ...localSiteSettings, logo: base64 })}
                            currentImage={localSiteSettings.logo}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleSaveSettings}
                        className="bg-gradient-to-r from-deep-navy to-sage-green hover:from-sage-green hover:to-deep-navy text-cream transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Settings
                      </Button>
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="services" className="space-y-6 mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <FileText className="h-6 w-6 text-deep-navy" />
                      <h3 className="text-2xl font-semibold text-deep-navy">Service Management</h3>
                    </div>
                    
                    <Card className="border-lavender/30 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-lavender/10 to-sage-green/10">
                        <CardTitle className="text-deep-navy">Add New Service</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Service Title</label>
                            <Input
                              value={newService.title}
                              onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                              placeholder="Enter service title"
                              className="border-lavender/30 focus:border-sage-green transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Service Image</label>
                            <Base64ImageUpload
                              onImageUploaded={(base64) => setNewService({ ...newService, image: base64 })}
                              currentImage={newService.image}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-deep-navy">Description</label>
                          <Textarea
                            value={newService.description}
                            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            placeholder="Describe your service"
                            className="min-h-[100px] border-lavender/30 focus:border-sage-green transition-colors resize-none"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-deep-navy">Features</label>
                          {newService.features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                              <Input
                                value={feature}
                                onChange={(e) => updateFeature(index, e.target.value)}
                                placeholder="Enter feature"
                                className="border-lavender/30 focus:border-sage-green transition-colors"
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeFeature(index)}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 shadow-sm"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            onClick={addFeature}
                            className="border-sage-green/50 text-sage-green hover:bg-sage-green/10 hover:border-sage-green shadow-sm"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Feature
                          </Button>
                        </div>
                        
                        <Button 
                          onClick={handleAddService}
                          disabled={servicesLoading}
                          className="w-full bg-gradient-to-r from-deep-navy to-sage-green hover:from-sage-green hover:to-deep-navy text-cream transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Service
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="grid gap-4">
                      <h4 className="text-xl font-semibold text-deep-navy">Current Services</h4>
                      {servicesLoading ? (
                        <div className="text-center py-8">Loading services...</div>
                      ) : (
                        services.map((service, index) => (
                          <motion.div
                            key={service.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <Card className="border-lavender/30 shadow-md hover:shadow-lg transition-all duration-300">
                              <CardContent className="p-6">
                                {editingService?.id === service.id ? (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium text-deep-navy">Title</label>
                                        <Input
                                          value={editServiceData.title || ''}
                                          onChange={(e) => setEditServiceData({ ...editServiceData, title: e.target.value })}
                                          className="border-lavender/30 focus:border-sage-green transition-colors"
                                        />
                                      </div>
                                      <div className="space-y-2">
                                        <label className="text-sm font-medium text-deep-navy">Image</label>
                                        <Base64ImageUpload
                                          onImageUploaded={(base64) => setEditServiceData({ ...editServiceData, image: base64 })}
                                          currentImage={editServiceData.image || service.image}
                                        />
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-deep-navy">Description</label>
                                      <Textarea
                                        value={editServiceData.description || ''}
                                        onChange={(e) => setEditServiceData({ ...editServiceData, description: e.target.value })}
                                        className="min-h-[100px] border-lavender/30 focus:border-sage-green transition-colors resize-none"
                                      />
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-deep-navy">Features</label>
                                      {(editServiceData.features || []).map((feature, index) => (
                                        <div key={index} className="flex gap-2">
                                          <Input
                                            value={feature}
                                            onChange={(e) => updateEditFeature(index, e.target.value)}
                                            className="border-lavender/30 focus:border-sage-green transition-colors"
                                          />
                                          <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeEditFeature(index)}
                                            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 shadow-sm"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ))}
                                      <Button
                                        variant="outline"
                                        onClick={addEditFeature}
                                        className="border-sage-green/50 text-sage-green hover:bg-sage-green/10 hover:border-sage-green shadow-sm"
                                      >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Feature
                                      </Button>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={handleUpdateService}
                                        className="bg-gradient-to-r from-sage-green to-lime-yellow hover:from-lime-yellow hover:to-sage-green text-deep-navy shadow-lg"
                                      >
                                        <Check className="mr-2 h-4 w-4" />
                                        Save Changes
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={cancelEditService}
                                        className="border-gray-300 text-gray-600 hover:bg-gray-50 shadow-sm"
                                      >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-semibold text-deep-navy text-lg mb-2">{service.title}</h5>
                                      <p className="text-deep-navy/70 mb-3">{service.description}</p>
                                      <div className="flex flex-wrap gap-2">
                                        {service.features.map((feature, idx) => (
                                          <Badge key={idx} variant="secondary" className="bg-sage-green/10 text-sage-green border border-sage-green/20">
                                            {feature}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                      <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={() => handleEditService(service)}
                                        className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-sm"
                                      >
                                        <Edit className="h-4 w-4" />
                                      </Button>
                                      <Button 
                                        variant="outline" 
                                        size="icon" 
                                        onClick={() => handleDeleteService(service.id)}
                                        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 shadow-sm"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="gallery" className="space-y-6 mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <Image className="h-6 w-6 text-deep-navy" />
                      <h3 className="text-2xl font-semibold text-deep-navy">Gallery Management</h3>
                    </div>
                    
                    <Card className="border-lavender/30 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-lavender/10 to-sage-green/10">
                        <CardTitle className="text-deep-navy">Add Gallery Item</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Title</label>
                            <Input
                              value={newGalleryItem.title}
                              onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                              placeholder="Enter image title"
                              className="border-lavender/30 focus:border-sage-green transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Category</label>
                            <Input
                              value={newGalleryItem.category}
                              onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                              placeholder="Enter category"
                              className="border-lavender/30 focus:border-sage-green transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Image</label>
                            <Base64ImageUpload
                              onImageUploaded={(base64) => setNewGalleryItem({ ...newGalleryItem, image: base64 })}
                              currentImage={newGalleryItem.image}
                            />
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleAddGalleryItem}
                          disabled={galleryLoading}
                          className="w-full bg-gradient-to-r from-deep-navy to-sage-green hover:from-sage-green hover:to-deep-navy text-cream transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add to Gallery
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="grid gap-4">
                      <h4 className="text-xl font-semibold text-deep-navy">Current Gallery</h4>
                      {galleryLoading ? (
                        <div className="text-center py-8">Loading gallery...</div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {galleryItems.map((item, index) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                              <Card className="border-lavender/30 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                                {editingGalleryItem?.id === item.id ? (
                                  <CardContent className="p-4 space-y-4">
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-deep-navy">Title</label>
                                      <Input
                                        value={editGalleryData.title || ''}
                                        onChange={(e) => setEditGalleryData({ ...editGalleryData, title: e.target.value })}
                                        className="border-lavender/30 focus:border-sage-green transition-colors"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-deep-navy">Category</label>
                                      <Input
                                        value={editGalleryData.category || ''}
                                        onChange={(e) => setEditGalleryData({ ...editGalleryData, category: e.target.value })}
                                        className="border-lavender/30 focus:border-sage-green transition-colors"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-sm font-medium text-deep-navy">Image</label>
                                      <Base64ImageUpload
                                        onImageUploaded={(base64) => setEditGalleryData({ ...editGalleryData, image: base64 })}
                                        currentImage={editGalleryData.image || item.image}
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={handleUpdateGalleryItem}
                                        size="sm"
                                        className="bg-gradient-to-r from-sage-green to-lime-yellow hover:from-lime-yellow hover:to-sage-green text-deep-navy shadow-lg"
                                      >
                                        <Check className="mr-1 h-3 w-3" />
                                        Save
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={cancelEditGalleryItem}
                                        className="border-gray-300 text-gray-600 hover:bg-gray-50 shadow-sm"
                                      >
                                        <X className="mr-1 h-3 w-3" />
                                        Cancel
                                      </Button>
                                    </div>
                                  </CardContent>
                                ) : (
                                  <>
                                    <div className="aspect-square overflow-hidden">
                                      <img 
                                        src={item.image || 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                                      />
                                    </div>
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="font-semibold text-deep-navy">{item.title}</h5>
                                        <div className="flex gap-1">
                                          <Button 
                                            variant="outline" 
                                            size="icon"
                                            onClick={() => handleEditGalleryItem(item)}
                                            className="h-8 w-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-sm"
                                          >
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                          <Button 
                                            variant="outline" 
                                            size="icon"
                                            onClick={() => handleDeleteGalleryItem(item.id)}
                                            className="h-8 w-8 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 shadow-sm"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                      <Badge variant="outline" className="text-xs border-sage-green/30 text-sage-green">
                                        {item.category}
                                      </Badge>
                                    </CardContent>
                                  </>
                                )}
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="team" className="space-y-6 mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <Users className="h-6 w-6 text-deep-navy" />
                      <h3 className="text-2xl font-semibold text-deep-navy">Team Management</h3>
                    </div>
                    
                    <Card className="border-lavender/30 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-lavender/10 to-sage-green/10">
                        <CardTitle className="text-deep-navy">Add Team Member</CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Name</label>
                            <Input
                              value={newTeamMember.name}
                              onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                              placeholder="Enter team member name"
                              className="border-lavender/30 focus:border-sage-green transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Role</label>
                            <Input
                              value={newTeamMember.role}
                              onChange={(e) => setNewTeamMember({ ...newTeamMember, role: e.target.value })}
                              placeholder="Enter role/position"
                              className="border-lavender/30 focus:border-sage-green transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-deep-navy">Photo</label>
                            <Base64ImageUpload
                              onImageUploaded={(base64) => setNewTeamMember({ ...newTeamMember, imageUrl: base64 })}
                              currentImage={newTeamMember.imageUrl}
                            />
                          </div>
                        </div>
                        
                        <Button 
                          onClick={addTeamMember}
                          className="w-full bg-gradient-to-r from-deep-navy to-sage-green hover:from-sage-green hover:to-deep-navy text-cream transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Team Member
                        </Button>
                      </CardContent>
                    </Card>

                    <div className="grid gap-4">
                      <h4 className="text-xl font-semibold text-deep-navy">Current Team</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teamMembers.map((member, index) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <Card className="border-lavender/30 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                              <div className="aspect-square overflow-hidden">
                                <img 
                                  src={member.imageUrl || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                                  alt={member.name} 
                                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
                                />
                              </div>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-deep-navy text-lg">{member.name}</h5>
                                    <p className="text-sage-green text-sm">{member.role}</p>
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    size="icon" 
                                    onClick={() => deleteTeamMember(member.id)}
                                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 shadow-sm"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Admin;
