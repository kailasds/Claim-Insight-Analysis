export type Page = 'Dashboard' | 'Analytics' | 'Score Configuration';

export interface ScoreFactor {
  id: string;
  name: string;
  description?: string;
  weight: number;
}

export interface ScoreCategory {
  id: string;
  title: string;
  criterion: number;
  overallWeight: number;
  performanceScore: number;
  description: string;
  factors: ScoreFactor[];
  abbreviation: string;
}

export interface PredictiveInsight {
  icon: string;
  iconColor: string;
  insight: string;
  exampleData: {
    description: string;
    claims: string[];
  };
  aiInterpretation: string;
  suggestion: string;
}

export interface AnalyticsDetailData {
  title: string;
  mainMetric: {
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    period: string;
  };
  barChartData: { name: string; value: number }[];
  infoBoxes: {
      icon: string;
      text: string;
      type: 'info' | 'suggestion';
  }[];
  predictiveInsights: PredictiveInsight[];
  suggestedPrompts: string[];
}
