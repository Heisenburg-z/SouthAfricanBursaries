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

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [opportunities, setOpportunities] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all', name: 'All Opportunities', icon: Search },
    { id: 'bursary', name: 'Bursaries', icon: Award },
    { id: 'internship', name: 'Internships', icon: Briefcase },
    { id: 'graduate', name: 'Graduate Programs', icon: GraduationCap },
    { id: 'learnership', name: 'Learnerships', icon: TrendingUp }
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

  // const fetchStats = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stats`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch stats');
  //     }
  //     const data = await response.json();
  //     setStats(data);
  //   } catch (err) {
  //     console.error('Error fetching stats:', err);
  //     // Set default stats if API fails
  //     setStats([
  //       { label: "Active Opportunities", value: "2,847", icon: TrendingUp, color: "text-emerald-600" },
  //       { label: "Students Placed", value: "15,234", icon: Users, color: "text-slate-600" },
  //       { label: "Partner Companies", value: "456", icon: Briefcase, color: "text-amber-600" },
  //       { label: "Success Rate", value: "89%", icon: Star, color: "text-orange-600" }
  //     ]);
  //   }
  // };

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
          </div>
        </div>
        
        {/* Professional accent elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/10 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-slate-600/20 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-emerald-400/30 rounded-full"></div>
      </section>

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
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg">
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
    </main>
  );
}

export default HomePage;