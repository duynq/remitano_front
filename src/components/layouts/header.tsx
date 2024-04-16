import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { $api } from '@/apis'
import { userAuth, userInfo, messageContent } from '@/store'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { AxiosResponse } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { userRequestEmptyValue } from '@/constants/user'
import { USER_AUTH_KEY } from '@/constants'
import { AccountUserRequest, AccountLoginResponse } from '@/types/user'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const router = useRouter()
  const setUserAuth = useSetRecoilState(userAuth)
  const setUserInfo = useSetRecoilState(userInfo)
  const setMessage = useSetRecoilState(messageContent)
  const userInfodata = useRecoilValue(userInfo)
  const [email, setEmail] = useState('')
  const [userRequest, setUserRequest] = useState<AccountUserRequest>(
    userRequestEmptyValue
  )

  useEffect(() => {
    setEmail(userInfodata?.email)
  }, [userInfodata])

  const handleRegisterResponse = (
    response: AxiosResponse<AccountLoginResponse>,
  ) => {
    const userAuth = {
      token: response?.data?.token
    }

    const userInfo = userAuth?.token ? jwtDecode(userAuth.token) : null

    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(userAuth))
    setUserAuth(userAuth)
    setUserInfo(userInfo)
    router.push('/')
  }

  const handleSetUserRequest = <T extends keyof AccountUserRequest>(
    key: T,
    value: AccountUserRequest[T],
  ) => {
    setUserRequest({
      ...userRequest,
      [key]: value,
    })
  }

  const registerOrLogin = async (data: AccountUserRequest, type: string) => {
    try {
      if (['login', 'register'].indexOf(type) === -1) return console.log('Invalid type')

      const res = type === 'login' ? await $api.user.userLogin.login(data) : await $api.user.registration.register(data)
      handleRegisterResponse(res)
      setMessage('')
    } catch (error) {
      if (type === 'login') {
        setMessage((error as any)?.response?.data?.error)
      } else {
        setMessage((error as any)?.response?.data?.detail?.email[0])
      }
    }
  }

  const handleLoginOrSignUp = (event: any, type: string) => {
    event.preventDefault()

    userRequest.email && registerOrLogin(userRequest, type)
  }

  const handleLogout = () => {
    localStorage.removeItem(USER_AUTH_KEY)
    setUserAuth(null)
    setUserInfo(null)
    router.push('/')
  }

  const renderLoginOrSignUp = () => {
    return (
      <>
        <input
          type="email"
          placeholder="Email"
          value={userRequest?.email}
          className='form-control'
          onChange={(e) => handleSetUserRequest('email', e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={userRequest?.password}
          onChange={(e) => handleSetUserRequest('password', e.target.value)}
        />
        <button onClick={(e) => handleLoginOrSignUp(e, 'login') } >Login</button>
        <button className='ml-5' onClick={ (e) => handleLoginOrSignUp(e, 'register') }>Register</button>
      </>
    )
  }

  const renderLogout = () => {
    return (
      <>
        <h3 className='mr-5'>Welcome {email}</h3>
        <button className='mr-5' onClick={() => router.push('/share')}>Share a movie</button>
        <button onClick={handleLogout}>Logout</button>
      </>
    )
  }

  return (
    <div className="flex justify-between mb-32">
      <h1 className='cursor-pointer' onClick={() => router.push('/')} >{title}</h1>
      
      <div className="flex justify-between">
        { email ? renderLogout() : renderLoginOrSignUp() }
      </div>
    </div>
  );
}

export default Header;
