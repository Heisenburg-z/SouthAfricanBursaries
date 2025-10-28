import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const SuccessNotification = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-2xl border-l-4 border-emerald-500 p-4 flex items-center space-x-3 min-w-[320px] max-w-md">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce-slow">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900">Success!</p>
          <p className="text-sm text-slate-600 mt-0.5">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SuccessNotification;
