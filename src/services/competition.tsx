import React from 'react'
import { Route } from 'react-router-dom'
import { useProblems, useSolutions, useTime } from '../hooks'
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
