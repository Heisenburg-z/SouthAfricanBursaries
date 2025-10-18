// components/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import SuccessNotification from './SuccessNotification';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { user, register } = useAuth();
  const navigate = useNavigate();

  // Add this useEffect to track user changes
  useEffect(() => {
    console.log('RegisterForm - User state changed:', user);
    
    // If user becomes available after registration, navigate to dashboard
    if (user && user._id) {
      console.log('Valid user detected in RegisterForm, navigating to dashboard...');
      setSuccessMessage('🎉 Registration successful! Welcome to your dashboard.');
      setShowSuccess(true);
      
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2000);
    }
  }, [user, navigate]);

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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 2) {
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.idNumber) newErrors.idNumber = 'ID number is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.race) newErrors.race = 'Race is required';
    }
    
    if (step === 3) {
      if (!formData.education.institution) newErrors.institution = 'Institution is required';
      if (!formData.education.qualification) newErrors.qualification = 'Qualification is required';
      if (!formData.education.fieldOfStudy) newErrors.fieldOfStudy = 'Field of study is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      console.log('Submitting registration form...');
      const result = await register(formData);
      console.log('Registration completed with result:', result);
      
      // If state doesn't update within 1 second, check localStorage and show success message
      setTimeout(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && (!user || !user._id)) {
          console.log('State not updated, but user found in localStorage. Showing success message...');
          setSuccessMessage('🎉 Registration successful! Welcome to your dashboard.');
          setShowSuccess(true);
          
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 2000);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Registration error in form:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegisterStep1
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
            handleGoogleAuth={handleGoogleAuth}
          />
        );
      case 2:
        return (
          <RegisterStep2
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        );
      case 3:
        return (
          <RegisterStep3
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handlePrevStep={handlePrevStep}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStep()}
        
        {errors.submit && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">❌</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {errors.submit}
                </h3>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Success Notification */}
      {showSuccess && (
        <SuccessNotification
          message={successMessage}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
};

export default RegisterForm;