import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
export const RegisterPage = () => {
  const { isSigningUp, register,checkAuth } = useAuthStore();
    checkAuth();
  return (
    <div>Register</div>
  )
}
