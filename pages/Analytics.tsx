import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Icon from '../components/Icon';
import AIAssistant from '../components/AIAssistant';
import AnalyticsDetail from '../components/AnalyticsDetail';
import { analyticsDetails } from '../constants';

const analyticsCards = [
    { title: "Litigation Analytics", icon: "litigation", metrics: [{ label: "Litigation Rate", value: "13.14%", change: "30%", changeType: "decrease" }, { label: "Legal Cost per Claim", value: "1.4M", change: "28.3%", changeType: "decrease" }] },
    { title: "Fraud Analytics", icon: "fraud", metrics: [{ label: "Fraud Detection Rate", value: "8.1%", change: "24.6%", changeType: "increase" }, { label: "Total Fraud Value", value: "5.1Cr", change: "50%", changeType: "decrease" }] },
    { title: "TAT Analytics", icon: "complex", metrics: [{ label: "Avg TAT", value: "14.8d", change: "10.3%", changeType: "decrease" }, { label: "SLA Breach Rate", value: "1.4M", change: "18.2%", changeType: "increase" }] },
    { title: "Reserve Analytics", icon: "reputation", metrics: [{ label: "Reserve Adequacy", value: "92.3%", change: "5.2%", changeType: "increase" }, { label: "Avg Reserve per Claim", value: "2.8M", change: "12.1%", changeType: "increase" }] },
];

const ChangeArrow: React.FC<{ type: 'increase' | 'decrease' }> = ({ type }) => {
  const isIncrease = type === 'increase';
  const color = isIncrease ? 'text-red-500' : 'text-green-500';
  return <span className={`ml-1 font-sans ${color}`}>{isIncrease ? '↑' : '↓'}</span>;
};

const Analytics: React.FC = () => {
  const [selectedAnalytics, setSelectedAnalytics] = useState('Litigation Analytics');

  const selectedData = analyticsDetails[selectedAnalytics] || analyticsDetails['Litigation Analytics'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 h-full flex flex-col font-sans">
        <header className="mb-8">
          <div className="flex items-center">
            <div className="bg-blue-500 p-1 rounded-md mr-3">
               <Icon name="code" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome to Claim Insight Analysis</h1>
              <p className="text-gray-600 mt-1">Ask questions to get answers powered by AI</p>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {analyticsCards.map(card => (
                <div key={card.title} 
                  onClick={() => setSelectedAnalytics(card.title)}
                  className={`bg-white p-5 rounded-xl shadow-sm border transition-all duration-200 cursor-pointer ${selectedAnalytics === card.title ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:shadow-md'}`}>
                    <div className="flex items-center text-gray-700 mb-4">
                      <div className="p-2 bg-blue-50 rounded-full mr-3"><Icon name={card.icon} /></div>
                      <h3 className="text-md font-semibold">{card.title}</h3>
                    </div>
                    <div className="flex justify-between">
                        {card.metrics.map(metric => (
                            <div key={metric.label}>
                                <p className="text-sm text-gray-500">{metric.label}</p>
                                <div className="flex items-baseline">
                                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                                  <p className={`text-xs font-bold ml-2 ${metric.changeType === 'decrease' ? 'text-green-600' : 'text-red-600'}`}>
                                    {metric.change}
                                    <ChangeArrow type={metric.changeType} />
                                  </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center mb-6">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm">
                + Add Template
            </button>
        </div>

        <div className="flex-grow flex gap-6">
            <div className="w-full lg:w-2/3 flex flex-col">
                {selectedData && <AnalyticsDetail data={selectedData} />}
            </div>
            <div className="hidden lg:block lg:w-1/3">
                {selectedData && <AIAssistant analyticsType={selectedAnalytics} suggestedPrompts={selectedData.suggestedPrompts}/>}
            </div>
        </div>
    </div>
  );
};

export default Analytics;
