import React from 'react';
import { Check, Circle } from 'lucide-react';

export function ProgressBar({ steps, currentStep }) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`flex flex-col items-center relative z-10 ${
              index === steps.length - 1 ? '' : 'flex-1'
            }`}
          >
          
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                index <= currentStep
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white text-gray-500'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>
            
            <span className={`mt-3 text-sm font-medium ${
              index <= currentStep ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step}
            </span>

            {index < steps.length - 1 && (
              <div className="absolute top-5 left-[50%] w-full h-[2px] bg-gray-200">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: index < currentStep ? '100%' : '0%',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}