
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isCartLoaded, setIsCartLoaded] = useState(false)
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error)
        setCartItems([])
      }
    }
    setIsCartLoaded(true)
  }, [])
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isCartLoaded) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isCartLoaded])
  
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id)
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        toast.success(`Updated quantity for ${product.name}`)
        return updatedItems
      } else {
        // Item doesn't exist, add new item
        toast.success(`Added ${product.name} to cart`)
        return [...prevItems, { ...product, quantity }]
      }
    })
  }
  
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const removedItem = prevItems.find(item => item.id === productId)
      const newItems = prevItems.filter(item => item.id !== productId)
      
      if (removedItem) {
        toast.success(`Removed ${removedItem.name} from cart`)
      }
      
      return newItems
    })
  }
  
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }
  
  const clearCart = () => {
    setCartItems([])
    toast.success('Cart cleared')
  }
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
  
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0)
  }
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
