import React, { useState } from 'react';
import Icon from '../components/Icon';
import { subcategoryCorrelationMatrices } from '../constants';

const kpiData = [
  { title: 'High-Risk Claims', value: '142', change: '+12.3%', changeType: 'increase' },
  { title: 'Average Exposure', value: '$2.4M', change: '+8.1%', changeType: 'increase' },
  { title: 'Litigation Probability', value: '34%', change: '+5.2%', changeType: 'increase' },
  { title: 'Avg Resolution Time', value: '45 days', change: '-2.1%', changeType: 'decrease' },
];

const predictiveInsights = [
  { icon: 'fraud', title: 'Fraud Risk Rising', text: 'Increase in spoofed vendor notices across APAC.', color: 'red' },
  { icon: 'litigation', title: 'Litigation Watch', text: '3 new claims flagged with attorney involvement.', color: 'orange' },
  { icon: 'complex', title: 'Complex Claims', text: 'High financial exposure due to cross-border assets.', color: 'blue' },
  { icon: 'reputation', title: 'Reputation Alert', text: 'Social sentiment turned negative for client X.', color: 'purple' },
];

const adjusterKeywordHeatmapData = {
  title: 'Adjuster Notes Keyword Heat Map by Risk Level (%)',
  rows: ['legal', 'fraud', 'dispute', 'delay', 'cooperative', 'documentation'],
  cols: ['High', 'Low', 'Medium'],
  data: [
    [100.0, 0.0, 0.0],
    [100.0, 0.0, 0.0],
    [100.0, 0.0, 0.0],
    [0.0, 0.0, 100.0],
    [0.0, 100.0, 0.0],
    [0.0, 0.0, 100.0],
  ]
};

const countryRiskHeatmapData = {
  title: 'Country vs Risk Level Heat Map (%)',
  rows: ['Australia', 'Brazil', 'Canada', 'France', 'Germany', 'India', 'Japan', 'South Africa', 'United Kingdom', 'United States'],
  cols: ['High', 'Low', 'Medium'],
  data: [
    [100.0, 0.0, 0.0], [0.0, 50.0, 50.0], [0.0, 33.3, 66.7], [33.3, 66.7, 0.0],
    [0.0, 75.0, 25.0], [50.0, 50.0, 0.0], [25.0, 25.0, 50.0], [0.0, 0.0, 100.0],
    [33.3, 0.0, 66.7], [0.0, 50.0, 50.0],
  ]
};

const getCoolWarmColor = (value, min, max) => {
  const ratio = (value - min) / (max - min);
  const saturation = 65; // Reduced saturation for a subtler effect
  const lightness = 96 - (25 * Math.abs(ratio - 0.5) * 2); // Lighter overall, less contrast
  const hue = (1 - ratio) * 240; // Blue (240) to Red (0)
  const textColor = lightness > 85 ? '#1f2937' : 'white'; // Dark gray on light cells for better readability
  return { backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`, color: textColor };
};

const getRedsColor = (value, min, max) => {
  const ratio = (value - min) / (max - min);
  const lightness = 95 - ratio * 50;
  const saturation = 90;
  const hue = 0; // Red
  const textColor = lightness > 70 ? 'black' : 'white';
  return { backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`, color: textColor };
};

const Heatmap = ({ rowLabels, colLabels, data, colorFn, valueFormatter }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-center border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 border border-gray-200"></th>
            {colLabels.map((label, i) => <th key={i} className="p-2 font-medium text-gray-600 border border-gray-200">{label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((rowLabel, rowIndex) => (
            <tr key={rowIndex}>
              <td className="p-2 text-left font-semibold text-gray-700 border border-gray-200 bg-gray-50">{rowLabel}</td>
              {data[rowIndex].map((cellValue, colIndex) => {
                const style = colorFn(cellValue);
                return (
                  <td key={colIndex} style={style} className="p-2 border border-white font-semibold">
                    {valueFormatter(cellValue)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);


const Dashboard: React.FC = () => {
    const [heatmapType, setHeatmapType] = useState('keyword');
    const matrixKeys = Object.keys(subcategoryCorrelationMatrices);
    const [selectedMatrix, setSelectedMatrix] = useState(matrixKeys[0]);

    const selectedHeatmap = heatmapType === 'keyword' ? adjusterKeywordHeatmapData : countryRiskHeatmapData;
    const selectedColorFn = heatmapType === 'keyword' 
        ? (v) => getCoolWarmColor(v, 0, 100) 
        : (v) => getRedsColor(v, 0, 100);
    const selectedFormatter = (v) => v.toFixed(1);
    const selectedCorrelationMatrix = subcategoryCorrelationMatrices[selectedMatrix];
    
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Claims Risk Overview</h1>
                <p className="text-gray-600 mt-1">Real-time view of claim risks, predictive insights, and GenAI narrative explanations</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {kpiData.map(item => (
                    <div key={item.title} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <p className="text-sm font-medium text-gray-500">{item.title}</p>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{item.value}</p>
                        <p className={`text-sm mt-1 font-semibold ${item.changeType === 'increase' ? 'text-red-500' : 'text-green-500'}`}>
                            {item.change} vs last period
                        </p>
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">{selectedHeatmap.title}</h3>
                        <select
                            value={heatmapType}
                            onChange={(e) => setHeatmapType(e.target.value)}
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="keyword">Adjuster Notes</option>
                            <option value="country">Country</option>
                        </select>
                    </div>
                    <Heatmap 
                        rowLabels={selectedHeatmap.rows}
                        colLabels={selectedHeatmap.cols}
                        data={selectedHeatmap.data}
                        colorFn={selectedColorFn}
                        valueFormatter={selectedFormatter}
                    />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Subcategory Correlation Matrix</h3>
                        <select
                            value={selectedMatrix}
                            onChange={(e) => setSelectedMatrix(e.target.value)}
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                           {matrixKeys.map(key => (
                                <option key={key} value={key}>{key}</option>
                            ))}
                        </select>
                    </div>
                    <h4 className="text-md font-semibold text-gray-700 mb-4 text-center">{selectedCorrelationMatrix.title}</h4>
                    <Heatmap 
                        rowLabels={selectedCorrelationMatrix.labels}
                        colLabels={selectedCorrelationMatrix.labels}
                        data={selectedCorrelationMatrix.data}
                        colorFn={(v) => getCoolWarmColor(v, -1, 1)}
                        valueFormatter={(v) => v.toFixed(2)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {predictiveInsights.map(insight => (
                    <div key={insight.title} className="bg-white p-5 rounded-xl shadow-sm border-l-4" style={{borderColor: insight.color}}>
                        <div className="flex items-center">
                            <Icon name={insight.icon} />
                            <h4 className="font-semibold text-gray-800 ml-3">{insight.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{insight.text}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboard;