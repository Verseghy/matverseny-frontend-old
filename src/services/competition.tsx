import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { competitionService } from '../services'
import { clockService } from './clock'
import { getProblemsService } from './problems'
import { solutionsService } from './solutions'
import { timesService } from './times'

const CompetitionServiceInner: React.VFC = () => {
  useEffect(() => {
    const problemsService = getProblemsService(competitionService)

    timesService.start()
    clockService.start()
    solutionsService.start()
    problemsService.start()

    return () => {
      timesService.stop()
      clockService.stop()
      solutionsService.stop()
      problemsService.stop()
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
