import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Package, Calendar, MessageSquare, Clock, Bell, Settings, User, LogOut 
} from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
}

interface Treatment {
  id: number;
  name: string;
  status: 'active' | 'pending' | 'paused';
  nextRefill: string;
  progress: number;
  description: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: 'Your next refill will ship in 3 days',
      date: '2 hours ago',
      read: false
    },
    {
      id: 2,
      message: 'Dr. Lee has reviewed your progress photos',
      date: 'Yesterday',
      read: false
    },
    {
      id: 3,
      message: 'Your treatment plan has been updated',
      date: '3 days ago',
      read: true
    }
  ]);
  
  const [treatments, setTreatments] = useState<Treatment[]>([
    {
      id: 1,
      name: 'Advanced Hair Restoration Kit',
      status: 'active',
      nextRefill: '05/15/2025',
      progress: 35,
      description: 'Month 2 of 6-month treatment plan'
    },
    {
      id: 2,
      name: 'Weight Management Program',
      status: 'pending',
      nextRefill: '05/20/2025',
      progress: 0,
      description: 'Awaiting medical review'
    }
  ]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Update document title
    document.title = "My Dashboard | Revitalize MD";
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  return (
    <div className="min-h-screen bg-charcoal-50 pt-24">
      <div className="container-custom py-12">
        <div className="bg-gradient-to-r from-midnight-700 to-forest-700 text-white rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-playfair font-semibold mb-2">
                Welcome back, Alex!
              </h1>
              <p className="text-white/90">
                Your treatment journey is progressing well. Here's your latest update.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="btn bg-white text-midnight-700 hover:bg-charcoal-100">
                Schedule Consult
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-charcoal-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-midnight-100 rounded-full flex items-center justify-center text-midnight-700 font-semibold text-lg mr-4">
                    A
                  </div>
                  <div>
                    <h2 className="font-semibold text-charcoal-800">Alex Johnson</h2>
                    <p className="text-sm text-charcoal-500">Member since March 2025</p>
                  </div>
                </div>
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: <LineChart size={20} /> },
                    { id: 'treatments', label: 'My Treatments', icon: <Package size={20} /> },
                    { id: 'appointments', label: 'Appointments', icon: <Calendar size={20} /> },
                    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
                    { id: 'history', label: 'Order History', icon: <Clock size={20} /> },
                    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
                    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                          activeTab === item.id 
                            ? 'bg-midnight-50 text-midnight-700' 
                            : 'text-charcoal-600 hover:bg-charcoal-50 hover:text-charcoal-800'
                        }`}
                        onClick={() => setActiveTab(item.id)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                        {item.id === 'notifications' && notifications.some(n => !n.read) && (
                          <span className="ml-auto bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {notifications.filter(n => !n.read).length}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 mt-6 border-t border-charcoal-100">
                  <button className="w-full flex items-center p-3 rounded-lg text-left text-charcoal-600 hover:bg-charcoal-50 hover:text-charcoal-800 transition-colors">
                    <span className="mr-3"><User size={20} /></span>
                    My Account
                  </button>
                  <button className="w-full flex items-center p-3 rounded-lg text-left text-charcoal-600 hover:bg-charcoal-50 hover:text-charcoal-800 transition-colors">
                    <span className="mr-3"><LogOut size={20} /></span>
                    Sign Out
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold text-charcoal-800 mb-6">
                  Treatment Overview
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {treatments.map((treatment) => (
                    <div 
                      key={treatment.id}
                      className="bg-white rounded-xl shadow-sm p-6"
                    >
                      <h3 className="font-semibold text-charcoal-800 mb-2">
                        {treatment.name}
                      </h3>
                      <div className="flex items-center mb-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded ${
                          treatment.status === 'active' 
                            ? 'bg-mint-100 text-mint-700' 
                            : treatment.status === 'pending' 
                              ? 'bg-peach-100 text-peach-700' 
                              : 'bg-charcoal-100 text-charcoal-700'
                        }`}>
                          {treatment.status.charAt(0).toUpperCase() + treatment.status.slice(1)}
                        </span>
                        <span className="text-sm text-charcoal-500 ml-3">
                          {treatment.description}
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-charcoal-600">Progress</span>
                          <span className="text-charcoal-800 font-medium">{treatment.progress}%</span>
                        </div>
                        <div className="w-full bg-charcoal-100 rounded-full h-2">
                          <div 
                            className="bg-midnight-600 h-full rounded-full"
                            style={{ width: `${treatment.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal-600">Next refill ships:</span>
                        <span className="text-charcoal-800 font-medium">{treatment.nextRefill}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-semibold text-charcoal-800 mb-6">
                  Recent Updates
                </h2>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-charcoal-800">Notifications</h3>
                    {notifications.some(n => !n.read) && (
                      <button 
                        className="text-sm text-midnight-600 hover:text-midnight-700"
                        onClick={markAllAsRead}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-4 rounded-lg border ${
                            notification.read 
                              ? 'border-charcoal-100 bg-white' 
                              : 'border-midnight-100 bg-midnight-50'
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className={`${notification.read ? 'text-charcoal-700' : 'text-charcoal-800 font-medium'}`}>
                              {notification.message}
                            </p>
                            {!notification.read && (
                              <span className="bg-midnight-600 w-2 h-2 rounded-full flex-shrink-0 mt-2"></span>
                            )}
                          </div>
                          <p className="text-sm text-charcoal-500 mt-1">
                            {notification.date}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-charcoal-500 text-center py-4">
                        No notifications to display
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-medium text-charcoal-800 mb-4">Upcoming Appointments</h3>
                  <div className="p-4 rounded-lg border border-charcoal-100 mb-4">
                    <div className="flex items-start">
                      <div className="bg-forest-100 text-forest-700 p-2 rounded-lg mr-4">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal-800">
                          Check-in with Dr. Lee
                        </h4>
                        <p className="text-charcoal-600 text-sm">
                          Virtual appointment - May 12, 2025 at 10:00 AM
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 border border-charcoal-200 rounded-lg text-charcoal-700 hover:bg-charcoal-50">
                    Schedule New Appointment
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-charcoal-800">
                    Notifications
                  </h2>
                  {notifications.some(n => !n.read) && (
                    <button 
                      className="text-sm text-midnight-600 hover:text-midnight-700"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-sm">
                  <div className="p-6 space-y-4">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-4 rounded-lg border ${
                            notification.read 
                              ? 'border-charcoal-100 bg-white' 
                              : 'border-midnight-100 bg-midnight-50'
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className={`${notification.read ? 'text-charcoal-700' : 'text-charcoal-800 font-medium'}`}>
                              {notification.message}
                            </p>
                            {!notification.read && (
                              <span className="bg-midnight-600 w-2 h-2 rounded-full flex-shrink-0 mt-2"></span>
                            )}
                          </div>
                          <p className="text-sm text-charcoal-500 mt-1">
                            {notification.date}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-charcoal-500 text-center py-8">
                        No notifications to display
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab !== 'overview' && activeTab !== 'notifications' && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <h3 className="text-xl font-medium text-charcoal-800 mb-4">
                  This section is coming soon
                </h3>
                <p className="text-charcoal-600 mb-6 max-w-md mx-auto">
                  We're working on enhancing your dashboard with more features. This section will be available soon.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setActiveTab('overview')}
                >
                  Return to Overview
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;