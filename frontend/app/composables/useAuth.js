import { ref } from 'vue'

export const useAuth = () => {
  const user = ref(null)
  const error = ref(null)

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        user.value = data.user
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      error.value = err.message
    }
  }

  const signup = async (email, password) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        user.value = data.user
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      error.value = err.message
    }
  }

  const loginWithGoogle = async () => {
    try {
      const googleUser = await new Promise((resolve, reject) => {
        $gAuth.signIn((user) => {
          resolve(user)
        }, (error) => {
          reject(error)
        })
      })
      
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token: googleUser.getAuthResponse().id_token 
        })
      })
      const data = await response.json()
      if (response.ok) {
        user.value = data.user
      } else {
        throw new Error(data.message)
      }
    } catch (err) {
      error.value = err.message
    }
  }

  return {
    user,
    error,
    login,
    signup,
    loginWithGoogle
  }
}