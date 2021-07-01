import React from 'react'
import styles from '../styles/textarea.module.scss'
import classnames from 'classnames'

export interface InputProps extends React.HTMLProps<HTMLTextAreaElement> {
  block?: boolean
  error?: boolean
  className?: string
}

const Input: React.VFC<InputProps> = ({ block, error, className, ...props }) => {
  const classes = classnames(styles.textarea, className, {
    [styles.block]: block,
    [styles.error]: error,
  })

  return <textarea className={classes} {...props} />
}

export default Input
