import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Risk, RiskLevel } from '@/types/risk'
import { RISK_CLASSIFICATIONS, RISK_LEVELS } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateRiskScore(probabilityWeight: number, impactWeight: number): number {
  return probabilityWeight * impactWeight
}

export function classifyRiskLevel(riskScore: number): string {
  if (riskScore >= RISK_CLASSIFICATIONS.CRITICAL.min && riskScore <= RISK_CLASSIFICATIONS.CRITICAL.max) {
    return 'CRITICAL'
  } else if (riskScore >= RISK_CLASSIFICATIONS.HIGH.min && riskScore <= RISK_CLASSIFICATIONS.HIGH.max) {
    return 'HIGH'
  } else if (riskScore >= RISK_CLASSIFICATIONS.MEDIUM.min && riskScore <= RISK_CLASSIFICATIONS.MEDIUM.max) {
    return 'MEDIUM'
  } else {
    return 'LOW'
  }
}

export function getRiskLevelById(id: number): RiskLevel | undefined {
  return RISK_LEVELS.find(level => level.id === id)
}

export function generateRiskCode(risks: Risk[]): string {
  const existingCodes = risks.map(risk => parseInt(risk.code.replace('R', '')))
  const nextNumber = existingCodes.length > 0 ? Math.max(...existingCodes) + 1 : 1
  return `R${nextNumber.toString().padStart(3, '0')}`
}

export function calculateRiskStatistics(risks: Risk[]) {
  const totalRisks = risks.length
  const criticalRisks = risks.filter(risk => risk.riskLevel.name === 'Critical Risk').length
  const highRisks = risks.filter(risk => risk.riskLevel.name === 'High Risk').length
  const mediumRisks = risks.filter(risk => risk.riskLevel.name === 'Medium Risk').length
  const lowRisks = risks.filter(risk => risk.riskLevel.name === 'Low Risk').length
  const averageRiskScore = totalRisks > 0 ? risks.reduce((sum, risk) => sum + risk.riskScore, 0) / totalRisks : 0

  return {
    totalRisks,
    criticalRisks,
    highRisks,
    mediumRisks,
    lowRisks,
    averageRiskScore: Math.round(averageRiskScore * 100) / 100
  }
}

export function getWorstRisks(risks: Risk[]): Risk[] {
  return risks.filter(risk => 
    risk.riskLevel.name === 'Critical Risk' || risk.riskLevel.name === 'High Risk'
  ).sort((a, b) => b.riskScore - a.riskScore)
}
