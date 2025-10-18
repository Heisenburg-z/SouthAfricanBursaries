import React, { useState, useEffect } from 'react';
import { 
  Users,
  Briefcase,
  Award,
  Mail,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Check,
  X,
  AlertCircle,
  Calendar,
  MapPin,
  Star,
  Download,
  FileText,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Target,
  DollarSign
} from 'lucide-react';

function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // State for different data types
  const [opportunities, setOpportunities] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOpportunities: 0,
    totalApplications: 0,
    totalSubscribers: 0,
    pendingApplications: 0,
    activeOpportunities: 0
  });
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      // In real implementation, make parallel API calls
      await Promise.all([
        fetchOpportunities(),
        fetchUsers(),
        fetchApplications(),
        fetchNewsletters(),
        fetchStats()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOpportunities = async () => {
    // Mock data - replace with actual API call
    const mockOpportunities = [
      {
        _id: '1',
        title: 'Software Development Bursary',
        category: 'bursary',
        provider: 'TechCorp',
        field: 'Computer Science',
        location: 'Johannesburg',
        applicationDeadline: '2025-12-31',
        applicationsCount: 45,
        rating: 4.5,
        isActive: true,
        views: 120,
        funding: { tuition: 'R50,000', accommodation: 'R30,000', allowance: 'R5,000' }
      },
      {
        _id: '2',
        title: 'Engineering Internship',
        category: 'internship',
        provider: 'EngineerCorp',
        field: 'Mechanical Engineering',
        location: 'Cape Town',
        applicationDeadline: '2025-11-30',
        applicationsCount: 32,
        rating: 4.2,
        isActive: true,
        views: 89
      }
    ];
    setOpportunities(mockOpportunities);
  };

  const fetchUsers = async () => {
    const mockUsers = [
      {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        education: { institution: 'University of Cape Town', fieldOfStudy: 'Computer Science', yearOfStudy: 3 },
        isAdmin: false,
        emailVerified: true,
        createdAt: '2025-01-15'
      },
      {
        _id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        education: { institution: 'Wits University', fieldOfStudy: 'Engineering', yearOfStudy: 2 },
        isAdmin: false,
        emailVerified: true,
        createdAt: '2025-02-10'
      }
    ];
    setUsers(mockUsers);
  };

  const fetchApplications = async () => {
    const mockApplications = [
      {
        _id: '1',
        applicant: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
        opportunity: { title: 'Software Development Bursary', provider: 'TechCorp' },
        status: 'Pending',
        applicationDate: '2025-08-20',
        documents: [{ name: 'CV.pdf' }, { name: 'Transcript.pdf' }]
      },
      {
        _id: '2',
        applicant: { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
        opportunity: { title: 'Engineering Internship', provider: 'EngineerCorp' },
        status: 'Under Review',
        applicationDate: '2025-08-18',
        documents: [{ name: 'Resume.pdf' }]
      }
    ];
    setApplications(mockApplications);
  };

  const fetchNewsletters = async () => {
    const mockNewsletters = [
      {
        _id: '1',
        email: 'subscriber1@example.com',
        isSubscribed: true,
        subscribedAt: '2025-08-15'
      },
      {
        _id: '2',
        email: 'subscriber2@example.com',
        isSubscribed: true,
        subscribedAt: '2025-08-10'
      }
    ];
    setNewsletters(mockNewsletters);
  };

  const fetchStats = async () => {
    setStats({
      totalUsers: 156,
      totalOpportunities: 23,
      totalApplications: 89,
      totalSubscribers: 1247,
      pendingApplications: 34,
      activeOpportunities: 19
    });
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'opportunities', name: 'Opportunities', icon: Award },
    { id: 'applications', name: 'Applications', icon: FileText },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'newsletter', name: 'Newsletter', icon: Mail },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      // Update application status
      setApplications(prev => prev.map(app => 
        app._id === applicationId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        switch (type) {
          case 'opportunity':
            setOpportunities(prev => prev.filter(opp => opp._id !== id));
            break;
          case 'user':
            setUsers(prev => prev.filter(user => user._id !== id));
            break;
          case 'application':
            setApplications(prev => prev.filter(app => app._id !== id));
            break;
          case 'newsletter':
            setNewsletters(prev => prev.filter(sub => sub._id !== id));
            break;
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600 mt-1">Manage opportunities, users, and applications</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <button 
                onClick={() => {
                  setModalType('add');
                  setShowModal(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add New</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Total Users</p>
                        <p className="text-3xl font-bold text-slate-900">{stats.totalUsers}</p>
                      </div>
                      <div className="bg-emerald-100 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Active Opportunities</p>
                        <p className="text-3xl font-bold text-slate-900">{stats.activeOpportunities}</p>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <Award className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Pending Applications</p>
                        <p className="text-3xl font-bold text-slate-900">{stats.pendingApplications}</p>
                      </div>
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Total Applications</p>
                        <p className="text-3xl font-bold text-slate-900">{stats.totalApplications}</p>
                      </div>
                      <div className="bg-slate-100 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-slate-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Newsletter Subscribers</p>
                        <p className="text-3xl font-bold text-slate-900">{stats.totalSubscribers}</p>
                      </div>
                      <div className="bg-emerald-100 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Success Rate</p>
                        <p className="text-3xl font-bold text-slate-900">73%</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                          <Users className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">New user registered</p>
                          <p className="text-xs text-slate-500">john.doe@example.com - 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <FileText className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">Application submitted</p>
                          <p className="text-xs text-slate-500">Software Development Bursary - 4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="bg-slate-100 p-2 rounded-lg">
                          <Award className="h-4 w-4 text-slate-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">New opportunity added</p>
                          <p className="text-xs text-slate-500">Engineering Internship Program - 6 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'opportunities' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-slate-900">Manage Opportunities</h2>
                      <button 
                        onClick={() => {
                          setModalType('add');
                          setShowModal(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Opportunity</span>
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Opportunity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Category
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Applications
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Deadline
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {opportunities.map((opportunity) => (
                          <tr key={opportunity._id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-slate-900">{opportunity.title}</div>
                                <div className="text-sm text-slate-500">{opportunity.provider}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                opportunity.category === 'bursary' ? 'bg-emerald-100 text-emerald-800' :
                                opportunity.category === 'internship' ? 'bg-slate-100 text-slate-800' :
                                opportunity.category === 'graduate' ? 'bg-amber-100 text-amber-800' :
                                'bg-orange-100 text-orange-800'
                              }`}>
                                {opportunity.category.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {opportunity.applicationsCount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {new Date(opportunity.applicationDeadline).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                opportunity.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {opportunity.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button className="text-emerald-600 hover:text-emerald-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedItem(opportunity);
                                  setModalType('edit');
                                  setShowModal(true);
                                }}
                                className="text-slate-600 hover:text-slate-900"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete('opportunity', opportunity._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">Application Management</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Applicant
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Opportunity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Applied Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {applications.map((application) => (
                          <tr key={application._id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-slate-900">
                                  {application.applicant.firstName} {application.applicant.lastName}
                                </div>
                                <div className="text-sm text-slate-500">{application.applicant.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-slate-900">{application.opportunity.title}</div>
                                <div className="text-sm text-slate-500">{application.opportunity.provider}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {new Date(application.applicationDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={application.status}
                                onChange={(e) => handleStatusUpdate(application._id, e.target.value)}
                                className="text-xs border border-slate-300 rounded px-2 py-1 focus:ring-2 focus:ring-emerald-500"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Under Review">Under Review</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Accepted">Accepted</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button className="text-emerald-600 hover:text-emerald-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-slate-600 hover:text-slate-900">
                                <Download className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete('application', application._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">User Management</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Education
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Joined Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {users.map((user) => (
                          <tr key={user._id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-slate-900">
                                  {user.firstName} {user.lastName}
                                </div>
                                <div className="text-sm text-slate-500">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-slate-900">{user.education?.institution}</div>
                                <div className="text-sm text-slate-500">
                                  {user.education?.fieldOfStudy} - Year {user.education?.yearOfStudy}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {user.emailVerified ? 'Verified' : 'Pending'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button className="text-emerald-600 hover:text-emerald-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  setSelectedItem(user);
                                  setModalType('edit');
                                  setShowModal(true);
                                }}
                                className="text-slate-600 hover:text-slate-900"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete('user', user._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'newsletter' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-slate-900">Newsletter Subscribers</h2>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export List</span>
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Email Address
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Subscribed Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-slate-200">
                        {newsletters.map((subscriber) => (
                          <tr key={subscriber._id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-slate-900">{subscriber.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                              {new Date(subscriber.subscribedAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                subscriber.isSubscribed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {subscriber.isSubscribed ? 'Active' : 'Unsubscribed'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <button className="text-slate-600 hover:text-slate-900">
                                <Mail className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete('newsletter', subscriber._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Newsletter Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Total Subscribers</p>
                        <p className="text-3xl font-bold text-slate-900">{newsletters.length}</p>
                      </div>
                      <div className="bg-emerald-100 p-3 rounded-lg">
                        <Users className="h-6 w-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Active Subscribers</p>
                        <p className="text-3xl font-bold text-slate-900">
                          {newsletters.filter(sub => sub.isSubscribed).length}
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Growth Rate</p>
                        <p className="text-3xl font-bold text-slate-900">+12%</p>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                  <div className="p-6 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900">System Settings</h2>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* General Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">General Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Site Name
                          </label>
                          <input
                            type="text"
                            defaultValue="Student Portal"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            defaultValue="admin@studentportal.com"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Application Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Application Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">Auto-approve applications</p>
                            <p className="text-sm text-slate-600">Automatically approve applications that meet criteria</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-900">Email notifications</p>
                            <p className="text-sm text-slate-600">Send email notifications for new applications</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Data Management */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Data Management</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                          <Download className="h-4 w-4" />
                          <span>Export Data</span>
                        </button>
                        <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>Generate Report</span>
                        </button>
                        <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                          <Settings className="h-4 w-4" />
                          <span>Backup System</span>
                        </button>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-6 border-t border-slate-200">
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal for Add/Edit Operations */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">
                  {modalType === 'add' ? 'Add New' : 'Edit'} {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(0, -1).slice(1)}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Modal content would be different based on the active tab and modal type */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter description..."
                  />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;