import { useRecoilState } from 'recoil'
import { loadingState } from '@/store/loading'
import { useCallback } from 'react'

const useLoading = () => {
  const [isLoading, setLoading] = useRecoilState(loadingState)

  const hideLoading = useCallback(() => {
    setLoading(false)
  }, [setLoading])

  const showLoading = useCallback(() => {
    setLoading(true)
  }, [setLoading])

  return {
    isLoading,
    showLoading,
    hideLoading,
  }
}

export default useLoading
