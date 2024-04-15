import React, { useMemo } from 'react'
import {
  paginationGenerator,
  MORE_PAGE,
  getTotalPages,
} from '@/utils/pagination'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import { FIRST_PAGE } from '@/constants'

interface BasePaginationProps {
  currentPage: number
  totalCount: number
  per: number
  visibleLast?: boolean
  visibleFirst?: boolean
  offset?: number
  className?: string
  firstText?: string
  lastText?: string
  previousText?: string
  nextText?: string
  onChange?: (page: number) => void
}

type Page = {
  id: string
  name: string | number
  isDisabled: boolean
}

const BasePagination = ({
  currentPage,
  totalCount,
  per,
  className = '',
  firstText = 'First',
  lastText = 'Last',
  previousText = 'Previous',
  nextText = 'Next',
  visibleFirst = true,
  visibleLast = true,
  offset = 2,
  onChange = () => ({}),
}: BasePaginationProps) => {
  const totalPages = useMemo(() => {
    return getTotalPages(totalCount, per)
  }, [totalCount, per])

  const isInFirstPage = () => currentPage === FIRST_PAGE
  const isInLastPage = () => currentPage === totalPages

  const onClickFirstPage = () => onChange(FIRST_PAGE)
  const onClickPreviousPage = () => onChange(currentPage - 1)
  const onClickPage = (page: number) => onChange(page)
  const onClickNextPage = () => onChange(currentPage + 1)
  const onClickLastPage = () => onChange(totalPages)

  const isPageActive = (page: number) => currentPage === page

  const getPages = () => {
    const range = paginationGenerator(currentPage, totalPages, offset)

    const result: Page[] = []
    range.forEach((page) => {
      result.push({
        id: uuidv4(),
        name: page,
        isDisabled: page === currentPage,
      })
    })

    return result
  }

  if (totalCount === 0) return <></>

  const renderFirstButton = () => {
    return (
      <button
        className={clsx(
          styles.paginationPrev,
          isInFirstPage() && styles.isDisabled,
        )}
        onClick={onClickFirstPage}
      >
        {firstText}
      </button>
    )
  }

  const renderLastButton = () => {
    return (
      <button
        disabled={isInLastPage()}
        className={clsx(
          styles.paginationNext,
          isInLastPage() && styles.isDisabled,
        )}
        onClick={onClickLastPage}
      >
        {lastText}
      </button>
    )
  }

  const renderPreviousButton = () => {
    return (
      <button
        className={clsx(
          styles.paginationPrev,
          isInFirstPage() && styles.isDisabled,
        )}
        onClick={onClickPreviousPage}
      >
        {previousText}
      </button>
    )
  }

  const renderNextButton = () => {
    return (
      <button
        className={clsx(
          styles.paginationNext,
          isInLastPage() && styles.isDisabled,
        )}
        onClick={onClickNextPage}
      >
        {nextText}
      </button>
    )
  }

  const renderNumberButtons = () => {
    return (
      <>
        {getPages().map((page) => (
          <React.Fragment key={page.id}>
            {page.name === MORE_PAGE ? (
              <span className={clsx(styles.paginationOmit)}>…</span>
            ) : (
              <button
                disabled={page.isDisabled}
                className={clsx(
                  styles.paginationNum,
                  isPageActive(page.name as number) && styles.isCurrent,
                )}
                onClick={() => onClickPage(page.name as number)}
              >
                {page.name}
              </button>
            )}
          </React.Fragment>
        ))}
      </>
    )
  }

  return (
    <div className={clsx(styles.pagination, className)}>
      {visibleFirst && renderFirstButton()}
      {renderPreviousButton()}
      {renderNumberButtons()}
      {renderNextButton()}
      {visibleLast && renderLastButton()}
    </div>
  )
}

export default BasePagination
