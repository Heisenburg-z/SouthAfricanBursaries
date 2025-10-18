// components/SuccessNotification.jsx
import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const SuccessNotification = ({ message, onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-emerald-800">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-emerald-400 hover:text-emerald-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;