import React, { useState, useMemo } from 'react';
import { ScoreCategory } from '../types';
import { initialScoreData } from '../constants';
import ConfigCategoryNode from '../components/ConfigCategoryNode';

const ScoreConfiguration: React.FC = () => {
  const [scores, setScores] = useState<ScoreCategory[]>(initialScoreData);

  const handleOverallWeightChange = (categoryId: string, newWeight: number) => {
    // Ensure weight is within a reasonable range
    const weight = Math.max(0, Math.min(100, newWeight || 0));
    setScores(prevScores =>
      prevScores.map(category =>
        category.id === categoryId ? { ...category, overallWeight: weight } : category
      )
    );
  };

  const handleFactorWeightChange = (categoryId: string, factorId: string, newWeight: number) => {
    setScores(prevScores =>
      prevScores.map(category => {
        if (category.id === categoryId) {
          const newFactors = category.factors.map(factor => {
            if (factor.id === factorId) {
              return { ...factor, weight: newWeight };
            }
            return factor;
          });
          return { ...category, factors: newFactors };
        }
        return category;
      })
    );
  };

  const totalScore = useMemo(() => {
    return scores.reduce((total, category) => total + category.overallWeight, 0);
  }, [scores]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#f0f2f5] min-h-full font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Risk Score Configurator</h1>
        </header>

        <div className="flex items-start gap-8">
          {/* Left side: Configurable items */}
          <div className="w-2/3 space-y-4">
            {scores.map(category => (
              <div key={category.id} className="flex items-center">
                <div className="flex-grow">
                  <ConfigCategoryNode 
                    category={category} 
                    onFactorWeightChange={handleFactorWeightChange}
                  />
                </div>
                <div className="flex-shrink-0 flex items-center mx-4">
                  <div className="w-10 border-t border-gray-400 border-dashed"></div>
                  <div className="z-10 w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold shadow-sm">X</div>
                  <div className="ml-3">
                    <input
                      type="number"
                      value={category.overallWeight}
                      onChange={e => handleOverallWeightChange(category.id, parseInt(e.target.value, 10))}
                      className="w-20 p-2 text-center border rounded-md shadow-sm bg-white text-black font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="text-xs text-center text-black font-medium mt-1">{category.abbreviation}_WT</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Aggregator */}
          <div className="w-1/3 flex items-center justify-center sticky top-8" style={{ height: '50vh' }}>
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-400 border-l border-dashed"></div>
            <div className="flex items-center -ml-px">
              <div className="z-10 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg -translate-x-1/2">+</div>
              <div className="w-8 border-t border-gray-400 border-dashed"></div>
              <div className="flex flex-col items-center">
                <label className="mb-1 text-sm font-semibold text-indigo-700">
                  CLAIM SCORE
                </label>
                <input
                  type="text"
                  readOnly
                  value={`${totalScore}%`}
                  className="w-36 p-3 text-center text-2xl font-bold bg-indigo-100 border-2 border-indigo-300 rounded-lg shadow-inner text-indigo-800"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Score Footer */}
        <div className="mt-12 text-center p-4 bg-white rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold text-gray-700">Total Weight Contribution</h3>
          <p className={`text-3xl font-bold mt-1 ${totalScore !== 100 ? 'text-red-500' : 'text-green-500'}`}>
            {totalScore}%
          </p>
          {totalScore !== 100 && (
            <p className="text-sm text-red-600 mt-2">Warning: Total weight must equal 100% for a valid configuration.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreConfiguration;