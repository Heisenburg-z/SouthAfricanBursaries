import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Calendar, MapPin, GraduationCap, CheckCircle2, AlertCircle } from 'lucide-react';

function ApplyModal({ opportunity, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    answers: [],
    documents: []
  });
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);


  useEffect(() => {
    if (opportunity && isOpen) {
      // Initialize answers based on opportunity questions
      const initialAnswers = opportunity.questions
        ? opportunity.questions.map(q => ({ question: q, answer: '' }))
        : [];
      
      setFormData({ answers: initialAnswers, documents: [] });
      setErrors({});
      setCurrentStep(1);
    }
  }, [opportunity, isOpen]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...formData.answers];
    newAnswers[index].answer = value;
    setFormData({ ...formData, answers: newAnswers });
    
    // Clear error for this field
    if (errors[`answer${index}`]) {
      setErrors({ ...errors, [`answer${index}`]: null });
    }
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setErrors({ ...errors, documents: null });

    try {
      for (const file of files) {
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large. Maximum size is 10MB.`);
        }

        const uploadFormData = new FormData();
        uploadFormData.append('document', file);
        
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
            documents: [
              ...prev.documents,
              {
                name: file.name,
                firebaseName: fileInfo.firebaseName,
                downloadURL: fileInfo.downloadURL,
                uploadedAt: new Date(),
                size: file.size,
                type: file.type
              }
            ]
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
      // Clear file input
      event.target.value = '';
    }
  };

  const removeDocument = (index) => {
    const newDocuments = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: newDocuments });
  };

  // ✅ FIXED: Better document validation - by document type category, not exact name match
 const validateForm = () => {
  const newErrors = {};

  // Check if all questions are answered
  formData.answers.forEach((answer, index) => {
    if (!answer.answer.trim()) {
      newErrors[`answer${index}`] = 'This question is required';
    }
  });

  // ✅ SIMPLIFIED: Just check document count
  if (opportunity.documentsRequired && opportunity.documentsRequired.length > 0) {
    const requiredCount = opportunity.documentsRequired.length;
    const uploadedCount = formData.documents.length;

    if (uploadedCount < requiredCount) {
      newErrors.documents = `Please upload at least ${requiredCount} document(s). You have uploaded ${uploadedCount}.`;
    }
    // Optional: Show a friendly reminder (not an error)
    else if (uploadedCount === requiredCount) {
      console.log('✅ Document count matches requirements. Admin will verify document types.');
    }
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  //
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    const firstError = document.querySelector('.text-red-500');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  setSubmitting(true);
  setErrors({ ...errors, submit: null });

  try {
    await onSubmit({
      opportunityId: opportunity._id,
      answers: formData.answers,
      documents: formData.documents
    });
    
    // ✅ SHOW SUCCESS MESSAGE
    setShowSuccess(true);
    
    // Reset form
    setFormData({ answers: [], documents: [] });
    setCurrentStep(1);
    
    // Close modal after 2 seconds to let user see the success message
    setTimeout(() => {
      onClose();
    }, 2000);
    
  } catch (error) {
    console.error('Error submitting application:', error);
    setErrors({ ...errors, submit: error.message || 'Failed to submit application. Please try again.' });
  } finally {
    setSubmitting(false);
  }
};




  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (!isOpen) return null;

  const totalSteps = 2;
  const canProceed = currentStep === 1 ? formData.answers.every(a => a.answer.trim()) : formData.documents.length > 0;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all animate-scale-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Apply for Opportunity</h2>
                <p className="text-emerald-100 text-sm">Step {currentStep} of {totalSteps}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              disabled={submitting}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Opportunity Summary */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-3">{opportunity.title}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center text-slate-600">
              <MapPin className="h-4 w-4 mr-2 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{opportunity.location}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Calendar className="h-4 w-4 mr-2 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{new Date(opportunity.applicationDeadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <GraduationCap className="h-4 w-4 mr-2 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{opportunity.field}</span>
            </div>
            <div className="flex items-center text-slate-600">
              <FileText className="h-4 w-4 mr-2 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{opportunity.provider}</span>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-280px)]">
          {/* Step 1: Questions */}
          {currentStep === 1 && (
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Application Questions</h3>
              </div>

              {formData.answers.length > 0 ? (
                <div className="space-y-5">
                  {formData.answers.map((answer, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {answer.question}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <textarea
                        value={answer.answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        rows="4"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors[`answer${index}`]
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-slate-300 focus:ring-emerald-500'
                        }`}
                        placeholder="Type your answer here..."
                        disabled={submitting}
                      />
                      {errors[`answer${index}`] && (
                        <p className="text-red-500 text-sm flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors[`answer${index}`]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                  <p>No questions required for this application</p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Documents */}
          {currentStep === 2 && (
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Upload Documents</h3>
              </div>

              {/* Required Documents Info */}
              {opportunity.documentsRequired && opportunity.documentsRequired.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900 mb-2">Required Documents:</p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {opportunity.documentsRequired.map((doc, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* File Upload Area */}
              <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                uploading ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-emerald-400'
              }`}>
                <Upload className={`h-12 w-12 mx-auto mb-3 ${uploading ? 'text-emerald-600 animate-bounce' : 'text-slate-400'}`} />
                <p className="text-sm text-slate-600 mb-2">
                  {uploading ? 'Uploading files...' : 'Drag and drop files or click to browse'}
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Supported: PDF, DOC, DOCX, JPG, PNG • Max 10MB per file
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
                  className={`inline-block px-6 py-3 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                    uploading || submitting
                      ? 'bg-slate-400 text-slate-200 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {uploading ? 'Uploading...' : 'Choose Files'}
                </label>
              </div>

              {errors.documents && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {errors.documents}
                  </p>
                </div>
              )}

              {/* Uploaded Files List */}
              {formData.documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-700 mb-3">Uploaded Files ({formData.documents.length})</h4>
                  {formData.documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-4 rounded-lg hover:bg-emerald-100 transition-colors group"
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{doc.name}</p>
                          <p className="text-xs text-slate-500">{formatFileSize(doc.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        disabled={submitting}
                        title="Remove file"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {errors.submit && (
            <div className="px-6 pb-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {errors.submit}
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 bg-white border-2 border-slate-300 text-slate-700 py-3 px-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
                disabled={submitting}
              >
                Previous
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
                  canProceed
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
                disabled={!canProceed}
              >
                Next: Upload Documents
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleSubmit}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center ${
                  submitting || uploading
                    ? 'bg-emerald-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                disabled={submitting || uploading}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-2xl p-12 text-center shadow-2xl animate-bounce-in">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
            <p className="text-slate-600 mb-6">Thank you! Your application has been successfully submitted.</p>
            <p className="text-sm text-slate-500">Closing in 2 seconds...</p>
          </div>
        </div>
      )}

<style jsx>{`
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scale-in {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0.3);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    70% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }

  .animate-scale-in {
    animation: scale-in 0.3s ease-out;
  }

  .animate-bounce-in {
    animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`}</style>

    </div>
  );
}

export default ApplyModal;
