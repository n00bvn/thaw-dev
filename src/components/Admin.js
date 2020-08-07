import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './admin/Dashboard'

export default function Admin() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  )
}
