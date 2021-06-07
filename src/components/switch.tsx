import React, { useState } from 'react'
import styles from '../styles/switch.module.scss'
import classnames from 'classnames'

export interface SwitchProps {
  value?: boolean,
  onClick?: (value: boolean) => void,
}

const Switch: React.FC<SwitchProps> = ({ children, value, onClick }) => {
  const [internalValue, setIntervalValue] = useState(value ? value : false)
  const classes = classnames(styles.switch, {[styles.on]: internalValue})

  const handleClick = () => {
    setIntervalValue((state: boolean) => !state)

    if (onClick) {
      onClick(!internalValue)
    }
  }


  if (!children) {
    return <button role="switch" className={classes} onClick={handleClick} />
  }

  return (
    <label className={styles.label}>
      <button role="switch" className={classes} onClick={handleClick} />
      <span>{children}</span>
    </label>
  )
}

export default Switch
