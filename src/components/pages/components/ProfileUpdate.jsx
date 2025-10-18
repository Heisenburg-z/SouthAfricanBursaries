import React, { useState, useEffect } from 'react';
import {
  User,
  Camera,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Save,
  Trash2,
  FileText,
  GraduationCap,
  MapPin,
  Phone,
  Calendar,
  BookOpen,
  TrendingUp
} from 'lucide-react';

function ProfileUpdate({ userData, onProfileUpdate, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    idNumber: '',
    gender: '',
    race: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: ''
    },
    education: {
      institution: '',
      qualification: '',
      fieldOfStudy: '',
      yearOfStudy: '',
      graduationYear: '',
      averageMarks: ''
    },
    skills: []
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [skillsInput, setSkillsInput] = useState('');

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : '',
        idNumber: userData.idNumber || '',
        gender: userData.gender || '',
        race: userData.race || '',
        address: {
          street: userData.address?.street || '',
          city: userData.address?.city || '',
          province: userData.address?.province || '',
          postalCode: userData.address?.postalCode || ''
        },
        education: {
          institution: userData.education?.institution || '',
          qualification: userData.education?.qualification || '',
          fieldOfStudy: userData.education?.fieldOfStudy || '',
          yearOfStudy: userData.education?.yearOfStudy || '',
          graduationYear: userData.education?.graduationYear || '',
          averageMarks: userData.education?.averageMarks || ''
        },
        skills: userData.skills || []
      });
      setSkillsInput(userData.skills?.join(', ') || '');
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkillsInput(value);
    setFormData(prev => ({
      ...prev,
      skills: value.split(',').map(skill => skill.trim()).filter(skill => skill)
    }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Profile photo must be less than 5MB' });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select an image file' });
        return;
      }
      setProfilePhoto(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Resume must be less than 10MB' });
        return;
      }
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setMessage({ type: 'error', text: 'Please select a PDF or Word document' });
        return;
      }
      setResume(file);
    }
  };

  const uploadProfilePhoto = async () => {
    if (!profilePhoto) return null;

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('profilePhoto', profilePhoto);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/photo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile photo');
      }

      const data = await response.json();
      return data.profilePhoto;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      setMessage({ type: 'error', text: 'Failed to upload profile photo' });
      return null;
    }
  };

  const uploadResume = async () => {
    if (!resume) return null;

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/resume`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const data = await response.json();
      return data.resume;
    } catch (error) {
      console.error('Error uploading resume:', error);
      setMessage({ type: 'error', text: 'Failed to upload resume' });
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      
      // Upload files first if selected
      let updatedProfilePhoto = null;
      let updatedResume = null;

      if (profilePhoto) {
        updatedProfilePhoto = await uploadProfilePhoto();
      }

      if (resume) {
        updatedResume = await uploadResume();
      }

      // Update profile data
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Notify parent component about the update
      if (onProfileUpdate) {
        onProfileUpdate(data.user);
      }

      // Reset file inputs
      setProfilePhoto(null);
      setResume(null);

    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const deleteProfilePhoto = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/photo`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile photo');
      }

      setMessage({ type: 'success', text: 'Profile photo deleted successfully!' });
      
      // Update parent component
      if (onProfileUpdate) {
        const updatedUser = { ...userData, profilePhoto: null };
        onProfileUpdate(updatedUser);
      }
    } catch (error) {
      console.error('Error deleting profile photo:', error);
      setMessage({ type: 'error', text: 'Failed to delete profile photo' });
    }
  };

  const deleteResume = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/resume`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete resume');
      }

      setMessage({ type: 'success', text: 'Resume deleted successfully!' });
      
      // Update parent component
      if (onProfileUpdate) {
        const updatedUser = { ...userData, resume: null };
        onProfileUpdate(updatedUser);
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      setMessage({ type: 'error', text: 'Failed to delete resume' });
    }
  };

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 
    'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape'
  ];

  const races = ['African', 'Coloured', 'Indian', 'White', 'Other'];
  const genders = ['Male', 'Female', 'Other'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Update Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mx-6 mt-4 p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Profile Photo Section */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <Camera className="h-5 w-5 mr-2 text-slate-600" />
              Profile Photo
            </h3>
            
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center overflow-hidden">
                  {userData?.profilePhoto?.downloadURL ? (
                    <img 
                      src={userData.profilePhoto.downloadURL} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-emerald-600" />
                  )}
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 bg-white border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50 cursor-pointer transition-colors">
                    <Upload className="h-4 w-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {profilePhoto ? profilePhoto.name : 'Upload Photo'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                      className="hidden"
                    />
                  </label>
                  
                  {userData?.profilePhoto && (
                    <button
                      type="button"
                      onClick={deleteProfilePhoto}
                      className="flex items-center space-x-2 bg-red-50 text-red-700 rounded-lg px-4 py-2 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  )}
                </div>
                
                <p className="text-xs text-slate-500">
                  Recommended: Square image, max 5MB. JPG, PNG, or GIF.
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Phone className="h-4 w-4 mr-1 text-slate-500" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-slate-500" />
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                ID Number
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                {genders.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Race
              </label>
              <select
                name="race"
                value={formData.race}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Select Race</option>
                {races.map(race => (
                  <option key={race} value={race}>{race}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-slate-600" />
              Address Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Province
                </label>
                <select
                  name="address.province"
                  value={formData.address.province}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select Province</option>
                  {provinces.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="address.postalCode"
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Education Information */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-slate-600" />
              Education Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-1 text-slate-500" />
                  Institution
                </label>
                <input
                  type="text"
                  name="education.institution"
                  value={formData.education.institution}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Qualification
                </label>
                <input
                  type="text"
                  name="education.qualification"
                  value={formData.education.qualification}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="education.fieldOfStudy"
                  value={formData.education.fieldOfStudy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Year of Study
                </label>
                <select
                  name="education.yearOfStudy"
                  value={formData.education.yearOfStudy}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  {[1, 2, 3, 4, 5].map(year => (
                    <option key={year} value={year}>Year {year}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Graduation Year
                </label>
                <input
                  type="number"
                  name="education.graduationYear"
                  value={formData.education.graduationYear}
                  onChange={handleInputChange}
                  min={new Date().getFullYear()}
                  max={new Date().getFullYear() + 10}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-slate-500" />
                  Average Marks (%)
                </label>
                <input
                  type="number"
                  name="education.averageMarks"
                  value={formData.education.averageMarks}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Skills</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                value={skillsInput}
                onChange={handleSkillsChange}
                placeholder="e.g., JavaScript, React, Node.js, Python"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                Separate multiple skills with commas
              </p>
            </div>
            
            {formData.skills.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resume Section */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-slate-600" />
              Resume
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 bg-white border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50 cursor-pointer transition-colors">
                  <Upload className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {resume ? resume.name : 'Upload Resume'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                    className="hidden"
                  />
                </label>
                
                {userData?.resume && (
                  <div className="flex items-center space-x-4">
                    <a
                      href={userData.resume.downloadURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 rounded-lg px-4 py-2 hover:bg-emerald-100 transition-colors"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="text-sm font-medium">View Current</span>
                    </a>
                    
                    <button
                      type="button"
                      onClick={deleteResume}
                      className="flex items-center space-x-2 bg-red-50 text-red-700 rounded-lg px-4 py-2 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-slate-500">
                Accepted formats: PDF, DOC, DOCX. Max file size: 10MB.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUpdate;