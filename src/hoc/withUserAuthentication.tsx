import type { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { userAuth } from '@/store'
import { useRecoilValue } from 'recoil'
import { useEffect } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  isIndexBoxAllowed?: boolean
}

const withUserAuthentication = <P extends object>(
  Component: React.ComponentType<P>,
): NextPageWithLayout<P> => {
  return (props: P) => {
    const userAuthLocal = useRecoilValue(userAuth)
    const router = useRouter()

    useEffect(() => {
      if (!userAuthLocal) router.push('/')
    }, [userAuthLocal])

    return <Component {...props} />
  }
}

export default withUserAuthentication
