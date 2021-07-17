import React from 'react'
import { Route } from 'react-router-dom'
import { useSolutions } from '../hooks/solutions'
import { useProblems } from '../hooks/problems'
import { useTime } from '../hooks/time'
import { competitionService } from '../services'

const CompetitionServiceInner: React.VFC = () => {
  useProblems(competitionService)
  useSolutions()
  useTime()

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
