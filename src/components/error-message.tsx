import classnames from 'classnames'
import React, { HTMLProps } from 'react'
import { useTranslatedErrorMessage } from '../hooks/useTranslatedErrorMessage'
import styles from '../styles/error-message.module.scss'

export interface ErrorMessageProps extends HTMLProps<HTMLDivElement> {
  message: string
  translateMessage?: boolean
}

export const ErrorMessage: React.VFC<ErrorMessageProps> = ({
  message,
  translateMessage = true,
  className,
  ...props
}) => {
  const translatedMessage = useTranslatedErrorMessage(message)
  if (message === '') return null

  const classes = classnames(styles.error, className)

  return (
    <div className={classes} {...props}>
      {translateMessage ? translatedMessage : message}
    </div>
  )
}
