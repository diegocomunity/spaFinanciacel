import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface AlertMessageProps {
  type: 'success' | 'error' | null;
  message: string;
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ type, message }) => {
  if (!type || !message) return null;
  
  const alertClasses = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200'
  };
  
  const iconClasses = {
    success: 'text-green-500',
    error: 'text-red-500'
  };
  
  const Icon = type === 'success' ? Check : AlertCircle;
  
  return (
    <div className={`rounded-md p-4 border ${alertClasses[type]} animate-fadeIn`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconClasses[type]}`} />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};