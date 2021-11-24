import React from 'react'
import styles from '../styles/landing.module.scss'
import { Button, Switch, Card } from '../components'
import { changeTheme, isDarkTheme, Theme } from '../utils/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

const LandingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1>
          Verseghy <span>191</span>
        </h1>
        <p>
          A versenyzők az oldalon tudnak regisztrálni. A csapatvezető bejelentkezés után létre tud
          hozni csapatot. A csapattagok bejelentkezés után a csapatvezetőtől kapott kóddal tudnak
          csatlakozni.
        </p>
        <p>
          A beírt megoldások a csapattagok között automatikusan szinkronizálódnak. A megoldás akkor
          tekinthető beírtnak, ha a felső sorban a feladathoz tartozó négyzet zöldre vált. Kérjük a
          kevésbé stabil internettel rendelkezőknek, hogy különös figyelemmel legyenek erre. Ha
          sehogysem vált zöldre a négyzet egy megoldás megadása után, kérjük próbáld meg újratölteni
          az oldalt. Ha ez sem működik kérjük a csapatvezetőnek kiküldött emailben lévő csatornákon
          vegyék fel a szerverzőkkel a kapcsolatot.
        </p>
        <p>
          Az OLED kijelzővel rendelkező felhasználóknak ajánljuk a sötét téma használatát, mivel ez
          nagy mértékben csökkenti az akkumulátorhasználatot. Ez a beállítás az alább található
          kapcsolóval állítható. A verseny időtartama alatt bármikor ki és be kapcsolható ezen az
          oldalon.
        </p>
        <p>Technikai probléma esetén:</p>
        <p className={styles.link}>
          <div>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            <a href="mailto:contact@zoltanszepesi.com">contact@zoltanszepesi.com</a>
          </div>
          <div>
            <FontAwesomeIcon icon={faPhone} className={styles.icon} />
            <a href="tel:+36705227252">+36 70 522 7252</a>
          </div>
        </p>
        <div className={styles.controls}>
          <Switch
            value={isDarkTheme()}
            onClick={(value: boolean) => {
              changeTheme(value ? Theme.DARK : Theme.LIGHT)
            }}
          >
            Sötét téma
          </Switch>
          <Button to="/login" kind="primary">
            Tovább
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default LandingPage
