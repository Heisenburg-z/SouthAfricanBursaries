import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Briefcase, FileText, Mail, Settings, BarChart3 } from 'lucide-react';
import axios from 'axios';

// Import tab components
import DashboardTab from './tabs/DashboardTab';
import OpportunitiesTab from './tabs/OpportunitiesTab';
import ApplicationsTab from './tabs/ApplicationsTab';
import UsersTab from './tabs/UsersTab';
import NewsletterTab from './tabs/NewsletterTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import SettingsTab from './tabs/SettingsTab';

// Import modals
import OpportunityModal from './modals/OpportunityModal';
import ApplicationDetailModal from './modals/ApplicationDetailModal';
import UserDetailModal from './modals/UserDetailModal';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL?.endsWith('/api') 
  ? import.meta.env.VITE_BACKEND_URL 
  : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api`;


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentItem, setCurrentItem] = useState(null);

  const getAuthToken = () => localStorage.getItem('token');
  const axiosConfig = { headers: { Authorization: `Bearer ${getAuthToken()}` } };

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const statsRes = await axios.get(`${API_BASE_URL}/admin/stats`, axiosConfig);
      setStats(statsRes.data);
      setRecentActivity(statsRes.data.recentActivity || []);

      if (activeTab === 'opportunities') {
        const oppRes = await axios.get(`${API_BASE_URL}/opportunities?limit=100`, axiosConfig);
        setOpportunities(oppRes.data.opportunities || []);
      } else if (activeTab === 'applications') {
        const appRes = await axios.get(`${API_BASE_URL}/applications?limit=100`, axiosConfig);
        setApplications(appRes.data.applications || []);
      } else if (activeTab === 'users') {
        const userRes = await axios.get(`${API_BASE_URL}/users?limit=100`, axiosConfig);
        setUsers(userRes.data.users || []);
      } else if (activeTab === 'newsletter') {
        const newsletterRes = await axios.get(`${API_BASE_URL}/newsletter/subscribers`, axiosConfig);
        setNewsletters(newsletterRes.data || []);
      } else if (activeTab === 'analytics') {
        const analyticsRes = await axios.get(`${API_BASE_URL}/admin/analytics?period=30d`, axiosConfig);
        setAnalytics(analyticsRes.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setLoading(false);
  };

  const handleOpportunitySubmit = async (opportunityData) => {
    try {
      if (currentItem) {
        await axios.put(`${API_BASE_URL}/opportunities/${currentItem._id}`, opportunityData, axiosConfig);
      } else {
        await axios.post(`${API_BASE_URL}/opportunities`, opportunityData, axiosConfig);
      }
      fetchDashboardData();
      setShowModal(false);
      setCurrentItem(null);
    } catch (error) {
      console.error('Error saving opportunity:', error);
      alert('Failed to save opportunity');
    }
  };

  const handleDeleteOpportunity = async (id) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/opportunities/${id}`, axiosConfig);
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting opportunity:', error);
    }
  };

  const handleUpdateApplicationStatus = async (id, status) => {
    try {
      await axios.put(`${API_BASE_URL}/applications/${id}/status`, { status }, axiosConfig);
      fetchDashboardData();
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleBulkOperation = async (action) => {
    if (selectedItems.length === 0) {
      alert('Please select items first');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/admin/opportunities/bulk`, {
        opportunityIds: selectedItems,
        action
      }, axiosConfig);
      setSelectedItems([]);
      fetchDashboardData();
    } catch (error) {
      console.error('Error performing bulk operation:', error);
    }
  };

  const handleExport = async (type) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/export/${type}`, {
        ...axiosConfig,
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${type}_export_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setCurrentItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setCurrentItem(null);
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'opportunities', label: 'Opportunities', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your student opportunities portal</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm mb-8 overflow-x-auto">
          <div className="flex border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === 'dashboard' && stats && (
          <DashboardTab stats={stats} recentActivity={recentActivity} />
        )}

        {activeTab === 'opportunities' && (
          <OpportunitiesTab
            opportunities={opportunities}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleBulkOperation={handleBulkOperation}
            handleExport={handleExport}
            openModal={openModal}
            handleDeleteOpportunity={handleDeleteOpportunity}
          />
        )}

        {activeTab === 'applications' && (
          <ApplicationsTab
            applications={applications}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleExport={handleExport}
            handleUpdateApplicationStatus={handleUpdateApplicationStatus}
            openModal={openModal}
            onApplyClick={handleApplyClick}
          />
        )}

        {activeTab === 'users' && (
          <UsersTab
            users={users}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleExport={handleExport}
            openModal={openModal}
          />
        )}

        {activeTab === 'newsletter' && (
          <NewsletterTab
            newsletters={newsletters}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleExport={handleExport}
            isAdmin={user && user.isAdmin}
          />
        )}

        {activeTab === 'analytics' && analytics && (
          <AnalyticsTab analytics={analytics} />
        )}

        {activeTab === 'settings' && <SettingsTab />}
      </div>

      {showModal && modalType === 'opportunity' && (
        <OpportunityModal
          opportunity={currentItem}
          onClose={closeModal}
          onSubmit={handleOpportunitySubmit}
        />
      )}

      {showModal && modalType === 'application' && currentItem && (
        <ApplicationDetailModal
          application={currentItem}
          onClose={closeModal}
        />
      )}

      {showModal && modalType === 'user' && currentItem && (
        <UserDetailModal
          user={currentItem}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
