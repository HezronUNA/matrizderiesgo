import { RiskLevel } from '@/types/risk'

export const RISK_LEVELS: RiskLevel[] = [
  {
    id: 1,
    name: 'Very Low',
    weight: 1,
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Minimal risk, acceptable level'
  },
  {
    id: 2,
    name: 'Low',
    weight: 2,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Low risk, manageable level'
  },
  {
    id: 3,
    name: 'Medium',
    weight: 3,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    description: 'Moderate risk, requires attention'
  },
  {
    id: 4,
    name: 'High',
    weight: 4,
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'High risk, immediate action needed'
  },
  {
    id: 5,
    name: 'Very High',
    weight: 5,
    color: 'bg-red-100 text-red-800 border-red-200',
    description: 'Critical risk, urgent action required'
  }
]

export const RISK_CLASSIFICATIONS = {
  LOW: { min: 1, max: 5, label: 'Low Risk', color: 'risk-low' },
  MEDIUM: { min: 6, max: 15, label: 'Medium Risk', color: 'risk-medium' },
  HIGH: { min: 16, max: 20, label: 'High Risk', color: 'risk-high' },
  CRITICAL: { min: 21, max: 25, label: 'Critical Risk', color: 'risk-critical' }
}

export const ALERT_MESSAGES = {
  CRITICAL: 'IMMEDIATE ACTION REQUIRED',
  HIGH: 'High Priority - Action Needed',
  MEDIUM: 'Monitor Closely',
  LOW: 'Acceptable Risk'
}

export const ALERT_COLORS = {
  CRITICAL: 'risk-critical',
  HIGH: 'risk-high',
  MEDIUM: 'risk-medium',
  LOW: 'risk-low'
}
