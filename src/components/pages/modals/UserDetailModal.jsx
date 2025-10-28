import React from 'react';
import { X } from 'lucide-react';

const UserDetailModal = ({ user, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-2xl w-full">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
          <p><strong>Date of Birth:</strong> {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
          <p><strong>Gender:</strong> {user.gender || 'Not provided'}</p>
          <p><strong>Race:</strong> {user.race || 'Not provided'}</p>
          <p><strong>ID Number:</strong> {user.idNumber || 'Not provided'}</p>
        </div>
        {user.education && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
            <p><strong>Institution:</strong> {user.education.institution}</p>
            <p><strong>Qualification:</strong> {user.education.qualification}</p>
            <p><strong>Field of Study:</strong> {user.education.fieldOfStudy}</p>
            <p><strong>Year of Study:</strong> {user.education.yearOfStudy}</p>
            <p><strong>Graduation Year:</strong> {user.education.graduationYear}</p>
            <p><strong>Average Marks:</strong> {user.education.averageMarks}%</p>
          </div>
        )}
        {user.address && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p>{user.address.street}</p>
            <p>{user.address.city}, {user.address.province}</p>
            <p>{user.address.postalCode}</p>
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Account Information</h3>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
          <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'User'}</p>
        </div>
        {user.resume && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Resume</h3>
            <a
              href={user.resume.downloadURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
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

export default UserDetailModal;
