import React, { useState } from 'react'
import styles from '../styles/switch.module.scss'

export interface SwitchProps {
  value?: boolean
  onClick?: (value: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({ children, value, onClick }) => {
  const [internalValue, setIntervalValue] = useState(value ? value : false)

  const handleClick = () => {
    setIntervalValue((state: boolean) => !state)

    if (onClick) {
      onClick(!internalValue)
    }
  }

  if (!children) {
    return (
      <button
        role="switch"
        aria-checked={internalValue}
        className={styles.switch}
        onClick={handleClick}
      />
    )
  }

  return (
    <label className={styles.label}>
      <button
        role="switch"
        aria-checked={internalValue}
        className={styles.switch}
        onClick={handleClick}
      />
      <span>{children}</span>
    </label>
  )
}

export default Switch
