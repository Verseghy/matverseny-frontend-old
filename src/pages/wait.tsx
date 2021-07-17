import React from 'react'
import { useRecoilValue } from 'recoil'
import { Card } from '../components'
import { timeString } from '../state/competition'
import styles from '../styles/wait.module.scss'

const WaitPage: React.VFC = () => {
  const time = useRecoilValue(timeString)

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
