export interface RiskLevel {
  id: number
  name: string
  weight: number
  color: string
  description: string
}

export interface Risk {
  id: string
  code: string
  title: string
  description: string
  probability: RiskLevel
  frequencyDescription: string
  impact: RiskLevel
  impactDescription: string
  impactWeight: number
  riskScore: number
  riskLevel: RiskLevel
  createdAt: Date
  updatedAt: Date
}

export interface RiskFormData {
  code: string
  title: string
  description: string
  probabilityId: number
  frequencyDescription: string
  impactId: number
  impactDescription: string
  impactWeight: number
}

export interface RiskStatistics {
  totalRisks: number
  criticalRisks: number
  highRisks: number
  mediumRisks: number
  lowRisks: number
  averageRiskScore: number
}

export interface RiskMatrixCell {
  probability: number
  impact: number
  riskScore: number
  riskLevel: string
  count: number
}
