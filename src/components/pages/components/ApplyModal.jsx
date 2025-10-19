import React, { useState, useEffect } from 'react';
import { X, Upload, FileText, Download, Calendar, MapPin, GraduationCap } from 'lucide-react';

function ApplyModal({ opportunity, isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    answers: [],
    documents: []
  });
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (opportunity && isOpen) {
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
    }
  }, [opportunity, isOpen]);

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
      // Clear file input
      event.target.value = '';
    }
  };

  const removeDocument = async (index) => {
    const documentToRemove = formData.documents[index];
    
    try {
      const token = localStorage.getItem('token');
      // You might want to implement a delete endpoint for application documents
      // For now, we'll just remove from local state
      const newDocuments = formData.documents.filter((_, i) => i !== index);
      setFormData({ ...formData, documents: newDocuments });
    } catch (error) {
      console.error('Error removing document:', error);
      setErrors({ ...errors, documents: 'Failed to remove document' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if all questions are answered
    formData.answers.forEach((answer, index) => {
      if (!answer.answer.trim()) {
        newErrors[`answer_${index}`] = 'This question is required';
      }
    });

    // Check required documents
    if (opportunity.documentsRequired && opportunity.documentsRequired.length > 0) {
      const uploadedDocNames = formData.documents.map(doc => 
        doc.name.toLowerCase().replace(/\.[^/.]+$/, "") // Remove file extension
      );
      
      const missingDocs = opportunity.documentsRequired.filter(requiredDoc => {
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
      await onSubmit({
        opportunityId: opportunity._id,
        answers: formData.answers,
        documents: formData.documents
      });
      
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      setErrors({ ...errors, submit: error.message || 'Failed to submit application. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Apply for Opportunity</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            disabled={submitting}
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Opportunity Summary */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{opportunity.title}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Closes: {new Date(opportunity.applicationDeadline).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-2" />
              <span>{opportunity.field}</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              <span>{opportunity.provider}</span>
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
              {opportunity.documentsRequired && (
                <span className="text-sm font-normal text-slate-500 ml-2">
                  ({opportunity.documentsRequired.join(', ')})
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
              onClick={onClose}
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
  );
}

export default ApplyModal;