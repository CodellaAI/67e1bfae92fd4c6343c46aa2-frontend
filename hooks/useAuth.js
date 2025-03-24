
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  // Check if user is logged in on initial render
  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get('token')
      
      if (token) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          
          setUser(response.data)
        } catch (error) {
          console.error('Auth check failed', error)
          Cookies.remove('token')
        }
      }
      
      setLoading(false)
    }
    
    checkAuth()
  }, [])
  
  const login = async (email, password) => {
    try {
      setLoading(true)
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        email,
        password
      })
      
      const { token, user } = response.data
      
      // Set cookie
      Cookies.set('token', token, { expires: 7 })
      
      // Update state
      setUser(user)
      
      toast.success('Logged in successfully')
      
      return true
    } catch (error) {
      console.error('Login failed', error)
      toast.error(error.response?.data?.message || 'Login failed')
      return false
    } finally {
      setLoading(false)
    }
  }
  
  const register = async (userData) => {
    try {
      setLoading(true)
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, userData)
      
      toast.success('Registration successful. Please log in.')
      
      return true
    } catch (error) {
      console.error('Registration failed', error)
      toast.error(error.response?.data?.message || 'Registration failed')
      return false
    } finally {
      setLoading(false)
    }
  }
  
  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    toast.success('Logged out successfully')
    router.push('/')
  }
  
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
