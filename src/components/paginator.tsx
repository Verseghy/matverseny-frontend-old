import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { createContext, useCallback, useContext, useState } from 'react'
import Button from './button'
import styles from '../styles/paginator.module.scss'
import { useRecoilValue } from 'recoil'
import { problemsLength, pageSize } from '../state/problems'

export interface PaginatorProps {
  onPageSwitch: (page: number) => void
}

interface PaginatorContextType {
  currentPage: number
  lastPage: number
  pageSwitch: (diff: number) => void
}

const PaginatorContext = createContext<PaginatorContextType | null>(null)

export const Paginator: React.FC<PaginatorProps> = ({ onPageSwitch, children }) => {
  const totalItems = useRecoilValue(problemsLength)
  const [currentPage, setCurrentPage] = useState(1)
  const lastPage = Math.ceil(totalItems / pageSize)

  const pageSwitch = useCallback(
    (diff: number) => {
      const nextPage = currentPage + diff
      setCurrentPage(nextPage)
      onPageSwitch(nextPage)
    },
    [currentPage, onPageSwitch]
  )

  return (
    <PaginatorContext.Provider value={{ currentPage, lastPage, pageSwitch }}>
      {children}
    </PaginatorContext.Provider>
  )
}

export const PaginatorControls: React.VFC = () => {
  const { currentPage, lastPage, pageSwitch } = useContext(PaginatorContext)!

  return (
    <div className={styles.container}>
      <Button
        disabled={currentPage === 1}
        onClick={() => {
          pageSwitch(-1)
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <span>
        {currentPage} / {lastPage}
      </span>
      <Button
        disabled={currentPage === lastPage}
        onClick={() => {
          pageSwitch(1)
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  )
}
