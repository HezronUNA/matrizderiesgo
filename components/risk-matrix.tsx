'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Risk } from '@/types/risk'
import { RISK_CLASSIFICATIONS } from '@/lib/constants'
import { Grid3X3, AlertTriangle, Shield, TrendingUp } from 'lucide-react'

interface RiskMatrixProps {
  risks: Risk[]
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  // Create 5x5 matrix (probability vs impact)
  const matrix = Array(5).fill(null).map(() => Array(5).fill(0))
  
  // Populate matrix with risk counts
  risks.forEach(risk => {
    const probIndex = risk.probability.weight - 1
    const impactIndex = risk.impact.weight - 1
    matrix[probIndex][impactIndex]++
  })

  function getCellColor(probability: number, impact: number): string {
    const riskScore = probability * impact
    
    if (riskScore >= RISK_CLASSIFICATIONS.CRITICAL.min && riskScore <= RISK_CLASSIFICATIONS.CRITICAL.max) {
      return 'bg-gradient-to-br from-red-500 to-blue-600'
    } else if (riskScore >= RISK_CLASSIFICATIONS.HIGH.min && riskScore <= RISK_CLASSIFICATIONS.HIGH.max) {
      return 'bg-gradient-to-br from-orange-500 to-blue-600'
    } else if (riskScore >= RISK_CLASSIFICATIONS.MEDIUM.min && riskScore <= RISK_CLASSIFICATIONS.MEDIUM.max) {
      return 'bg-gradient-to-br from-yellow-500 to-blue-600'
    } else {
      return 'bg-gradient-to-br from-green-500 to-blue-600'
    }
  }

  function getCellTextColor(probability: number, impact: number): string {
    const riskScore = probability * impact
    
    if (riskScore >= RISK_CLASSIFICATIONS.CRITICAL.min && riskScore <= RISK_CLASSIFICATIONS.CRITICAL.max) {
      return 'text-white'
    } else if (riskScore >= RISK_CLASSIFICATIONS.HIGH.min && riskScore <= RISK_CLASSIFICATIONS.HIGH.max) {
      return 'text-white'
    } else if (riskScore >= RISK_CLASSIFICATIONS.MEDIUM.min && riskScore <= RISK_CLASSIFICATIONS.MEDIUM.max) {
      return 'text-gray-800'
    } else {
      return 'text-gray-800'
    }
  }

  function getRiskLevel(probability: number, impact: number): string {
    const riskScore = probability * impact
    
    if (riskScore >= RISK_CLASSIFICATIONS.CRITICAL.min && riskScore <= RISK_CLASSIFICATIONS.CRITICAL.max) {
      return 'Critical'
    } else if (riskScore >= RISK_CLASSIFICATIONS.HIGH.min && riskScore <= RISK_CLASSIFICATIONS.HIGH.max) {
      return 'High'
    } else if (riskScore >= RISK_CLASSIFICATIONS.MEDIUM.min && riskScore <= RISK_CLASSIFICATIONS.MEDIUM.max) {
      return 'Medium'
    } else {
      return 'Low'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Grid3X3 className="h-6 w-6 text-blue-600" />
          Risk Matrix Visualization
        </CardTitle>
        <CardDescription>
          Probability vs Impact matrix showing risk distribution and severity levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Matrix */}
          <div className="relative">
            {/* Column Headers (Impact) */}
            <div className="flex justify-end mb-2">
              <div className="w-20"></div>
              {[1, 2, 3, 4, 5].map((impact) => (
                <div key={impact} className="w-20 text-center text-sm font-medium text-gray-600">
                  Impact {impact}
                </div>
              ))}
            </div>
            
            {/* Matrix Rows */}
            {matrix.map((row, probIndex) => (
              <div key={probIndex} className="flex items-center">
                {/* Row Header (Probability) */}
                <div className="w-20 text-sm font-medium text-gray-600">
                  Prob {probIndex + 1}
                </div>
                
                {/* Matrix Cells */}
                {row.map((count, impactIndex) => {
                  const probability = probIndex + 1
                  const impact = impactIndex + 1
                  const riskScore = probability * impact
                  
                  return (
                    <div
                      key={`${probIndex}-${impactIndex}`}
                      className={`w-20 h-20 border border-gray-200 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 ${getCellColor(probability, impact)}`}
                      title={`Probability: ${probability}, Impact: ${impact}, Risk Score: ${riskScore}, Level: ${getRiskLevel(probability, impact)}`}
                    >
                      <div className={`text-xs font-bold ${getCellTextColor(probability, impact)}`}>
                        {riskScore}
                      </div>
                      <div className={`text-xs ${getCellTextColor(probability, impact)}`}>
                        {count > 0 ? `${count} risk${count > 1 ? 's' : ''}` : ''}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-blue-600 rounded"></div>
              <span className="text-sm text-gray-600">Critical (21-25)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-blue-600 rounded"></div>
              <span className="text-sm text-gray-600">High (16-20)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-blue-600 rounded"></div>
              <span className="text-sm text-gray-600">Medium (6-15)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-blue-600 rounded"></div>
              <span className="text-sm text-gray-600">Low (1-5)</span>
            </div>
          </div>

          {/* Matrix Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {risks.filter(r => r.riskScore >= RISK_CLASSIFICATIONS.CRITICAL.min && r.riskScore <= RISK_CLASSIFICATIONS.CRITICAL.max).length}
              </div>
              <div className="text-sm text-gray-600">Critical Risks</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {risks.filter(r => r.riskScore >= RISK_CLASSIFICATIONS.HIGH.min && r.riskScore <= RISK_CLASSIFICATIONS.HIGH.max).length}
              </div>
              <div className="text-sm text-gray-600">High Risks</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {risks.filter(r => r.riskScore >= RISK_CLASSIFICATIONS.MEDIUM.min && r.riskScore <= RISK_CLASSIFICATIONS.MEDIUM.max).length}
              </div>
              <div className="text-sm text-gray-600">Medium Risks</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {risks.filter(r => r.riskScore >= RISK_CLASSIFICATIONS.LOW.min && r.riskScore <= RISK_CLASSIFICATIONS.LOW.max).length}
              </div>
              <div className="text-sm text-gray-600">Low Risks</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
