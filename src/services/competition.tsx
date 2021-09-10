import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useProblems } from '../hooks'
import { competitionService } from '../services'
import { clockService } from './clock'
import { solutionsService } from './solutions'
import { timesService } from './times'

const CompetitionServiceInner: React.VFC = () => {
  useProblems(competitionService)

  useEffect(() => {
    timesService.start()
    clockService.start()
    solutionsService.start()

    return () => {
      timesService.stop()
      clockService.stop()
      solutionsService.stop()
    }
  }, [])

  return null
}

const CompetitionService: React.VFC = () => {
  return (
    <Route path={['/wait', '/competition', '/end', '/team']}>
      <CompetitionServiceInner />
    </Route>
  )
}

export default CompetitionService
