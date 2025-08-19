'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RISK_LEVELS } from '@/lib/constants'
import { RiskFormData } from '@/types/risk'
import { Shield, AlertTriangle, Plus } from 'lucide-react'

interface RiskFormProps {
  onSubmit: (data: RiskFormData) => void
  existingRisks: any[]
}

export function RiskForm({ onSubmit, existingRisks }: RiskFormProps) {
  const [formData, setFormData] = useState<RiskFormData>({
    code: '',
    title: '',
    description: '',
    probabilityId: 3,
    frequencyDescription: '',
    impactId: 3,
    impactDescription: '',
    impactWeight: 3
  })

  const [errors, setErrors] = useState<Partial<RiskFormData>>({})

  function handleInputChange(field: keyof RiskFormData, value: string | number) {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  function validateForm(): boolean {
    const newErrors: Partial<RiskFormData> = {}

    if (!formData.code.trim()) {
      newErrors.code = 'Risk code is required'
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Risk title is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Risk description is required'
    }
    if (!formData.frequencyDescription.trim()) {
      newErrors.frequencyDescription = 'Frequency description is required'
    }
    if (!formData.impactDescription.trim()) {
      newErrors.impactDescription = 'Impact description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
      setFormData({
        code: '',
        title: '',
        description: '',
        probabilityId: 3,
        frequencyDescription: '',
        impactId: 3,
        impactDescription: '',
        impactWeight: 3
      })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="gradient-bg text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8" />
          <div>
            <CardTitle>Risk Registration</CardTitle>
            <CardDescription className="text-blue-100">
              Register new cybersecurity risks for assessment and management
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Risk Code */}
            <div className="space-y-2">
              <Label htmlFor="code">Risk Code *</Label>
              <Input
                id="code"
                placeholder="e.g., R001, R002"
                value={formData.code}
                onChange={(e) => handleInputChange('code', e.target.value)}
                className={errors.code ? 'border-red-500' : ''}
              />
              {errors.code && (
                <p className="text-sm text-red-600">{errors.code}</p>
              )}
            </div>

            {/* Risk Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Identified Risk *</Label>
              <Input
                id="title"
                placeholder="Risk name/title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title}</p>
              )}
            </div>
          </div>

          {/* Risk Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Risk Description *</Label>
            <Textarea
              id="description"
              placeholder="Detailed explanation of the risk"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Probability Scale */}
            <div className="space-y-2">
              <Label htmlFor="probability">Probability Scale *</Label>
              <Select
                id="probability"
                value={formData.probabilityId}
                onChange={(e) => handleInputChange('probabilityId', parseInt(e.target.value))}
              >
                {RISK_LEVELS.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name} ({level.weight}) - {level.description}
                  </option>
                ))}
              </Select>
            </div>

            {/* Frequency Description */}
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency Description *</Label>
              <Input
                id="frequency"
                placeholder="How often this risk occurs"
                value={formData.frequencyDescription}
                onChange={(e) => handleInputChange('frequencyDescription', e.target.value)}
                className={errors.frequencyDescription ? 'border-red-500' : ''}
              />
              {errors.frequencyDescription && (
                <p className="text-sm text-red-600">{errors.frequencyDescription}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Impact Scale */}
            <div className="space-y-2">
              <Label htmlFor="impact">Impact Scale *</Label>
              <Select
                id="impact"
                value={formData.impactId}
                onChange={(e) => handleInputChange('impactId', parseInt(e.target.value))}
              >
                {RISK_LEVELS.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name} ({level.weight}) - {level.description}
                  </option>
                ))}
              </Select>
            </div>

            {/* Impact Weight */}
            <div className="space-y-2">
              <Label htmlFor="impactWeight">Impact Weight *</Label>
              <Select
                id="impactWeight"
                value={formData.impactWeight}
                onChange={(e) => handleInputChange('impactWeight', parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((weight) => (
                  <option key={weight} value={weight}>
                    {weight}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Impact Description */}
          <div className="space-y-2">
            <Label htmlFor="impactDescription">Impact Description *</Label>
            <Textarea
              id="impactDescription"
              placeholder="Detailed description of the impact"
              value={formData.impactDescription}
              onChange={(e) => handleInputChange('impactDescription', e.target.value)}
              className={errors.impactDescription ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.impactDescription && (
              <p className="text-sm text-red-600">{errors.impactDescription}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="gradient-bg hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Register Risk
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
