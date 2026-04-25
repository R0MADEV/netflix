import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter()

  //cookies save
  const setCookie = (key, value) => {
    if (getCookie('id') == null) {
      document.cookie = key + '=' + value + '; Path=/;'
    }
    if (getCookie('type') == null) {
      document.cookie = key + '=' + value + '; Path=/;'
    } else {
      document.cookie = key + '=' + value + '; Path=/;'
    }
  }

  //cookie getdata
  function getCookie (name) {
    if (typeof window !== 'undefined') {
      var value = '; ' + document.cookie
      var parts = value.split('; ' + name + '=')
      if (parts.length >= 2)
        return parts
          .pop()
          .split(';')
          .shift()
    }
  }

  //cookie delete
  const deleteCookie = name => {
    if (getCookie('id')) {
      document.cookie =
        name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
    if (getCookie('type')) {
      document.cookie =
        name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
  }

  //Get user data
  const { data: user, error, mutate } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then(res => {
        const userID = res.data.id
        const roleTYpe = res.data.role
        setCookie('id', userID)
        setCookie('type', roleTYpe)
        return res.data
      })
      .catch(error => {
        if (error.response.status !== 409) throw error

        router.push('/verify-email')
      }),
  )

  const csrf = () => axios.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, ...props }) => {
    await csrf()

    setErrors([])

    axios
      .post('/register', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/login', props)
      .then(res => {
        localStorage.setItem('auth_token', res.data.data.token)
        mutate()
      })
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/forgot-password', { email })
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/reset-password', { token: router.query.token, ...props })
      .then(response =>
        router.push('/login?reset=' + btoa(response.data.status)),
      )
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(Object.values(error.response.data.errors).flat())
      })
  }

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post('/email/verification-notification')
      .then(response => setStatus(response.data.status))
  }

  const logout = async () => {
    deleteCookie('id')
    deleteCookie('type')
    deleteCookie('accountId')
    localStorage.removeItem('auth_token')
    if (!error) {
      await axios.post('/logout').then(() => {
        mutate()
      })
    }
    window.location.pathname = '/login'
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated)
    }
    if (middleware === 'auth' && error) {
      logout()
    }
  }, [user, error])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    //cookie
    setCookie,
    getCookie,
    deleteCookie,
  }
}
