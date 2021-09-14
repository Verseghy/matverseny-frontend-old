import React, { useEffect } from 'react'
import { useAtom } from 'yauk/react'
import { Card } from '../components'
import { competitionService } from '../services'
import { getProblemsService } from '../services/problems'
import { timeString } from '../state/competition'
import styles from '../styles/wait.module.scss'

const problemsService = getProblemsService(competitionService)

const WaitPage: React.VFC = () => {
  const time = useAtom(timeString)

  useEffect(() => {
    problemsService.start()
  }, [])

  return (
    <div className={styles.container}>
      <Card>
        <h1>Kérlek várj!</h1>
        <p>A verseny kezdetéig még:</p>
        <p className={styles.time}>{time}</p>
      </Card>
    </div>
  )
}

export default WaitPage
