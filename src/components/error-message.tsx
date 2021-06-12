import React from 'react'
import styles from '../styles/error-message.module.scss'

export interface ErrorMessageProps {
  message: string
}

const errorMessages: {[key: string]: string} = {
  'E0000': 'not implemented',
	'E0001': 'Email megadása kötelező',
	'E0002': 'Jelszó megadása kötelező',
  'E0003': 'Hibás email cím vagy jelszó',
	'E0004': 'Adatbázis hiba',
	'E0005': 'Kriptográfiai hiba',
	'E0006': 'JWT hiba',
	'E0007': 'Név megadása kötelező',
	'E0008': 'Email formátuma hibás',
	'E0009': 'Iskola megadása kötelező',
	'E0010': 'A felhasználó már létezik',
	'E0011': 'Token lejárt',
	'E0012': 'Nincs jogosultság',
}

const ErrorMessage: React.VFC<ErrorMessageProps> = ({ message }) => {
  if (message === '')
    return null

  let error
  const match = message.match(/(E[0-9]{4}): .*/)
  if (!match || !(error = errorMessages[match[1]]))
    error = 'Ismeretlen hiba'

  return <div className={styles.error}>{error}</div>
}

export default ErrorMessage
