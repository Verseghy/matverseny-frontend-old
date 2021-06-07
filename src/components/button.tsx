import React from 'react'
import styles from '../styles/button.module.scss'
import classnames from 'classnames'

export interface ButtonProps {
  primary: boolean,
}

const Button: React.FC<ButtonProps> = ({ children, primary }) => {
  const classes = classnames(styles.button, {[styles.primary]: primary})

  return <button className={classes}>{children}</button>
}

export default Button
