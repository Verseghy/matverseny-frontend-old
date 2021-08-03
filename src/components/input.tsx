import React from 'react'
import styles from '../styles/input.module.scss'
import classnames from 'classnames'

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  block?: boolean
  error?: boolean
}

export const Input: React.VFC<InputProps> = ({ block, error, className, ...props }) => {
  const classes = classnames(styles.input, className, {
    [styles.block]: block,
    [styles.error]: error,
  })

  return <input className={classes} {...props} />
}
