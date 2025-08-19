'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { RiskForm } from '@/components/risk-form'
import { RiskAnalysis } from '@/components/risk-analysis'
import { RiskMatrix } from '@/components/risk-matrix'
import { RiskSummary } from '@/components/risk-summary'
import { Risk, RiskFormData } from '@/types/risk'
import { getRiskLevelById, calculateRiskScore, classifyRiskLevel } from '@/lib/utils'
import { RISK_LEVELS } from '@/lib/constants'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('summary')
  const [risks, setRisks] = useState<Risk[]>([])

  // Load sample data on component mount
  useEffect(() => {
    const sampleRisks: Risk[] = [
      {
        id: '1',
        code: 'R001',
        title: 'SQL Injection Attack',
        description: 'Vulnerability in web application allowing malicious SQL queries to be executed against the database.',
        probability: getRiskLevelById(4)!,
        frequencyDescription: 'Weekly attempts detected',
        impact: getRiskLevelById(5)!,
        impactDescription: 'Complete database compromise, data breach, regulatory fines',
        impactWeight: 5,
        riskScore: 20,
        riskLevel: getRiskLevelById(4)!,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        code: 'R002',
        title: 'Phishing Campaign',
        description: 'Targeted email attacks attempting to steal credentials and install malware.',
        probability: getRiskLevelById(5)!,
        frequencyDescription: 'Daily phishing attempts',
        impact: getRiskLevelById(4)!,
        impactDescription: 'Credential theft, unauthorized access, data exfiltration',
        impactWeight: 4,
        riskScore: 20,
        riskLevel: getRiskLevelById(4)!,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: '3',
        code: 'R003',
        title: 'Ransomware Attack',
        description: 'Malware that encrypts critical business data and demands payment for decryption.',
        probability: getRiskLevelById(3)!,
        frequencyDescription: 'Monthly threat intelligence reports',
        impact: getRiskLevelById(5)!,
        impactDescription: 'Business disruption, data loss, financial impact',
        impactWeight: 5,
        riskScore: 15,
        riskLevel: getRiskLevelById(3)!,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      },
      {
        id: '4',
        code: 'R004',
        title: 'Insider Threat',
        description: 'Malicious or negligent actions by employees with authorized access to systems.',
        probability: getRiskLevelById(2)!,
        frequencyDescription: 'Quarterly incidents',
        impact: getRiskLevelById(4)!,
        impactDescription: 'Data theft, intellectual property loss, reputational damage',
        impactWeight: 4,
        riskScore: 8,
        riskLevel: getRiskLevelById(2)!,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '5',
        code: 'R005',
        title: 'DDoS Attack',
        description: 'Distributed denial of service attacks targeting network infrastructure.',
        probability: getRiskLevelById(4)!,
        frequencyDescription: 'Weekly attack attempts',
        impact: getRiskLevelById(3)!,
        impactDescription: 'Service disruption, temporary unavailability',
        impactWeight: 3,
        riskScore: 12,
        riskLevel: getRiskLevelById(3)!,
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
      }
    ]

    // Calculate risk scores and levels for sample data
    const calculatedRisks = sampleRisks.map(risk => {
      const riskScore = calculateRiskScore(risk.probability.weight, risk.impact.weight)
      const riskLevelName = classifyRiskLevel(riskScore)
      const riskLevel = RISK_LEVELS.find(level => level.name === riskLevelName) || getRiskLevelById(3)!
      
      return {
        ...risk,
        riskScore,
        riskLevel
      }
    })

    setRisks(calculatedRisks)
  }, [])

  function handleRiskSubmit(formData: RiskFormData) {
    const probability = getRiskLevelById(formData.probabilityId)!
    const impact = getRiskLevelById(formData.impactId)!
    const riskScore = calculateRiskScore(probability.weight, impact.weight)
    const riskLevelName = classifyRiskLevel(riskScore)
    const riskLevel = RISK_LEVELS.find(level => level.name === riskLevelName) || getRiskLevelById(3)!

    const newRisk: Risk = {
      id: Date.now().toString(),
      code: formData.code,
      title: formData.title,
      description: formData.description,
      probability,
      frequencyDescription: formData.frequencyDescription,
      impact,
      impactDescription: formData.impactDescription,
      impactWeight: formData.impactWeight,
      riskScore,
      riskLevel,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setRisks(prev => [...prev, newRisk])
    setActiveTab('summary')
  }

  function renderActiveTab() {
    switch (activeTab) {
      case 'summary':
        return <RiskSummary risks={risks} />
      case 'registration':
        return <RiskForm onSubmit={handleRiskSubmit} existingRisks={risks} />
      case 'analysis':
        return <RiskAnalysis risks={risks} />
      case 'matrix':
        return <RiskMatrix risks={risks} />
      default:
        return <RiskSummary risks={risks} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </main>
    </div>
  )
}
