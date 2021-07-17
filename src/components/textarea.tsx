import React from 'react'
import styles from '../styles/textarea.module.scss'
import classnames from 'classnames'

export interface TextareaProps extends React.HTMLProps<HTMLTextAreaElement> {
  block?: boolean
  error?: boolean
  className?: string
}

export const Textarea: React.VFC<TextareaProps> = ({ block, error, className, ...props }) => {
  const classes = classnames(styles.textarea, className, {
    [styles.block]: block,
    [styles.error]: error,
  })

  return <textarea className={classes} {...props} />
}
