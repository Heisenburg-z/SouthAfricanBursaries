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

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = async () => {
      try {
        // In a real app, you would fetch this from your API
        const user = {
          firstName: "Thabo",
          lastName: "Mbeki",
          email: "thabo.mbeki@example.com",
          education: {
            institution: "University of Cape Town",
            qualification: "BSc Computer Science",
            yearOfStudy: 3,
            graduationYear: 2024,
            averageMarks: 78
          },
          profileCompletion: 85
        };
        
        setUserData(user);
        
        // Simulate fetching applications
        const apps = [
          {
            _id: "1",
            opportunity: {
              title: "MTN Software Engineering Internship",
              category: "internship",
              provider: "MTN Group",
              applicationDeadline: "2023-12-15"
            },
            status: "Under Review",
            applicationDate: "2023-11-10"
          },
          {
            _id: "2",
            opportunity: {
              title: "NSFAS Bursary 2024",
              category: "bursary",
              provider: "NSFAS",
              applicationDeadline: "2023-11-30"
            },
            status: "Pending",
            applicationDate: "2023-11-05"
          },
          {
            _id: "3",
            opportunity: {
              title: "Standard Bank Graduate Program",
              category: "graduate",
              provider: "Standard Bank",
              applicationDeadline: "2023-12-01"
            },
            status: "Shortlisted",
            applicationDate: "2023-10-20"
          }
        ];
        
        setApplications(apps);
        
        // Simulate upcoming deadlines
        const deadlines = [
          {
            _id: "1",
            title: "MTN Software Engineering Internship",
            deadline: "2023-12-15",
            daysLeft: 5
          },
          {
            _id: "2",
            title: "Telkom Data Science Learnership",
            deadline: "2023-12-20",
            daysLeft: 10
          },
          {
            _id: "3",
            title: "Amazon Web Services Academy",
            deadline: "2023-12-25",
            daysLeft: 15
          }
        ];
        
        setUpcomingDeadlines(deadlines);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
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
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
              <button className="relative p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 rounded-full p-2">
                <User className="h-6 w-6 text-slate-600" />
              </button>
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
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-emerald-600" />
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
                  <span className="text-sm font-semibold text-emerald-600">{userData?.profileCompletion}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full" 
                    style={{ width: `${userData?.profileCompletion}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <GraduationCap className="h-4 w-4 mr-2 text-slate-500" />
                  <span>{userData?.education?.institution}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <BookOpen className="h-4 w-4 mr-2 text-slate-500" />
                  <span>{userData?.education?.qualification}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <TrendingUp className="h-4 w-4 mr-2 text-slate-500" />
                  <span>Year {userData?.education?.yearOfStudy} • Avg: {userData?.education?.averageMarks}%</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center">
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
                      <p className="text-2xl font-bold text-slate-900">12</p>
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
                      <p className="text-2xl font-bold text-slate-900">2</p>
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
                      <p className="text-2xl font-bold text-slate-900">7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Applications & Deadlines */}
          <div className="lg:col-span-2 space-y-6">
            {/* Applications Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Recent Applications</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {applications.map((application) => {
                  const CategoryIcon = getCategoryIcon(application.opportunity.category);
                  return (
                    <div key={application._id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-300">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          application.opportunity.category === 'bursary' ? 'bg-emerald-100 text-emerald-800' :
                          application.opportunity.category === 'internship' ? 'bg-slate-100 text-slate-800' :
                          application.opportunity.category === 'graduate' ? 'bg-amber-100 text-amber-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          <CategoryIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{application.opportunity.title}</h3>
                          <p className="text-sm text-slate-600">{application.opportunity.provider}</p>
                          <p className="text-xs text-slate-500">Applied on {formatDate(application.applicationDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                        <button className="text-slate-400 hover:text-slate-600">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Upcoming Deadlines</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                  View Calendar
                </button>
              </div>

              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline._id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-300">
                    <div>
                      <h3 className="font-medium text-slate-900">{deadline.title}</h3>
                      <p className="text-sm text-slate-600">Due on {formatDate(deadline.deadline)}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        deadline.daysLeft <= 7 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {deadline.daysLeft} days left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Opportunities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-slate-900">Recommended for You</h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                  Browse More
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
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

                <div className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
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
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;