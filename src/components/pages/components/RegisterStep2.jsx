// components/RegisterStep2.jsx
import React from 'react';
import { Phone, Calendar, FileText } from 'lucide-react';

const RegisterStep2 = ({ formData, errors, handleInputChange, handlePrevStep, handleNextStep }) => {
  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Personal Details</h2>
        <p className="text-slate-600 mt-2">Step 2 of 3: Additional Information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
              placeholder="Phone number"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700 mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
            />
          </div>
          {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="idNumber" className="block text-sm font-medium text-slate-700 mb-1">
          ID Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FileText className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="idNumber"
            name="idNumber"
            type="text"
            value={formData.idNumber}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
              errors.idNumber ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
            placeholder="South African ID number"
          />
        </div>
        {errors.idNumber && <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-slate-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className={`block w-full py-3 px-3 border rounded-lg focus:ring-2 focus:outline-none ${
              errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
        </div>

        <div>
          <label htmlFor="race" className="block text-sm font-medium text-slate-700 mb-1">
            Race
          </label>
          <select
            id="race"
            name="race"
            value={formData.race}
            onChange={handleInputChange}
            className={`block w-full py-3 px-3 border rounded-lg focus:ring-2 focus:outline-none ${
              errors.race ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
          >
            <option value="">Select race</option>
            <option value="African">African</option>
            <option value="Coloured">Coloured</option>
            <option value="Indian">Indian</option>
            <option value="White">White</option>
            <option value="Other">Other</option>
          </select>
          {errors.race && <p className="mt-1 text-sm text-red-600">{errors.race}</p>}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={handlePrevStep}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 px-6 rounded-lg font-medium transition-colors duration-300"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-300"
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default RegisterStep2;