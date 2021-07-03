import React from 'react'
import Card from '../components/card'
import { creators } from '../creators'
import styles from '../styles/end.module.scss'

const EndPage: React.VFC = () => {
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
