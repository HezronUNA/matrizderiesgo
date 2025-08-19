'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Risk } from '@/types/risk'
import { RISK_CLASSIFICATIONS, ALERT_COLORS } from '@/lib/constants'
import { calculateRiskStatistics, getWorstRisks } from '@/lib/utils'
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Filter,
  Eye,
  EyeOff
} from 'lucide-react'

interface RiskSummaryProps {
  risks: Risk[]
}

export function RiskSummary({ risks }: RiskSummaryProps) {
  const [showWorstRisks, setShowWorstRisks] = useState(false)
  const [showAllRisks, setShowAllRisks] = useState(true)

  const statistics = calculateRiskStatistics(risks)
  const worstRisks = getWorstRisks(risks)
  const displayedRisks = showWorstRisks ? worstRisks : risks

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

  return (
    <div className="space-y-6">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Risks</p>
                <p className="text-2xl font-bold text-blue-900">{statistics.totalRisks}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Critical Risks</p>
                <p className="text-2xl font-bold text-red-900">{statistics.criticalRisks}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">High Risks</p>
                <p className="text-2xl font-bold text-orange-900">{statistics.highRisks}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-600">Avg Risk Score</p>
                <p className="text-2xl font-bold text-cyan-900">{statistics.averageRiskScore}</p>
              </div>
              <Shield className="h-8 w-8 text-cyan-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Risk Filtering
          </CardTitle>
          <CardDescription>
            Filter and view risks based on severity levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={showAllRisks ? 'default' : 'outline'}
              onClick={() => {
                setShowAllRisks(true)
                setShowWorstRisks(false)
              }}
              className="gradient-bg hover:opacity-90"
            >
              <Eye className="h-4 w-4 mr-2" />
              All Risks ({risks.length})
            </Button>
            <Button
              variant={showWorstRisks ? 'default' : 'outline'}
              onClick={() => {
                setShowWorstRisks(true)
                setShowAllRisks(false)
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Worst Risks ({worstRisks.length})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedRisks.map((risk) => (
          <Card key={risk.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{risk.code}</CardTitle>
                  <CardDescription className="line-clamp-2">{risk.title}</CardDescription>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getRiskLevelClass(risk.riskScore)}`}>
                  {getRiskLevelLabel(risk.riskScore)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Probability:</span>
                  <span className="font-medium">{risk.probability.weight} ({risk.probability.name})</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Impact:</span>
                  <span className="font-medium">{risk.impact.weight} ({risk.impact.name})</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Risk Score:</span>
                  <span className="font-bold text-lg text-blue-600">{risk.riskScore}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-600 line-clamp-2">{risk.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Risks Message */}
      {displayedRisks.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No risks found</h3>
            <p className="text-gray-500">
              {showWorstRisks 
                ? 'No high or critical risks found. All risks are at acceptable levels.'
                : 'No risks have been registered yet. Start by adding some risks using the registration form.'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
