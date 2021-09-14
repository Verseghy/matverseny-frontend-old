import React, { useEffect } from 'react'
import { Card } from '../components'
import { creators } from '../creators'
import { competitionService } from '../services'
import { clockService } from '../services/clock'
import { getProblemsService } from '../services/problems'
import { solutionsService } from '../services/solutions'
import { timesService } from '../services/times'
import styles from '../styles/end.module.scss'

const EndPage: React.VFC = () => {
  useEffect(() => {
    timesService.stop()
    clockService.stop()
    solutionsService.stop()
    getProblemsService(competitionService).stop()
  }, [])

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1>A verseny véget ért!</h1>
        <p>Köszönjük, hogy részt vettetek a versenyen.</p>
        <p>A feladatsor alkotóközössége:</p>
        <ul>
          {creators.map((creator) => (
            <li key={creator}>{creator}</li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

export default EndPage
