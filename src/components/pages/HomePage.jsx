import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Search, 
  Filter, 
  MapPin, 
  Calendar,
  TrendingUp,
  Users,
  Star,
  ExternalLink,
  Mail,
  Bell,
  DollarSign,
  Home,
  Percent
} from 'lucide-react';
import SuccessNotification from './components/SuccessNotification.jsx';
import ApplyModal from './components/ApplyModal.jsx';
function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
const [showApplyModal, setShowApplyModal] = useState(false);
const [user, setUser] = useState(null);
const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    { id: 'all', name: 'All Opportunities', icon: Search },
    { id: 'bursary', name: 'Bursaries', icon: Award },
    { id: 'internship', name: 'Internships', icon: Briefcase },
    { id: 'graduate', name: 'Graduate Programs', icon: GraduationCap },
    { id: 'learnership', name: 'Learnerships', icon: TrendingUp }
  ];

  // ✅ Revised with USAf-hosted logos (public directory)
  const universityLogos = [
    {
      name: "University of the Witwatersrand",
      url: "https://usaf.ac.za/wp-content/uploads/2023/08/University_of_Witwatersrand_logo.webp",
      height: "h-9"
    },
    {
      name: "University of the Free State",
      url: "https://usaf.ac.za/wp-content/uploads/2023/08/University_of_the_Free_State-logo.webp",
      height: "h-8"
    },
    {
      name: "University of Cape Town",
      url: "https://usaf.ac.za/wp-content/uploads/2023/08/University_of_Cape_Town-logo.webp",
      height: "h-9"
    },
    {
      name: "University of Pretoria",
      url: "https://usaf.ac.za/wp-content/uploads/2023/08/University_of_Pretoria-logo.webp",
      height: "h-8"
    },
    {
      name: "University of Johannesburg",
      url: "https://usaf.ac.za/wp-content/uploads/2023/08/University_of_Johannesburg-logo.webp",
      height: "h-8"
    },
    {
      name: "University of Stellenbosch",
      url: "https://usaf.ac.za/wp-content/uploads/2023/08/University_of_Stellenbosch-logo.webp",
      height: "h-8"
    },
    // Duplicate the array to create seamless loop
    {
      name: "University of the Witwatersrand",
      url: "https://usaf.ac.za/wp-content/uploads/2023/08/University_of_Witwatersrand_logo.webp",
      height: "h-9"
    },
    {
      name: "University of the Free State",
      url: "https://usaf.ac.za/wp-content/uploads/2023/08/University_of_the_Free_State-logo.webp",
      height: "h-8"
    },
    {
      name: "University of KwaZulu-Natal",
      url: "https://usaf.ac.za/wp-content/uploads/2023/08/University_of_KwaZulu_Natal-logo.webp",
      height: "h-8"
    }
  ];

  useEffect(() => {
    fetchOpportunities();
    fetchStats();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/opportunities`);

      if (!response.ok) {
        throw new Error('Failed to fetch opportunities');
      }
      
      const data = await response.json();
      
      // Handle different possible data structures from your API
      let opportunitiesArray = [];
      
      if (Array.isArray(data)) {
        // API returns array directly: [...]
        opportunitiesArray = data;
      } else if (data && Array.isArray(data.opportunities)) {
        // API returns object with opportunities property: { opportunities: [...] }
        opportunitiesArray = data.opportunities;
      } else if (data && Array.isArray(data.data)) {
        // API returns object with data property: { data: [...] }
        opportunitiesArray = data.data;
      } else if (data && typeof data === 'object') {
        // API returns single object, wrap in array
        opportunitiesArray = [data];
      } else {
        console.warn('Unexpected data structure from API:', data);
        opportunitiesArray = [];
      }
      
      setOpportunities(opportunitiesArray);
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching opportunities:', err);
      setOpportunities([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  checkAuth();
}, []);

const checkAuth = () => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  if (token && userData) {
    setUser(JSON.parse(userData));
  }
};

// Add this function to handle application submission
const handleApply = async (applicationData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Please log in to apply for opportunities');
      // Redirect to login page or show login modal
      return;
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(applicationData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit application');
    }

    const result = await response.json();
    
    // Show success message
    alert('Application submitted successfully! You can track your application in your dashboard.');
    
    
    // Refresh opportunities to update application counts
    fetchOpportunities();
    
    return result;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

// Add this function to open apply modal
const openApplyModal = (opportunity) => {
  // Check if user is logged in
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  
  if (!token || !userData) {
    alert('Please log in to apply for opportunities');
    // Redirect to login page
    window.location.href = '/login';
    return;
  }

  // Check if application deadline has passed
  if (new Date(opportunity.applicationDeadline) < new Date()) {
    alert('Sorry, the application deadline for this opportunity has passed.');
    return;
  }

  // Store the opportunity in localStorage or sessionStorage to pass to dashboard
  sessionStorage.setItem('selectedOpportunity', JSON.stringify(opportunity));
  
  // Redirect to dashboard applications tab
  window.location.href = '/dashboard#applications';
};

  const fetchStats = async () => {
    // Hardcoded data for now
    setStats([
      { label: "Active Opportunities", value: "2,847", icon: TrendingUp, color: "text-emerald-600" },
      { label: "Students Placed", value: "15,234", icon: Users, color: "text-slate-600" },
      { label: "Partner Companies", value: "456", icon: Briefcase, color: "text-amber-600" },
      { label: "Success Rate", value: "89%", icon: Star, color: "text-orange-600" }
    ]);
  };

  const filteredOpportunities = Array.isArray(opportunities) 
    ? (selectedCategory === 'all' 
        ? opportunities 
        : opportunities.filter(opp => opp.category === selectedCategory))
    : [];

  const handleNewsletterSignup = async () => {
    if (email.trim()) {
      try {
        
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/newsletter/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        
        if (response.ok) {
          alert(`Thank you for subscribing with email: ${email}`);
          setEmail('');
        } else {
          throw new Error('Subscription failed');
        }
      } catch (err) {
        alert('Subscription failed. Please try again later.');
        console.error('Error subscribing to newsletter:', err);
      }
    } else {
      alert('Please enter a valid email address');
    }
  };

  const formatFunding = (funding) => {
    const parts = [];
    if (funding.tuition) parts.push(`Tuition: ${funding.tuition}`);
    if (funding.accommodation) parts.push(`Accommodation: ${funding.accommodation}`);
    if (funding.allowance) parts.push(`Allowance: ${funding.allowance}`);
    return parts;
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
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading opportunities...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error loading opportunities</div>
          <p className="text-slate-600 mb-4">{error}</p>
          <button 
            onClick={fetchOpportunities}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
              Unlock Your
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Professional Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              Discover verified bursaries, internships, and graduate programs from leading companies. 
              Your career starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                Browse Opportunities
              </button>
              <button className="border-2 border-slate-400 text-slate-300 hover:bg-slate-200 hover:text-slate-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>

            {/* University Logos Section - UPDATED with horizontal scrolling */}
            <div className="mt-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-600">
              <p className="text-slate-300 mb-8 text-lg font-medium">Trusted by leading South African universities</p>
              
              <div className="relative overflow-hidden py-4">
                {/* Gradient overlays for smooth edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
                
                {/* Scrolling container */}
                <div className="flex space-x-8 md:space-x-12 lg:space-x-16 animate-scroll">
                  {universityLogos.map((uni, index) => (
                    <div 
                      key={`${uni.name}-${index}`}
                      className="flex-shrink-0 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 min-w-[140px] md:min-w-[160px]"
                    >
                      <img 
                        src={uni.url}
                        alt={uni.name}
                        className={`${uni.height} w-auto max-w-[120px] md:max-w-[140px] opacity-90 hover:opacity-100 transition-opacity duration-300 object-contain`}
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallbackElement = e.target.parentNode.querySelector('.university-fallback');
                          if (fallbackElement) {
                            fallbackElement.style.display = 'block';
                          }
                        }}
                      />
                      <div 
                        className="hidden text-xs font-medium text-white text-center max-w-[80px] university-fallback"
                        style={{display: 'none'}}
                      >
                        {uni.name.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Professional accent elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-slate-600/20 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-emerald-400/30 rounded-full"></div>
      </section>

      {/* Rest of your existing code remains exactly the same */}
      {/* Stats Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 border border-slate-200">
                  <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Find Your Perfect Opportunity
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Browse verified opportunities from leading South African companies and institutions
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Opportunities Grid */}
          {filteredOpportunities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No opportunities found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredOpportunities.map((opportunity) => (
                <div key={opportunity._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden">
                  <div className="p-6">
                    {/* Header with category and rating */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        opportunity.category === 'bursary' ? 'bg-emerald-100 text-emerald-800' :
                        opportunity.category === 'internship' ? 'bg-slate-100 text-slate-800' :
                        opportunity.category === 'graduate' ? 'bg-amber-100 text-amber-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {opportunity.category.toUpperCase()}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-amber-500 fill-current" />
                        <span className="text-sm text-slate-600 font-medium">{opportunity.rating}</span>
                      </div>
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{opportunity.title}</h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{opportunity.description}</p>

                    {/* Field */}
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center text-sm text-slate-700 font-medium">
                        <GraduationCap className="h-4 w-4 mr-2 text-emerald-600" />
                        <span>{opportunity.field}</span>
                      </div>
                    </div>

                    {/* Funding Information */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center">
                        <DollarSign className="h-4 w-4 mr-1 text-emerald-600" />
                        Funding Details:
                      </h4>
                      <div className="space-y-1">
                        {formatFunding(opportunity.funding).map((funding, index) => (
                          <div key={index} className="text-sm text-slate-600 bg-emerald-50 px-3 py-1 rounded border-l-4 border-emerald-400">
                            {funding}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="flex items-center text-slate-600">
                        <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                        <span>{opportunity.location}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Percent className="h-4 w-4 mr-2 text-slate-500" />
                        <span>Min: {opportunity.eligibility?.minimumAverage || "N/A"}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                        <span>{formatDate(opportunity.applicationDeadline)}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Users className="h-4 w-4 mr-2 text-slate-500" />
                        <span>{opportunity.applicationsCount || 0} applicants</span>
                      </div>
                    </div>

                    {/* Apply Button */}
                    <button 
                      onClick={() => openApplyModal(opportunity)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-300 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Load More Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600">
            <Mail className="h-12 w-12 mx-auto mb-6 text-emerald-400" />
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-lg text-slate-300 mb-8">
              Receive weekly updates on new opportunities, application deadlines, and career insights
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-600/30"
                />
                <button
                  onClick={handleNewsletterSignup}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg"
                >
                  Subscribe
                </button>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 mt-4">
              Join 50,000+ students receiving our weekly newsletter
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Student Portal?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Professional tools and verified opportunities to accelerate your career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white border-2 border-slate-200 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:border-emerald-400 transition-all duration-300">
                <Search className="h-10 w-10 text-slate-700 group-hover:text-emerald-600 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Advanced Search</h3>
              <p className="text-slate-600">
                Filter by field of study, location, funding amount, and minimum academic requirements to find the perfect match.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white border-2 border-slate-200 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:border-emerald-400 transition-all duration-300">
                <Bell className="h-10 w-10 text-slate-700 group-hover:text-emerald-600 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Smart Notifications</h3>
              <p className="text-slate-600">
                Receive timely alerts about new opportunities, approaching deadlines, and application status updates.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white border-2 border-slate-200 w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:border-emerald-400 transition-all duration-300">
                <Award className="h-10 w-10 text-slate-700 group-hover:text-emerald-600 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Verified Partners</h3>
              <p className="text-slate-600">
                All opportunities are verified with legitimate companies and institutions, ensuring quality and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>
{showApplyModal && selectedOpportunity && (
  <ApplyModal
    opportunity={selectedOpportunity}
    isOpen={showApplyModal}
    onClose={() => {
      setShowApplyModal(false);
      setSelectedOpportunity(null);
    }}
    onSubmit={handleApply}
  />
)}
      {/* Add CSS for the scrolling animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-140px * 6));
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </main>
  );
}

export default HomePage;