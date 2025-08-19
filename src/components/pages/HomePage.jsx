
import React, { useState } from 'react';
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
  Bell
} from 'lucide-react';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');

  const opportunities = [
    {
      id: 1,
      title: "MTN Foundation STEM Bursary",
      category: "bursary",
      field: "Engineering & IT",
      deadline: "2025-09-15",
      amount: "R150,000",
      location: "South Africa",
      rating: 4.8,
      applications: 1250,
      description: "Full bursary covering tuition, accommodation, and stipend for STEM students."
    },
    {
      id: 2,
      title: "Deloitte Graduate Programme",
      category: "graduate",
      field: "Finance & Consulting",
      deadline: "2025-08-30",
      amount: "R25,000/month",
      location: "Johannesburg",
      rating: 4.7,
      applications: 890,
      description: "18-month graduate development program with rotation opportunities."
    },
    {
      id: 3,
      title: "Standard Bank IT Internship",
      category: "internship",
      field: "Information Technology",
      deadline: "2025-09-01",
      amount: "R8,000/month",
      location: "Cape Town",
      rating: 4.6,
      applications: 567,
      description: "6-month internship in software development and data analytics."
    },
    {
      id: 4,
      title: "Sasol Engineering Learnership",
      category: "learnership",
      field: "Chemical Engineering",
      deadline: "2025-10-01",
      amount: "R12,000/month",
      location: "Secunda",
      rating: 4.9,
      applications: 345,
      description: "24-month learnership with guaranteed employment upon completion."
    }
  ];

  const stats = [
    { label: "Active Opportunities", value: "2,847", icon: TrendingUp, color: "text-green-600" },
    { label: "Students Placed", value: "15,234", icon: Users, color: "text-blue-600" },
    { label: "Partner Companies", value: "456", icon: Briefcase, color: "text-purple-600" },
    { label: "Success Rate", value: "89%", icon: Star, color: "text-yellow-600" }
  ];

  const categories = [
    { id: 'all', name: 'All Opportunities', icon: Search },
    { id: 'bursary', name: 'Bursaries', icon: Award },
    { id: 'internship', name: 'Internships', icon: Briefcase },
    { id: 'graduate', name: 'Graduate Programs', icon: GraduationCap },
    { id: 'learnership', name: 'Learnerships', icon: TrendingUp }
  ];

  const filteredOpportunities = selectedCategory === 'all' 
    ? opportunities 
    : opportunities.filter(opp => opp.category === selectedCategory);

  const handleNewsletterSignup = () => {
    if (email.trim()) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail('');
    } else {
      alert('Please enter a valid email address');
    }
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom duration-1000">
              Unlock Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Future Today
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
              Discover bursaries, internships, and graduate programs all in one place. 
              Your dream opportunity is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Opportunities
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-300/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Opportunity
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse by category to discover opportunities tailored to your career goals
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Opportunities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      opportunity.category === 'bursary' ? 'bg-green-100 text-green-700' :
                      opportunity.category === 'internship' ? 'bg-blue-100 text-blue-700' :
                      opportunity.category === 'graduate' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {opportunity.category.toUpperCase()}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{opportunity.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{opportunity.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-green-500" />
                      <span className="font-semibold">{opportunity.amount}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                      <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-orange-500" />
                      <span>{opportunity.applications} applications</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                    <span>Apply Now</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105">
              Load More Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <Mail className="h-12 w-12 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-blue-100 mb-8">
              Get weekly updates on new opportunities, application deadlines, and career tips
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <button
                  onClick={handleNewsletterSignup}
                  className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Subscribe
                </button>
              </div>
            </div>
            
            <p className="text-sm text-blue-200 mt-4">
              Join 50,000+ students already receiving our weekly newsletter
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Student Portal?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make finding and applying for opportunities simple, fast, and effective
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Search</h3>
              <p className="text-gray-600">
                Advanced filtering by field of study, location, deadline, and funding amount to find exactly what you need.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Bell className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Updates</h3>
              <p className="text-gray-600">
                Get instant notifications about new opportunities, deadline reminders, and application status updates.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Opportunities</h3>
              <p className="text-gray-600">
                All opportunities are verified and updated regularly to ensure legitimacy and current information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default HomePage;