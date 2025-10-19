import React, { useState, useEffect } from 'react';
import {
  User,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  PieChart,
  Search,
  Settings,
  TrendingUp,
  XCircle,
  Award,
  Briefcase,
  ExternalLink
} from 'lucide-react';
import ProfileUpdate from './components/ProfileUpdate.jsx';
import ApplicationsTab from './components/ApplicationsTab';

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found. Please log in again.');
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        // Fetch user data with profile completion
        const userResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/complete`, {
          headers
        });

        if (!userResponse.ok) {
          if (userResponse.status === 401) {
            localStorage.removeItem('token');
            throw new Error('Session expired. Please log in again.');
          }
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUserData(userData);

        // Fetch applications
        const applicationsResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/my-applications`, {
          headers
        });

        if (applicationsResponse.ok) {
          const applicationsData = await applicationsResponse.json();
          setApplications(applicationsData.applications || []);
        } else if (applicationsResponse.status !== 404) {
          console.error('Failed to fetch applications');
        }

        // Fetch upcoming deadlines
        const deadlinesResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/opportunities/upcoming-deadlines`, {
          headers
        });

        if (deadlinesResponse.ok) {
          const deadlinesData = await deadlinesResponse.json();
          setUpcomingDeadlines(deadlinesData.opportunities || []);
        } else if (deadlinesResponse.status !== 404) {
          console.error('Failed to fetch upcoming deadlines');
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'bg-emerald-100 text-emerald-800';
      case 'Shortlisted': return 'bg-amber-100 text-amber-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'bursary': return Award;
      case 'internship': return Briefcase;
      case 'graduate': return GraduationCap;
      case 'learnership': return TrendingUp;
      default: return FileText;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateDaysLeft = (deadline) => {
    if (!deadline) return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate application stats from real data
  const applicationStats = {
    total: applications.length,
    accepted: applications.filter(app => app.status === 'Accepted').length,
    pending: applications.filter(app => app.status === 'Pending').length,
    shortlisted: applications.filter(app => app.status === 'Shortlisted').length,
    underReview: applications.filter(app => app.status === 'Under Review').length,
    rejected: applications.filter(app => app.status === 'Rejected').length,
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="lg:col-span-2 space-y-6">
            {/* Applications Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Recent Applications</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {applications.length > 0 ? (
                  applications.slice(0, 5).map((application) => {
                    const CategoryIcon = getCategoryIcon(application.opportunity?.category);
                    return (
                      <div key={application._id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-300">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${
                            application.opportunity?.category === 'bursary' ? 'bg-emerald-100 text-emerald-800' :
                            application.opportunity?.category === 'internship' ? 'bg-slate-100 text-slate-800' :
                            application.opportunity?.category === 'graduate' ? 'bg-amber-100 text-amber-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            <CategoryIcon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-slate-900 truncate">{application.opportunity?.title || 'Unknown Opportunity'}</h3>
                            <p className="text-sm text-slate-600 truncate">{application.opportunity?.provider || 'Unknown Provider'}</p>
                            <p className="text-xs text-slate-500">Applied on {formatDate(application.applicationDate)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                          <button className="text-slate-400 hover:text-slate-600 transition-colors">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 mb-2">No applications yet</p>
                    <p className="text-sm text-slate-400 mb-4">Start applying to opportunities to see them here</p>
                    <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                      Browse Opportunities
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Upcoming Deadlines</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                  View Calendar
                </button>
              </div>

              <div className="space-y-4">
                {upcomingDeadlines.length > 0 ? (
                  upcomingDeadlines.slice(0, 5).map((opportunity) => {
                    const daysLeft = calculateDaysLeft(opportunity.applicationDeadline);
                    return (
                      <div key={opportunity._id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-300">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-slate-900 truncate">{opportunity.title}</h3>
                          <p className="text-sm text-slate-600">Due on {formatDate(opportunity.applicationDeadline)}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            daysLeft <= 7 
                              ? 'bg-red-100 text-red-800' 
                              : daysLeft <= 14
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 mb-2">No upcoming deadlines</p>
                    <p className="text-sm text-slate-400">Check back later for new opportunities</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recommended Opportunities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Recommended for You</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                  Browse More
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* These could be fetched from your API in the future */}
                <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full`}>
                      BURSARY
                    </div>
                    <Award className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">Sasol Bursary Programme 2024</h3>
                  <p className="text-sm text-slate-600 mb-3">For Engineering and Science students</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Closes in 12 days</span>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`px-2 py-1 bg-slate-100 text-slate-800 text-xs font-medium rounded-full`}>
                      INTERNSHIP
                    </div>
                    <Briefcase className="h-5 w-5 text-slate-600" />
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2">Google Software Engineering Intern</h3>
                  <p className="text-sm text-slate-600 mb-3">For final year Computer Science students</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Closes in 21 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'applications':
        return <ApplicationsTab />;

      case 'profile':
        return (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Full Name</label>
                      <p className="text-slate-900">{userData?.firstName} {userData?.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Email</label>
                      <p className="text-slate-900">{userData?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Phone</label>
                      <p className="text-slate-900">{userData?.phoneNumber || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-slate-800 mb-4">Education Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Institution</label>
                      <p className="text-slate-900">{userData?.education?.institution || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Qualification</label>
                      <p className="text-slate-900">{userData?.education?.qualification || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Year of Study</label>
                      <p className="text-slate-900">{userData?.education?.yearOfStudy || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowProfileUpdate(true)}
                className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-300"
              >
                Edit Profile
              </button>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">My Documents</h2>
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-2">No documents uploaded yet</h3>
                <p className="text-slate-500 mb-6">Upload your CV, transcripts, and other important documents to complete your profile.</p>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-300">
                  Upload Documents
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center max-w-md mx-auto p-6">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleRetry}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Try Again
            </button>
            <button 
              onClick={handleLogout}
              className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Student Dashboard</h1>
              <p className="text-slate-600">Welcome back, {userData?.firstName}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors">
                {userData?.profilePhoto?.downloadURL ? (
                  <img 
                    src={userData.profilePhoto.downloadURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-slate-600" />
                )}
                <span className="text-sm font-medium text-slate-700 pr-2">
                  {userData?.firstName} {userData?.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'applications', 'profile', 'documents'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors duration-300 ${
                    activeTab === tab
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center overflow-hidden">
                  {userData?.profilePhoto?.downloadURL ? (
                    <img 
                      src={userData.profilePhoto.downloadURL} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-8 w-8 text-emerald-600" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {userData?.firstName} {userData?.lastName}
                  </h2>
                  <p className="text-slate-600 text-sm">{userData?.email}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">Profile Completion</span>
                  <span className="text-sm font-semibold text-emerald-600">{userData?.profileCompletion || 0}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${userData?.profileCompletion || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <GraduationCap className="h-4 w-4 mr-2 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{userData?.education?.institution || 'Not specified'}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <BookOpen className="h-4 w-4 mr-2 text-slate-500 flex-shrink-0" />
                  <span className="truncate">{userData?.education?.qualification || 'Not specified'}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <TrendingUp className="h-4 w-4 mr-2 text-slate-500 flex-shrink-0" />
                  <span className="truncate">
                    {userData?.education?.yearOfStudy ? `Year ${userData.education.yearOfStudy}` : 'Year not specified'}
                    {userData?.education?.averageMarks && ` • Avg: ${userData.education.averageMarks}%`}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setShowProfileUpdate(true)}
                className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Application Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Total Applications</p>
                      <p className="text-2xl font-bold text-slate-900">{applicationStats.total}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Accepted</p>
                      <p className="text-2xl font-bold text-slate-900">{applicationStats.accepted}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-amber-100 rounded-lg mr-3">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Pending</p>
                      <p className="text-2xl font-bold text-slate-900">{applicationStats.pending}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Shortlisted</p>
                      <p className="text-2xl font-bold text-slate-900">{applicationStats.shortlisted}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Dynamic based on active tab */}
          {renderTabContent()}
        </div>
      </div>

      {/* Profile Update Modal */}
      {showProfileUpdate && (
        <ProfileUpdate
          userData={userData}
          onProfileUpdate={(updatedUser) => {
            setUserData(updatedUser);
            setShowProfileUpdate(false);
          }}
          onClose={() => setShowProfileUpdate(false)}
        />
      )}
    </div>
  );
}

export default StudentDashboard;