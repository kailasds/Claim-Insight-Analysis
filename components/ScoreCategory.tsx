
import React from 'react';
import { ScoreCategory, ScoreFactor } from '../types';
import Slider from './Slider';

interface ScoreCategoryProps {
  category: ScoreCategory;
  onWeightChange: (categoryId: string, factorId: string, newWeight: number) => void;
}

const ScoreCategoryComponent: React.FC<ScoreCategoryProps> = ({ category, onWeightChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{category.title}</h2>
          <span className="text-sm text-gray-500">
            (Criterion #{category.criterion})
          </span>
          <p className="text-sm text-gray-600 mt-2 max-w-2xl">{category.description}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <p className="text-3xl font-bold text-blue-600">{category.overallWeight}%</p>
          <p className="text-sm font-medium text-gray-500">Sum: <span className="text-green-600">{category.performanceScore}%</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {category.factors.map((factor) => (
          <div key={factor.id}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{factor.name}</span>
              <span className="text-sm font-semibold text-blue-600">{factor.weight}%</span>
            </div>
            <Slider
              value={factor.weight}
              onChange={(e) => onWeightChange(category.id, factor.id, parseInt(e.target.value, 10))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreCategoryComponent;
