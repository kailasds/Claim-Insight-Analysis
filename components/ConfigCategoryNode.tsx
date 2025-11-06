import React, { useState } from 'react';
import { ScoreCategory } from '../types';
import Slider from './Slider';

interface ConfigCategoryNodeProps {
  category: ScoreCategory;
  onFactorWeightChange: (categoryId: string, factorId: string, newWeight: number) => void;
}

const ConfigCategoryNode: React.FC<ConfigCategoryNodeProps> = ({ category, onFactorWeightChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Calculate the sum of factor weights
  const factorWeightSum = category.factors.reduce((sum, factor) => sum + factor.weight, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-2 border border-gray-200 transition-all duration-300">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-md font-semibold text-gray-800 ">{category.title}</h3>
        <div className="flex items-center">
            <span className={`text-sm mr-2 font-medium ${factorWeightSum !== 100 ? 'text-red-500' : 'text-gray-500'}`}>
                Sub-weights: {factorWeightSum}%
            </span>
            <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">{category.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {category.factors.map((factor) => (
              <div key={factor.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{factor.name}</span>
                  <span className="text-sm font-semibold text-blue-600">{factor.weight}%</span>
                </div>
                <Slider
                  value={factor.weight}
                  onChange={(e) => onFactorWeightChange(category.id, factor.id, parseInt(e.target.value, 10))}
                />
              </div>
            ))}
          </div>
          {factorWeightSum !== 100 && (
            <p className="text-xs text-red-600 mt-4">Warning: Sub-weights for this category should sum to 100%.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ConfigCategoryNode;