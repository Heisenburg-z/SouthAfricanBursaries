import React from 'react';
import { X } from 'lucide-react';

const ApplicationDetailModal = ({ application, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-2xl w-full">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Applicant Information</h3>
          <p><strong>Name:</strong> {application.applicant?.firstName} {application.applicant?.lastName}</p>
          <p><strong>Email:</strong> {application.applicant?.email}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Opportunity</h3>
          <p><strong>Title:</strong> {application.opportunity?.title}</p>
          <p><strong>Provider:</strong> {application.opportunity?.provider}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Application Date</h3>
          <p>{new Date(application.applicationDate).toLocaleString()}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            application.status === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : application.status === 'Under Review'
              ? 'bg-blue-100 text-blue-800'
              : application.status === 'Shortlisted'
              ? 'bg-purple-100 text-purple-800'
              : application.status === 'Accepted'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {application.status}
          </span>
        </div>
        {application.answers && application.answers.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Answers</h3>
            {application.answers.map((answer, index) => (
              <div key={index} className="mb-3 p-3 bg-gray-50 rounded">
                <p className="font-medium text-gray-700">{answer.question}</p>
                <p className="text-gray-600 mt-1">{answer.answer}</p>
              </div>
            ))}
          </div>
        )}
        {application.documents && application.documents.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Documents</h3>
            {application.documents.map((doc, index) => (
              <div key={index} className="mb-2">
                <a
                  href={doc.downloadURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {doc.name || 'Download Document'}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-6 border-t">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ApplicationDetailModal;
