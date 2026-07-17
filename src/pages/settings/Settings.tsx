import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Shield, Palette, Camera, Check, Lock, Smartphone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '../../components/ui/Input';
import { cn } from '../../lib/utils';

const getTabs = (role: string) => [
  { id: 'account', label: role === 'ngo' ? 'Organization Profile' : 'Account Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security & Privacy', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export function Settings() {
  const userRole = localStorage.getItem('userRole') || 'volunteer';
  const [activeTab, setActiveTab] = useState('account');
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tabs = getTabs(userRole);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatar(result);
        localStorage.setItem('userAvatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    const defaultAvatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200';
    setAvatar(defaultAvatar);
    localStorage.removeItem('userAvatar');
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1000);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  // Custom Toggle Component for premium look
  const Toggle = ({ label, desc, defaultChecked = false }: { label: string, desc: string, defaultChecked?: boolean }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
      <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
        <div className="pr-8">
          <p className="font-semibold text-slate-800 dark:text-slate-200">{label}</p>
          <p className="text-sm text-slate-500 mt-0.5">{desc}</p>
        </div>
        <button 
          onClick={() => setChecked(!checked)}
          className={cn(
            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            checked ? "bg-primary" : "bg-slate-200 dark:bg-slate-700"
          )}
        >
          <span 
            className={cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
              checked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </div>
    );
  };

  return (
    <div className="relative min-h-[calc(100vh-100px)] -m-6 p-8 overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/50 shadow-2xl backdrop-blur-xl">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse duration-10000" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse duration-7000" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight mb-2">
            Settings
          </h1>
          <p className="text-slate-400 text-lg">Manage your account preferences and application settings.</p>
        </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 whitespace-nowrap text-left border relative overflow-hidden group",
                    isActive 
                      ? "bg-primary/10 border-primary/30 text-primary shadow-sm" 
                      : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                  )}
                  <Icon size={18} className={cn(isActive ? "text-white" : "text-slate-400")} />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              
              {/* ACCOUNT TAB */}
              {activeTab === 'account' && (
                <div className="space-y-8">
                  {/* Profile Photo Section */}
                  <Card className="border border-slate-700/50 shadow-xl bg-slate-900/60 backdrop-blur-xl rounded-[2rem] overflow-hidden">
                    <CardContent className="p-10">
                      <div className="flex flex-col sm:flex-row items-center gap-10">
                        <div 
                          className="relative w-32 h-32 rounded-full cursor-pointer group"
                          onMouseEnter={() => setIsHoveringAvatar(true)}
                          onMouseLeave={() => setIsHoveringAvatar(false)}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
                          <img 
                            src={avatar} 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover border-4 border-slate-800 shadow-xl relative z-10"
                          />
                          <div className={cn(
                            "absolute inset-0 bg-black/60 rounded-full flex items-center justify-center transition-opacity duration-300 z-20 backdrop-blur-sm",
                            isHoveringAvatar ? "opacity-100" : "opacity-0"
                          )}>
                            <Camera className="text-white w-10 h-10 drop-shadow-md" />
                          </div>
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-2xl font-extrabold text-white mb-2">{userRole === 'ngo' ? 'Organization Logo' : 'Profile Picture'}</h3>
                          <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">We support PNG, JPEGs and GIFs under 10MB. We recommend using a square image.</p>
                          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              onChange={handleImageUpload} 
                              accept="image/*" 
                              className="hidden" 
                            />
                            <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm transition-all duration-300 rounded-xl px-6 font-bold" onClick={() => fileInputRef.current?.click()}>Upload New</Button>
                            <Button variant="outline" className="rounded-xl border-slate-600 hover:bg-slate-800 hover:text-white text-slate-300 transition-colors" onClick={handleRemoveImage}>Remove</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Profile Info Section */}
                  <Card className="border border-slate-700/50 shadow-xl bg-slate-900/60 backdrop-blur-xl rounded-[2rem]">
                    <CardContent className="p-10">
                      <h3 className="text-2xl font-extrabold text-white mb-8">{userRole === 'ngo' ? 'Organization Details' : 'Personal Information'}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {userRole === 'ngo' ? (
                          <>
                            <Input label="Organization Name" defaultValue="Green Earth NGO" />
                            <Input label="Registration / Tax ID" defaultValue="TX-9938210" />
                          </>
                        ) : (
                          <>
                            <Input label="First Name" defaultValue="Alex" />
                            <Input label="Last Name" defaultValue="Volunteer" />
                          </>
                        )}
                        <div className="md:col-span-2">
                          <Input label="Email Address" type="email" defaultValue={userRole === 'ngo' ? 'contact@greenearth.org' : 'alex@example.com'} />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold mb-3 text-slate-300">{userRole === 'ngo' ? 'Mission Statement' : 'Bio'}</label>
                          <textarea 
                            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none min-h-[140px] text-white shadow-inner"
                            placeholder={userRole === 'ngo' ? "What is your organization's mission?" : "Tell the community a little bit about yourself..."}
                            defaultValue={userRole === 'ngo' ? "Dedicated to planting trees and cleaning up our local parks to create a sustainable future." : "Passionate software developer looking to give back to the community by teaching kids how to code!"}
                          />
                        </div>
                      </div>
                      <div className="mt-10 flex justify-end">
                        <Button 
                          size="lg" 
                          className={cn(
                            "px-10 h-14 rounded-2xl shadow-xl transition-all duration-300 font-bold text-lg hover:-translate-y-1", 
                            isSaved 
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
                              : "bg-primary hover:bg-primary/90 text-white shadow-md"
                          )}
                          onClick={handleSave}
                          disabled={isSaving}
                        >
                          {isSaving ? (
                            <span className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Saving...
                            </span>
                          ) : isSaved ? (
                            <span className="flex items-center gap-2">
                              <Check size={22} className="text-emerald-400" />
                              Saved Successfully!
                            </span>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Notification Preferences</h3>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3 pl-4">Email Notifications</h4>
                      <Toggle 
                        label="Event Updates" 
                        desc="Receive emails about changes to events you've joined."
                        defaultChecked={true}
                      />
                      <Toggle 
                        label="New Recommendations" 
                        desc="Weekly digest of new events matching your AI profile."
                        defaultChecked={true}
                      />
                      <Toggle 
                        label="Marketing & Newsletters" 
                        desc="Occasional updates about our platform and impact stories."
                        defaultChecked={false}
                      />
                      
                      <div className="h-px bg-slate-100 dark:bg-slate-800 my-6"></div>
                      
                      <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-3 pl-4">Push Notifications</h4>
                      <Toggle 
                        label="Direct Messages" 
                        desc="Notify me when an NGO or volunteer sends a direct message."
                        defaultChecked={true}
                      />
                      <Toggle 
                        label="Shift Reminders" 
                        desc="Get a ping 24 hours before your scheduled shift."
                        defaultChecked={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* SECURITY TAB */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                          <Lock size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Change Password</h3>
                      </div>
                      <div className="grid gap-6 max-w-md">
                        <Input label="Current Password" type="password" placeholder="••••••••" />
                        <Input label="New Password" type="password" placeholder="••••••••" />
                        <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                        <Button className="w-fit mt-2">Update Password</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                          <Smartphone size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Two-Factor Authentication</h3>
                      </div>
                      <p className="text-slate-500 mb-6 max-w-2xl">Add an extra layer of security to your account. We'll send a code to your phone every time you sign in from a new device.</p>
                      <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950">
                        Enable 2FA
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* APPEARANCE TAB */}
              {activeTab === 'appearance' && (
                <Card className="border-0 shadow-lg bg-white dark:bg-slate-900 ring-1 ring-slate-200 dark:ring-slate-800">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Interface Theme</h3>
                    <p className="text-slate-500 mb-6">Customize the look and feel of your VolunteerAI dashboard.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div onClick={() => setTheme('light')} className={`border-2 rounded-xl p-1 cursor-pointer transition-colors ${theme === 'light' ? 'border-primary' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'}`}>
                        <div className="bg-white rounded-lg h-32 w-full shadow-sm border border-slate-200 flex flex-col p-3 gap-2">
                          <div className="h-4 w-1/3 bg-slate-200 rounded-full"></div>
                          <div className="h-10 w-full bg-slate-100 rounded-md"></div>
                          <div className="h-10 w-full bg-slate-100 rounded-md"></div>
                        </div>
                        <p className={`text-center mt-3 text-sm ${theme === 'light' ? 'font-semibold text-slate-800 dark:text-white' : 'font-medium text-slate-500'}`}>Light</p>
                      </div>
                      
                      <div onClick={() => setTheme('dark')} className={`border-2 rounded-xl p-1 cursor-pointer transition-colors ${theme === 'dark' ? 'border-primary' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'}`}>
                        <div className="bg-slate-950 rounded-lg h-32 w-full shadow-sm border border-slate-800 flex flex-col p-3 gap-2">
                          <div className="h-4 w-1/3 bg-slate-800 rounded-full"></div>
                          <div className="h-10 w-full bg-slate-800 rounded-md"></div>
                          <div className="h-10 w-full bg-slate-800 rounded-md"></div>
                        </div>
                        <p className={`text-center mt-3 text-sm ${theme === 'dark' ? 'font-semibold text-slate-800 dark:text-white' : 'font-medium text-slate-500'}`}>Dark</p>
                      </div>

                      <div onClick={() => setTheme('auto')} className={`border-2 rounded-xl p-1 cursor-pointer transition-colors ${theme === 'auto' ? 'border-primary' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'}`}>
                        <div className="bg-gradient-to-br from-white to-slate-900 rounded-lg h-32 w-full shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col p-3 gap-2 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-slate-400 bg-white/80 dark:bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">System</span>
                          </div>
                        </div>
                        <p className={`text-center mt-3 text-sm ${theme === 'auto' ? 'font-semibold text-slate-800 dark:text-white' : 'font-medium text-slate-500'}`}>Auto</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  );
}
