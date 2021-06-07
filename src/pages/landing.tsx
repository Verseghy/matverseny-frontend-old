import React from 'react'
import styles from '../styles/landing.module.scss'
import Button from '../components/button'
import Switch from '../components/switch'
import Card from '../components/card'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1>Verseghy <span>191</span></h1>
        <p>A csapattagok a csapatvezetőtől kapott emailcímmel és jelszóval jelentkezhetnek be az oldalra. Erről a csapatvezetők a verseny napján emailben kapnak értesítést.</p>
        <p> A beírt megoldások a csapattagok között automatikusan szinkronizálódnak. A megoldás akkor tekinthető beírtnak, ha a felső sorban a feladathoz tartozó négyzet zöldre vált. Kérjük a kevésbé stabil internettel rendelkezőknek, hogy különös figyelemmel legyenek erre. Ha sehogysem vált zöldre a négyzet egy megoldás megadása után, kérjük próbáld meg újratölteni az oldalt. Ha ez sem működik kérjük a csapatvezetőnek kiküldött emailben lévő csatornákon vegyék fel a szerverzőkkel a kapcsolatot.</p>
        <p> Az OLED kijelzővel rendelkező felhasználóknak ajánljuk a sötét téma használatát, mivel ez nagy mértékben csökkenti az akkumulátorhasználatot. Ez a beállítás az alább található kapcsolóval állítható. A verseny időtartama alatt bármikor ki és be kapcsolható ezen az oldalon.</p>
        <div className={styles.controls}>
          <Switch>Sötét téma</Switch>
          <Link to="/login">
            <Button primary>Tovább</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default LandingPage
