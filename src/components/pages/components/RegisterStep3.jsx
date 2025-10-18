// components/RegisterStep3.jsx
import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';

const RegisterStep3 = ({ formData, errors, handleInputChange, handlePrevStep, handleSubmit, isSubmitting }) => {
  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Education Details</h2>
        <p className="text-slate-600 mt-2">Step 3 of 3: Education Information</p>
      </div>

      <div>
        <label htmlFor="institution" className="block text-sm font-medium text-slate-700 mb-1">
          Institution
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <GraduationCap className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="institution"
            name="education.institution"
            type="text"
            value={formData.education.institution}
            onChange={handleInputChange}
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
              errors.institution ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
            }`}
            placeholder="University or college name"
          />
        </div>
        {errors.institution && <p className="mt-1 text-sm text-red-600">{errors.institution}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="qualification" className="block text-sm font-medium text-slate-700 mb-1">
            Qualification
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BookOpen className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="qualification"
              name="education.qualification"
              type="text"
              value={formData.education.qualification}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.qualification ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
              placeholder="e.g. BSc Computer Science"
            />
          </div>
          {errors.qualification && <p className="mt-1 text-sm text-red-600">{errors.qualification}</p>}
        </div>

        <div>
          <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-slate-700 mb-1">
            Field of Study
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BookOpen className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="fieldOfStudy"
              name="education.fieldOfStudy"
              type="text"
              value={formData.education.fieldOfStudy}
              onChange={handleInputChange}
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.fieldOfStudy ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
              placeholder="e.g. Computer Science"
            />
          </div>
          {errors.fieldOfStudy && <p className="mt-1 text-sm text-red-600">{errors.fieldOfStudy}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="yearOfStudy" className="block text-sm font-medium text-slate-700 mb-1">
            Year of Study
          </label>
          <select
            id="yearOfStudy"
            name="education.yearOfStudy"
            value={formData.education.yearOfStudy}
            onChange={handleInputChange}
            className="block w-full py-3 px-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
            <option value="5">5th Year+</option>
          </select>
        </div>

        <div>
          <label htmlFor="graduationYear" className="block text-sm font-medium text-slate-700 mb-1">
            Graduation Year
          </label>
          <input
            id="graduationYear"
            name="education.graduationYear"
            type="number"
            min="2023"
            max="2030"
            value={formData.education.graduationYear}
            onChange={handleInputChange}
            className="block w-full py-3 px-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="e.g. 2024"
          />
        </div>
      </div>

      <div>
        <label htmlFor="averageMarks" className="block text-sm font-medium text-slate-700 mb-1">
          Average Marks (%)
        </label>
        <input
          id="averageMarks"
          name="education.averageMarks"
          type="number"
          min="0"
          max="100"
          value={formData.education.averageMarks}
          onChange={handleInputChange}
          className="block w-full py-3 px-3 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="e.g. 75"
        />
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
          type="submit"
          disabled={isSubmitting}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </>
  );
};

export default RegisterStep3;