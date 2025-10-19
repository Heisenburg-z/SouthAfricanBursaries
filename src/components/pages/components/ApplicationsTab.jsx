import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Download, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  X,
  Award,
  Briefcase,
  TrendingUp,
  ExternalLink,
  Plus,
  Search,
  Filter
} from 'lucide-react';

function ApplicationsTab() {
  const [applications, setApplications] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [activeView, setActiveView] = useState('view');
  const [formData, setFormData] = useState({
    answers: [],
    documents: []
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApplications();
    fetchOpportunities();
    checkForPendingApplication();
  }, []);

  const checkForPendingApplication = () => {
    const opportunityData = sessionStorage.getItem('applyOpportunity');
    if (opportunityData) {
      try {
        const opportunity = JSON.parse(opportunityData);
        startApplication(opportunity);
        sessionStorage.removeItem('applyOpportunity');
      } catch (error) {
        console.error('Error parsing opportunity data:', error);
      }
    }
  };

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications/my-applications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOpportunities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/opportunities`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOpportunities(data.opportunities || []);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const startApplication = (opportunity) => {
    const alreadyApplied = applications.find(app => 
      app.opportunity?._id === opportunity._id
    );
    
    if (alreadyApplied) {
      alert('You have already applied for this opportunity.');
      return;
    }

    if (new Date(opportunity.applicationDeadline) < new Date()) {
      alert('Sorry, the application deadline for this opportunity has passed.');
      return;
    }

    setSelectedOpportunity(opportunity);
    
    const initialAnswers = opportunity.questions ? opportunity.questions.map(q => ({
      question: q,
      answer: ''
    })) : [];
    
    setFormData({
      answers: initialAnswers,
      documents: []
    });
    setErrors({});
    setShowApplyForm(true);
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...formData.answers];
    newAnswers[index].answer = value;
    setFormData({ ...formData, answers: newAnswers });
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;

    setUploading(true);
    setErrors({ ...errors, documents: null });

    try {
      for (const file of files) {
        const uploadFormData = new FormData();
        uploadFormData.append('document', file);
        uploadFormData.append('opportunityId', selectedOpportunity._id);

        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/uploads/documents`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: uploadFormData
        });

        if (response.ok) {
          const fileInfo = await response.json();
          setFormData(prev => ({
            ...prev,
            documents: [...prev.documents, {
              name: fileInfo.filename || file.name,
              firebaseName: fileInfo.firebaseName,
              downloadURL: fileInfo.downloadURL,
              uploadedAt: new Date()
            }]
          }));
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'File upload failed');
        }
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setErrors({ ...errors, documents: error.message || 'Failed to upload files. Please try again.' });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const removeDocument = (index) => {
    const newDocuments = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: newDocuments });
  };

  const validateForm = () => {
    const newErrors = {};

    formData.answers.forEach((answer, index) => {
      if (!answer.answer.trim()) {
        newErrors[`answer_${index}`] = 'This question is required';
      }
    });

    if (selectedOpportunity.documentsRequired && selectedOpportunity.documentsRequired.length > 0) {
      const uploadedDocNames = formData.documents.map(doc => 
        doc.name.toLowerCase().replace(/\.[^/.]+$/, "")
      );
      
      const missingDocs = selectedOpportunity.documentsRequired.filter(requiredDoc => {
        const requiredDocLower = requiredDoc.toLowerCase();
        return !uploadedDocNames.some(uploaded => 
          uploaded.includes(requiredDocLower) || requiredDocLower.includes(uploaded)
        );
      });
      
      if (missingDocs.length > 0) {
        newErrors.documents = `Missing required documents: ${missingDocs.join(', ')}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setErrors({ ...errors, submit: null });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          opportunityId: selectedOpportunity._id,
          answers: formData.answers,
          documents: formData.documents
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit application');
      }

      alert('Application submitted successfully!');
      setShowApplyForm(false);
      setSelectedOpportunity(null);
      setActiveView('view');
      fetchApplications();
      
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors({ ...errors, submit: error.message || 'Failed to submit application. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

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

  const filteredOpportunities = opportunities.filter(opp => 
    opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opp.field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header with Toggle */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Applications</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setActiveView('view')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeView === 'view'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              View Applications
            </button>
            <button
              onClick={() => setActiveView('create')}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 ${
                activeView === 'create'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>Apply New</span>
            </button>
          </div>
        </div>

        {/* View Applications */}
        {activeView === 'view' && (
          <div>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-2 text-slate-600">Loading applications...</p>
              </div>
            ) : applications.length > 0 ? (
              <div className="space-y-3">
                {applications.map((application) => {
                  const CategoryIcon = getCategoryIcon(application.opportunity?.category);
                  return (
                    <div key={application._id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`p-3 rounded-lg flex-shrink-0 ${
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
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No applications yet</h3>
                <p className="text-slate-600 mb-4">Start by applying to opportunities</p>
                <button 
                  onClick={() => setActiveView('create')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Apply Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* Create New Application */}
        {activeView === 'create' && (
          <div>
            {/* Search and Filter */}
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search opportunities by title, provider, or field..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Opportunities Grid */}
            {filteredOpportunities.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOpportunities.map((opportunity) => {
                  const alreadyApplied = applications.find(app => 
                    app.opportunity?._id === opportunity._id
                  );
                  const deadlinePassed = new Date(opportunity.applicationDeadline) < new Date();
                  
                  return (
                    <div key={opportunity._id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`px-2 py-1 text-xs font-medium rounded-full ${
                          opportunity.category === 'bursary' ? 'bg-emerald-100 text-emerald-800' :
                          opportunity.category === 'internship' ? 'bg-slate-100 text-slate-800' :
                          opportunity.category === 'graduate' ? 'bg-amber-100 text-amber-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {opportunity.category.toUpperCase()}
                        </div>
                        {alreadyApplied && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Applied
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">{opportunity.title}</h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">{opportunity.provider}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-slate-500">
                          <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span className="truncate">{opportunity.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-slate-500">
                          <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                          <span>Closes {formatDate(opportunity.applicationDeadline)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => startApplication(opportunity)}
                        disabled={alreadyApplied || deadlinePassed}
                        className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                          alreadyApplied
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : deadlinePassed
                            ? 'bg-red-100 text-red-400 cursor-not-allowed'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {alreadyApplied ? 'Already Applied' : deadlinePassed ? 'Deadline Passed' : 'Apply Now'}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No opportunities found</h3>
                <p className="text-slate-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Application Form Modal */}
      {showApplyForm && selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50 sticky top-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Apply for Opportunity</h2>
                <p className="text-slate-600 mt-1">{selectedOpportunity.title}</p>
              </div>
              <button
                onClick={() => {
                  setShowApplyForm(false);
                  setSelectedOpportunity(null);
                }}
                className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                disabled={submitting}
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>

            {/* Opportunity Summary */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-8 w-8 text-slate-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{selectedOpportunity.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{selectedOpportunity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{selectedOpportunity.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Closes: {formatDate(selectedOpportunity.applicationDeadline)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{selectedOpportunity.field}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{selectedOpportunity.provider}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Questions Section */}
              {formData.answers.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Application Questions</h3>
                  <div className="space-y-4">
                    {formData.answers.map((answer, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {answer.question}
                        </label>
                        <textarea
                          value={answer.answer}
                          onChange={(e) => handleAnswerChange(index, e.target.value)}
                          rows={4}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                            errors[`answer_${index}`] ? 'border-red-500' : 'border-slate-300'
                          }`}
                          placeholder="Type your answer here..."
                          disabled={submitting}
                        />
                        {errors[`answer_${index}`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`answer_${index}`]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Required Documents
                </h3>
                {selectedOpportunity.documentsRequired && (
                  <p className="text-sm text-slate-500 mb-4">
                    ({selectedOpportunity.documentsRequired.join(', ')})
                  </p>
                )}

                {/* File Upload */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center mb-4">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-3">
                    Upload your documents (PDF, DOC, DOCX, JPG, PNG) - Max 10MB per file
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                    id="document-upload"
                    disabled={uploading || submitting}
                  />
                  <label
                    htmlFor="document-upload"
                    className={`inline-block px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                      uploading || submitting
                        ? 'bg-slate-400 text-slate-200 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {uploading ? 'Uploading...' : 'Choose Files'}
                  </label>
                  {uploading && (
                    <p className="text-sm text-slate-500 mt-2">Uploading files, please wait...</p>
                  )}
                </div>

                {errors.documents && (
                  <p className="text-red-500 text-sm mb-3">{errors.documents}</p>
                )}

                {/* Uploaded Files List */}
                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-700 text-sm mb-2">Uploaded Files:</h4>
                    {formData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <FileText className="h-4 w-4 text-slate-500 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="text-sm text-slate-700 block truncate">{doc.name}</span>
                            <a 
                              href={doc.downloadURL} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Preview
                            </a>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-red-500 hover:text-red-700 transition-colors disabled:text-red-300 flex-shrink-0 ml-2"
                          disabled={submitting}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowApplyForm(false);
                    setSelectedOpportunity(null);
                  }}
                  className="flex-1 bg-slate-100 text-slate-700 py-3 px-4 rounded-lg font-semibold hover:bg-slate-200 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={submitting || uploading}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm text-center mt-3">{errors.submit}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ApplicationsTab;