
export interface WPBakeryBlock {
  id: string;
  timestamp: number;
  prompt: string;
  code: string;
  type: 'Hero' | 'Section' | 'CTA' | 'Card' | 'FAQ' | 'Other';
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}
