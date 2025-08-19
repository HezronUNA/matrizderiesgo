'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Risk } from '@/types/risk'
import { RISK_CLASSIFICATIONS, ALERT_MESSAGES, ALERT_COLORS } from '@/lib/constants'
import { AlertTriangle, TrendingUp, Shield, Activity } from 'lucide-react'

interface RiskAnalysisProps {
  risks: Risk[]
}

export function RiskAnalysis({ risks }: RiskAnalysisProps) {
  const [selectedRiskCode, setSelectedRiskCode] = useState<string>('')

  const selectedRisk = risks.find(risk => risk.code === selectedRiskCode)

  function getRiskLevelClass(riskScore: number): string {
    if (riskScore >= RISK_CLASSIFICATIONS.CRITICAL.min && riskScore <= RISK_CLASSIFICATIONS.CRITICAL.max) {
      return ALERT_COLORS.CRITICAL
    } else if (riskScore >= RISK_CLASSIFICATIONS.HIGH.min && riskScore <= RISK_CLASSIFICATIONS.HIGH.max) {
      return ALERT_COLORS.HIGH
    } else if (riskScore >= RISK_CLASSIFICATIONS.MEDIUM.min && riskScore <= RISK_CLASSIFICATIONS.MEDIUM.max) {
      return ALERT_COLORS.MEDIUM
    } else {
      return ALERT_COLORS.LOW
    }
  }

  function getRiskLevelLabel(riskScore: number): string {
    if (riskScore >= RISK_CLASSIFICATIONS.CRITICAL.min && riskScore <= RISK_CLASSIFICATIONS.CRITICAL.max) {
      return RISK_CLASSIFICATIONS.CRITICAL.label
    } else if (riskScore >= RISK_CLASSIFICATIONS.HIGH.min && riskScore <= RISK_CLASSIFICATIONS.HIGH.max) {
      return RISK_CLASSIFICATIONS.HIGH.label
    } else if (riskScore >= RISK_CLASSIFICATIONS.MEDIUM.min && riskScore <= RISK_CLASSIFICATIONS.MEDIUM.max) {
      return RISK_CLASSIFICATIONS.MEDIUM.label
    } else {
      return RISK_CLASSIFICATIONS.LOW.label
    }
  }

  function getAlertMessage(riskScore: number): string {
    if (riskScore >= RISK_CLASSIFICATIONS.CRITICAL.min && riskScore <= RISK_CLASSIFICATIONS.CRITICAL.max) {
      return ALERT_MESSAGES.CRITICAL
    } else if (riskScore >= RISK_CLASSIFICATIONS.HIGH.min && riskScore <= RISK_CLASSIFICATIONS.HIGH.max) {
      return ALERT_MESSAGES.HIGH
    } else if (riskScore >= RISK_CLASSIFICATIONS.MEDIUM.min && riskScore <= RISK_CLASSIFICATIONS.MEDIUM.max) {
      return ALERT_MESSAGES.MEDIUM
    } else {
      return ALERT_MESSAGES.LOW
    }
  }

  return (
    <div className="space-y-6">
      {/* Risk Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            Risk Analysis Dashboard
          </CardTitle>
          <CardDescription>
            Select a risk to view detailed analysis and statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="risk-selector">Select Risk</Label>
              <Select
                id="risk-selector"
                value={selectedRiskCode}
                onChange={(e) => setSelectedRiskCode(e.target.value)}
              >
                <option value="">Choose a risk to analyze...</option>
                {risks.map((risk) => (
                  <option key={risk.id} value={risk.code}>
                    {risk.code} - {risk.title}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Risk Analysis */}
      {selectedRisk && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-cyan-600" />
                Risk Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Risk Code</Label>
                  <p className="text-lg font-semibold text-gray-900">{selectedRisk.code}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Risk Level</Label>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getRiskLevelClass(selectedRisk.riskScore)}`}>
                    {getRiskLevelLabel(selectedRisk.riskScore)}
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Title</Label>
                <p className="text-lg font-semibold text-gray-900">{selectedRisk.title}</p>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Description</Label>
                <p className="text-gray-700">{selectedRisk.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Risk Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-sky-600" />
                Risk Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Label className="text-sm font-medium text-gray-600">Probability</Label>
                  <p className="text-2xl font-bold text-blue-600">{selectedRisk.probability.weight}</p>
                  <p className="text-sm text-gray-600">{selectedRisk.probability.name}</p>
                </div>
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <Label className="text-sm font-medium text-gray-600">Impact</Label>
                  <p className="text-2xl font-bold text-cyan-600">{selectedRisk.impact.weight}</p>
                  <p className="text-sm text-gray-600">{selectedRisk.impact.name}</p>
                </div>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg">
                <Label className="text-sm font-medium text-gray-600">Risk Score</Label>
                <p className="text-4xl font-bold text-blue-700">{selectedRisk.riskScore}</p>
                <p className="text-sm text-gray-600">Probability × Impact</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Risk Alert */}
      {selectedRisk && (
        <Card className={`${getRiskLevelClass(selectedRisk.riskScore)} text-white`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-bold">{getAlertMessage(selectedRisk.riskScore)}</h3>
                <p className="text-blue-100">
                  Risk {selectedRisk.code} requires {getRiskLevelLabel(selectedRisk.riskScore).toLowerCase()} attention
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Details */}
      {selectedRisk && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequency & Impact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Frequency Description</Label>
                <p className="text-gray-700">{selectedRisk.frequencyDescription}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Impact Description</Label>
                <p className="text-gray-700">{selectedRisk.impactDescription}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Impact Weight</Label>
                <p className="text-lg font-semibold text-gray-900">{selectedRisk.impactWeight}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Created</Label>
                <p className="text-gray-700">{selectedRisk.createdAt.toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Last Updated</Label>
                <p className="text-gray-700">{selectedRisk.updatedAt.toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
