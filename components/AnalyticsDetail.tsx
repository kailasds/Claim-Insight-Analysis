import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import Icon from './Icon';
import { AnalyticsDetailData } from '../types';

interface AnalyticsDetailProps {
    data: AnalyticsDetailData;
}

const ChangeArrow: React.FC<{ type: 'increase' | 'decrease' }> = ({ type }) => {
    const isIncrease = type === 'increase';
    const color = isIncrease ? 'text-red-500' : 'text-green-500';
    return <span className={`ml-1 font-sans ${color}`}>{isIncrease ? '↑' : '↓'}</span>;
};

const AnalyticsDetail: React.FC<AnalyticsDetailProps> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Litigation Rate</h3>
                    <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option>Last 6 months</option>
                        <option>Last 12 months</option>
                    </select>
                </div>
                <div className="flex items-baseline mb-1">
                    <p className="text-4xl font-bold text-gray-900">{data.mainMetric.value}</p>
                    <p className={`text-lg font-bold ml-3 ${data.mainMetric.changeType === 'decrease' ? 'text-green-600' : 'text-red-600'}`}>
                        {data.mainMetric.change}%
                        <ChangeArrow type={data.mainMetric.changeType} />
                    </p>
                </div>
                <p className="text-sm text-gray-500 mb-4">{data.mainMetric.period}</p>
                <div style={{ width: '100%', height: 150 }}>
                    <ResponsiveContainer>
                        <BarChart data={data.barChartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <Tooltip cursor={{ fill: 'rgba(239, 246, 255, 0.7)' }} contentStyle={{ fontSize: '12px', borderRadius: '0.5rem', padding: '4px 8px' }} />
                            <Bar dataKey="value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {data.infoBoxes.map((box, i) => (
                        <div key={i} className={`p-3 rounded-lg flex items-start ${box.type === 'info' ? 'bg-blue-50 text-blue-800' : 'bg-green-50 text-green-800'}`}>
                           <div className={`mr-2.5 flex-shrink-0 ${box.type === 'info' ? 'text-blue-500' : 'text-green-500'}`}><Icon name={box.icon}/></div>
                           <p className="text-sm">{box.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="grid grid-cols-4 gap-x-6 px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    <span>Predictive Insight</span>
                    <span>Example Data</span>
                    <span>AI Interpretation</span>
                    <span>Actionable Suggestion</span>
                </div>
                <div className="space-y-2">
                 {data.predictiveInsights.map((item, index) => (
                    <div key={index} className={`grid grid-cols-4 gap-x-6 p-4 rounded-lg ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                       <div className="flex items-start">
                         <div className={`mr-2.5 flex-shrink-0 text-${item.iconColor}-500`}><Icon name={item.icon}/></div>
                         <p className="text-sm font-medium text-gray-800">{item.insight}</p>
                       </div>
                       <div className="text-sm text-gray-600">
                         <p>{item.exampleData.description}</p>
                         <div className="flex flex-wrap gap-1 mt-2">
                            {item.exampleData.claims.map(claim => <span key={claim} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">{claim}</span>)}
                         </div>
                       </div>
                       <p className="text-sm text-gray-600">{item.aiInterpretation}</p>
                       <p className="text-sm text-gray-600">{item.suggestion}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDetail;
