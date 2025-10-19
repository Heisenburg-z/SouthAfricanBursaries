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
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

function ApplicationsTab() {
  const [applications, setApplications] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    answers: [],
    documents: []
  });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

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

  // This function will be called from HomePage when user clicks "Apply"
  const startApplication = (opportunity) => {
    // Check if already applied
    const alreadyApplied = applications.find(app => 
      app.opportunity?._id === opportunity._id
    );
    
    if (alreadyApplied) {
      alert('You have already applied for this opportunity.');
      return;
    }

    // Check if deadline passed
    if (new Date(opportunity.applicationDeadline) < new Date()) {
      alert('Sorry, the application deadline for this opportunity has passed.');
      return;
    }

    setSelectedOpportunity(opportunity);
    
    // Initialize answers based on opportunity questions
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
        uploadFormData.append('opportunityId', selectedOpportunity._id); // Add this

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

      const result = await response.json();
      
      alert('Application submitted successfully!');
      setShowApplyForm(false);
      setSelectedOpportunity(null);
      fetchApplications(); // Refresh the applications list
      
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

  // Expose function to parent component
  React.useImperativeHandle(React.createRef(), () => ({
    startApplication
  }));

  return (
    <div className="space-y-6">
      {/* Application Form Modal */}
      {showApplyForm && selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">Apply for Opportunity</h2>
              <button
                onClick={() => {
                  setShowApplyForm(false);
                  setSelectedOpportunity(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                disabled={submitting}
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </div>

            {/* Opportunity Summary */}
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <div className="flex items-start space-x-4">
                {/* Opportunity Image/Flyer Space */}
                <div className="w-32 h-32 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  {selectedOpportunity.imageUrl ? (
                    <img 
                      src={selectedOpportunity.imageUrl} 
                      alt={selectedOpportunity.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <FileText className="h-8 w-8 text-slate-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{selectedOpportunity.title}</h3>
                  <p className="text-slate-600 mb-4">{selectedOpportunity.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{selectedOpportunity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Closes: {formatDate(selectedOpportunity.applicationDeadline)}</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      <span>{selectedOpportunity.field}</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>{selectedOpportunity.provider}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Questions Section */}
              {formData.answers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Application Questions</h3>
                  <div className="space-y-4">
                    {formData.answers.map((answer, index) => (
                      <div key={index} className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700">
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
                          <p className="text-red-500 text-sm">{errors[`answer_${index}`]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Section */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Required Documents
                  {selectedOpportunity.documentsRequired && (
                    <span className="text-sm font-normal text-slate-500 ml-2">
                      ({selectedOpportunity.documentsRequired.join(', ')})
                    </span>
                  )}
                </h3>

                {/* File Upload */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 mb-2">
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
                  <p className="text-red-500 text-sm mt-2">{errors.documents}</p>
                )}

                {/* Uploaded Files List */}
                {formData.documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-slate-700">Uploaded Files:</h4>
                    {formData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-4 w-4 text-slate-500" />
                          <div>
                            <span className="text-sm text-slate-700 block">{doc.name}</span>
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
                          className="text-red-500 hover:text-red-700 transition-colors disabled:text-red-300"
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
              <div className="flex space-x-4 pt-4 border-t border-slate-200">
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
                <p className="text-red-500 text-sm text-center">{errors.submit}</p>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900">My Applications</h2>
          <div className="text-sm text-slate-500">
            {applications.length} application{applications.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-2 text-slate-600">Loading applications...</p>
            </div>
          ) : applications.length > 0 ? (
            applications.map((application) => {
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
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No applications yet</h3>
              <p className="text-slate-600 mb-4">Start applying to opportunities to see them here</p>
              <p className="text-sm text-slate-500">
                Browse opportunities on the homepage and click "Apply" to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationsTab;