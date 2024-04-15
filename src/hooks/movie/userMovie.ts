import { useEffect, useState, useRef, useCallback } from 'react'
import { $api } from '@/apis'
import handleError from '@/utils/handleError'
import { useRouter } from 'next/router'
import type { MovieResponse } from '@/types/movie'
import type { BasePagination } from '@/types/base'
import useLoading from './useLoading'

interface UseMovieProps {
  params?: Record<string, any>
  fetchImmidiately?: boolean
  hasLoading?: boolean
}

const useMovie = ({
  params = {},
  fetchImmidiately = true,
  hasLoading = true
}: UseMovieProps) => {
  const router = useRouter()
  const [movies, setMovies] = useState<MovieResponse[]>([])
  const [meta, setMeta] = useState<BasePagination | null>(null)
  const isMoviesInitialized = useRef(false)
  const { showLoading, hideLoading } = useLoading()

  const fetchMovies = useCallback(async () => {
    try {
      hasLoading && showLoading()
      const data = await $api.movie.getMovies(params)
      setMovies(data.movies)
      setMeta(data.meta)
    } catch (error) {
      handleError({ error })
    } finally {
      hasLoading && hideLoading()
    }
  }, [hasLoading, hideLoading, showLoading, params])

  const initMovies = useCallback(async () => {
    if (router.isReady && fetchImmidiately && !isMoviesInitialized.current) {
      await fetchMovies()
    }
    isMoviesInitialized.current = true
  }, [fetchImmidiately, fetchMovies, router.isReady])

  useEffect(() => {
    initMovies()
  }, [initMovies])

  useEffect(() => {
    if (isMoviesInitialized.current) {
      fetchMovies()
    }
  }, [fetchMovies])

  return {
    movies,
    meta,
    setMovies,
    fetchMovies
  }
}

export default useMovie
