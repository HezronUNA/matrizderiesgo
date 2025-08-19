'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, Plus, BarChart3, Grid3X3, Activity } from 'lucide-react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    {
      id: 'summary',
      label: 'Dashboard',
      icon: BarChart3,
      description: 'Overview and statistics'
    },
    {
      id: 'registration',
      label: 'Risk Registration',
      icon: Plus,
      description: 'Add new risks'
    },
    {
      id: 'analysis',
      label: 'Risk Analysis',
      icon: Activity,
      description: 'Detailed risk assessment'
    },
    {
      id: 'matrix',
      label: 'Risk Matrix',
      icon: Grid3X3,
      description: 'Visual risk mapping'
    }
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="gradient-bg p-2 rounded-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CyberRisk Manager</h1>
              <p className="text-sm text-gray-600">Cybersecurity Risk Management Dashboard</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <Button
                  key={tab.id}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 ${
                    isActive 
                      ? 'gradient-bg text-white shadow-md' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title={tab.description}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 border-t">
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <Button
                  key={tab.id}
                  variant={isActive ? 'default' : 'outline'}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex flex-col items-center gap-1 p-3 h-auto ${
                    isActive 
                      ? 'gradient-bg text-white' 
                      : 'text-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{tab.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
