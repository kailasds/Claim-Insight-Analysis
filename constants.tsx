import { ScoreCategory, AnalyticsDetailData } from './types';
import React from 'react';

export const sidebarItems = [
    { name: 'Dashboard', icon: 'dashboard' },
    { name: 'Analytics', icon: 'analytics' },
    { name: 'Score Configuration', icon: 'settings' },
];

export const ICONS: { [key: string]: React.ReactNode } = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z" /></svg>,
    analytics: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>,
    settings: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};


export const initialScoreData: ScoreCategory[] = [
    {
      id: 'litigation',
      title: 'Litigation & Dispute Risk',
      criterion: 1,
      overallWeight: 7,
      performanceScore: 85,
      abbreviation: 'LIT',
      description: 'Measures the likelihood of legal disputes, arbitration, or class actions arising from claim issues.',
      factors: [
        { id: 'f1_1', name: 'Attorney or Legal Counsel Involvement', weight: 25 },
        { id: 'f1_2', name: 'Disputed Contract Terms', weight: 15 },
        { id: 'f1_3', name: 'Third-Party Liability', weight: 10 },
        { id: 'f1_4', name: 'Jurisdictional Complexity', weight: 10 },
        { id: 'f1_5', name: 'Claimant Cooperation Level', weight: 10 },
        { id: 'f1_6', name: 'Past Litigation History', weight: 15 },
      ],
    },
    {
      id: 'fraud',
      title: 'Fraud Modus Risk',
      criterion: 2,
      overallWeight: 20,
      performanceScore: 82,
      abbreviation: 'FRAUD',
      description: 'Detects potential financial misrepresentation, false reporting, or collusion.',
      factors: [
        { id: 'f2_1', name: 'Document Integrity', weight: 10 },
        { id: 'f2_2', name: 'Financial Statement Mismatch', weight: 17 },
        { id: 'f2_3', name: 'Insider Collusion', weight: 15 },
        { id: 'f2_4', name: 'Third-Party Involvement', weight: 12 },
        { id: 'f2_5', name: 'Claim Frequency Pattern', weight: 10 },
        { id: 'f2_6', name: 'Timing Anomalies', weight: 18 },
      ],
    },
    {
      id: 'financial',
      title: 'Financial Exposure & Complexity',
      criterion: 3,
      overallWeight: 12,
      performanceScore: 77,
      abbreviation: 'FIN',
      description: 'Evaluates the potential size and volatility of losses relative to the insured\'s financial position or coverage limits.',
      factors: [
        { id: 'f3_1', name: 'Reserve Volatility', weight: 12 },
        { id: 'f3_2', name: 'Coverage Utilization', weight: 10 },
        { id: 'f3_3', name: 'Claim-to-Revenue Ratio', weight: 20 },
        { id: 'f3_4', name: 'Reinsurance Exposure', weight: 10 },
        { id: 'f3_5', name: 'Currency / Inflation Impact', weight: 10 },
        { id: 'f3_6', name: 'Loss Aggregation Risk', weight: 15 },
      ],
    },
    {
      id: 'regulatory',
      title: 'Regulatory & Compliance Risk',
      criterion: 4,
      overallWeight: 10,
      performanceScore: 85,
      abbreviation: 'REG',
      description: 'Identifies exposure to breaches of legal, financial, or insurance regulations.',
      factors: [
        { id: 'f4_1', name: 'Late Regulatory Reporting', weight: 20 },
        { id: 'f4_2', name: 'Non-Adherence to Policy Wordings', weight: 15 },
        { id: 'f4_3', name: 'Anti-Money Laundering (AML) / Financial Crime', weight: 10 },
        { id: 'f4_4', name: 'Tax / Accounting Discrepancies', weight: 15 },
        { id: 'f4_5', name: 'Sanctions / KYC Violations', weight: 10 },
        { id: 'f4_6', name: 'Audit Findings / Observations', weight: 15 },
      ],
    },
    {
      id: 'operational',
      title: 'Operational Control Weakness Indicators',
      criterion: 5,
      overallWeight: 6,
      performanceScore: 85,
      abbreviation: 'OPR',
      description: 'Measures the strength of internal processes and controls influencing claim handling quality.',
      factors: [
        { id: 'f5_1', name: 'Claim Handling Delays', weight: 25 },
        { id: 'f5_2', name: 'Process / Control Failures', weight: 10 },
        { id: 'f5_3', name: 'Documentation Gaps', weight: 15 },
        { id: 'f5_4', name: 'System / Data Errors', weight: 15 },
        { id: 'f5_5', name: 'Staff Turnover Impact', weight: 10 },
        { id: 'f5_6', name: 'Third-Party Dependency', weight: 10 },
      ],
    },
    {
      id: 'escalation',
      title: 'Escalation Indicators',
      criterion: 6,
      overallWeight: 5,
      performanceScore: 74,
      abbreviation: 'ESC',
      description: 'Captures likelihood of claim complexity or cost growth over time.',
      factors: [
        { id: 'f6_1', name: 'Claim Duration', weight: 20 },
        { id: 'f6_2', name: 'Reserve Creep', weight: 15 },
        { id: 'f6_3', name: 'Negotiation Complexity', weight: 14 },
        { id: 'f6_4', name: 'Policy Ambiguity', weight: 10 },
        { id: 'f6_5', name: 'Reopened Claims', weight: 15 },
      ],
    },
];

export const subcategoryCorrelationMatrices = {
  'Litigation & Dispute Risk': {
      title: 'Litigation & Dispute Risk - Correlation Matrix of Subcategories',
      labels: ["Attorney or Legal Counsel Involvement", "Disputed Contract Terms", "Third-Party Liability", "Jurisdictional Complexity", "Claimant Cooperation Level", "Past Litigation History"],
      data: [
          [1.00, -0.06, -0.16, 0.04, -0.40, 0.01],
          [-0.06, 1.00, -0.37, -0.15, -0.33, -0.08],
          [-0.16, -0.37, 1.00, -0.14, -0.05, 0.44],
          [0.04, -0.15, -0.14, 1.00, 0.44, -0.72],
          [-0.40, -0.33, -0.05, 0.44, 1.00, -0.08],
          [0.01, -0.08, 0.44, -0.72, -0.08, 1.00]
      ]
  },
  'Fraud Modus Risk': {
      title: 'Fraud Modus Risk - Correlation Matrix of Subcategories',
      labels: ["Document Integrity", "Financial Statement Mismatch", "Insider Collusion", "Third-Party Involvement", "Claim Frequency Pattern", "Timing Anomalies"],
      data: [
          [1.00, 0.00, -0.14, 0.41, -0.27, -0.05],
          [0.00, 1.00, -0.19, -0.16, 0.11, 0.34],
          [-0.14, -0.19, 1.00, -0.37, -0.10, -0.70],
          [0.41, -0.16, -0.37, 1.00, -0.79, 0.07],
          [-0.27, 0.11, -0.10, -0.79, 1.00, 0.36],
          [-0.05, 0.34, -0.70, 0.07, 0.36, 1.00]
      ]
  },
  'Financial Exposure & Complexity': {
      title: 'Financial Exposure & Complexity - Correlation Matrix of Subcategories',
      labels: ["Reserve Volatility", "Coverage Utilization", "Claim-to-Revenue Ratio", "Reinsurance Exposure", "Currency / Inflation Impact", "Loss Aggregation Risk"],
      data: [
          [1.00, -0.06, -0.13, 0.31, -0.04, -0.15],
          [-0.06, 1.00, -0.41, 0.58, -0.36, 0.30],
          [-0.13, -0.41, 1.00, -0.11, 0.28, 0.00],
          [0.31, 0.58, -0.11, 1.00, 0.41, 0.47],
          [-0.04, -0.36, 0.28, 0.41, 1.00, 0.26],
          [-0.15, 0.30, 0.00, 0.47, 0.26, 1.00]
      ]
  },
  'Regulatory & Compliance Risk': {
      title: 'Regulatory & Compliance Risk - Correlation Matrix of Subcategories',
      labels: ["Late Regulatory Reporting", "Non-Adherence to Policy Wordings", "Anti-Money Laundering (AML) / Financial Crime", "Tax / Accounting Discrepancies", "Sanctions / KYC Violations", "Audit Findings / Observations"],
      data: [
          [1.00, 0.39, 0.05, -0.27, 0.09, 0.08],
          [0.39, 1.00, -0.35, -0.32, -0.45, 0.26],
          [0.05, -0.35, 1.00, 0.27, 0.32, 0.17],
          [-0.27, -0.32, 0.27, 1.00, 0.19, 0.11],
          [0.09, -0.45, 0.32, 0.19, 1.00, 0.16],
          [0.08, 0.26, 0.17, 0.11, 0.16, 1.00]
      ]
  },
  'Operational Control Weakness Indicators': {
      title: 'Operational Control Weakness Indicators - Correlation Matrix of Subcategories',
      labels: ["Claim Handling Delays", "Process / Control Failures", "Documentation Gaps", "System / Data Errors", "Staff Turnover Impact", "Third-Party Dependency"],
      data: [
          [1.00, 0.03, 0.37, -0.16, -0.37, 0.05],
          [0.03, 1.00, 0.10, 0.41, -0.05, 0.60],
          [0.37, 0.10, 1.00, 0.38, -0.27, 0.12],
          [-0.16, 0.41, 0.38, 1.00, 0.17, -0.16],
          [-0.37, -0.05, -0.27, 0.17, 1.00, -0.06],
          [0.05, 0.60, 0.12, -0.16, -0.06, 1.00]
      ]
  },
  'Escalation Indicators': {
      title: 'Escalation Indicators - Correlation Matrix of Subcategories',
      labels: ["Claim Duration", "Reserve Creep", "Negotiation Complexity", "Policy Ambiguity", "Reopened Claims"],
      data: [
          [1.00, 0.19, 0.02, -0.31, 0.17],
          [0.19, 1.00, 0.70, 0.03, 0.29],
          [0.02, 0.70, 1.00, -0.01, 0.29],
          [-0.31, 0.03, -0.01, 1.00, -0.22],
          [0.17, 0.29, 0.02, -0.22, 1.00]
      ]
  },
};


export const analyticsDetails: { [key: string]: AnalyticsDetailData } = {
  'Litigation Analytics': {
    title: 'Litigation Analytics',
    mainMetric: { value: '13.14%', change: '30%', changeType: 'decrease', period: 'Last 6 months: 9.3% - 15.2%' },
    barChartData: [
      { name: 'Jan', value: 12 }, { name: 'Feb', value: 16 }, { name: 'Mar', value: 15 },
      { name: 'Apr', value: 10 }, { name: 'May', value: 14 }, { name: 'Jun', value: 15 }
    ],
    infoBoxes: [
      { icon: 'info', text: 'Rising trend indicates more disputes, especially in professional indemnity claims.', type: 'info' },
      { icon: 'target', text: 'Reduce litigation rate to <10% by improving claim transparency and pre-litigation negotiation.', type: 'suggestion' }
    ],
    predictiveInsights: [
      {
        icon: 'warning', iconColor: 'red', insight: '5 high-risk claims likely to move to litigation',
        exampleData: {
          description: '5 of the last 50 open claims show >80% litigation probability',
          claims: ['CLM-2025-001', 'CLM-2025-004', 'CLM-2025-009', 'CLM-2025-013', 'CLM-2025-017']
        },
        aiInterpretation: 'Based on their dispute tone, claim amount, and region patterns.',
        suggestion: 'Preemptively reach out to these claimants for mediation or document clarification.'
      },
      {
        icon: 'trendUp', iconColor: 'blue', insight: 'Litigation risk concentrated in commercial lines',
        exampleData: {
          description: '72% of predicted litigations are in D&O and professional indemnity',
          claims: ['CLM-2024-1089', 'CLM-2024-1234', 'CLM-2024-1567', 'CLM-2024-1789', 'CLM-2024-1892', 'CLM-2024-2001']
        },
        aiInterpretation: 'Indicates policy ambiguity or inconsistent claim wording.',
        suggestion: 'Review and clarify indemnity clause communication.'
      },
      {
        icon: 'trendUp', iconColor: 'red', insight: 'Legal cost projected to rise 12% next quarter',
        exampleData: {
          description: 'Current cost per claim up 27% -> projected 1.6L avg next Q',
          claims: ['CLM-2024-1456', 'CLM-2024-1678', 'CLM-2024-1823', 'CLM-2024-1956', 'CLM-2024-2078']
        },
        aiInterpretation: 'Correlated with higher predicted litigation count.',
        suggestion: 'Allocate early legal resources or streamline review workflow.'
      },
      {
        icon: 'clock', iconColor: 'blue', insight: 'Settlement backlog alert',
        exampleData: {
          description: '15 claims > 100 days aging are flagged as high litigation risk',
          claims: ['CLM-2023-4567', 'CLM-2023-4789', 'CLM-2023-4923', 'CLM-2024-0234', 'CLM-2024-0678']
        },
        aiInterpretation: 'Older unresolved claims increase likelihood of disputes.',
        suggestion: 'Escalate aged claims to senior adjusters.'
      },
    ],
    suggestedPrompts: [
      "Show me high-risk claims likely to move to litigation",
      "What's the litigation rate trend over the last quarter?",
      "Which regions have the highest litigation rates?"
    ]
  },
  // Mock data for other categories can be added here
  'Fraud Analytics': {
    title: 'Fraud Analytics',
    mainMetric: { value: '8.1%', change: '14.6', changeType: 'decrease', period: 'Last 6 months: 7.5% - 9.2%' },
    barChartData: [], infoBoxes: [], predictiveInsights: [], suggestedPrompts: ["What are the most common fraud patterns?", "Which vendors are associated with high fraud risk?"]
  },
  'TAT Analytics': {
    title: 'TAT Analytics',
    mainMetric: { value: '14.8d', change: '16.3', changeType: 'increase', period: 'Last 6 months: 12.1d - 16.5d' },
    barChartData: [], infoBoxes: [], predictiveInsights: [], suggestedPrompts: ["Why is the average TAT increasing?", "Which claim types have the longest resolution time?"]
  },
  'Reserve Analytics': {
    title: 'Reserve Analytics',
    mainMetric: { value: '92.3%', change: '5.2', changeType: 'increase', period: 'Last 6 months: 90.1% - 94.5%' },
    barChartData: [], infoBoxes: [], predictiveInsights: [], suggestedPrompts: ["How accurate are our current reserves?", "Show claims with significant reserve changes."]
  },
};