import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/button.module.scss'
import classnames from 'classnames'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: 'primary' | 'danger'
  block?: boolean
  label?: boolean
  to?: string
}

export const Button: React.FC<ButtonProps> = ({
  children,
  kind,
  block,
  label,
  to,
  className,
  ...props
}) => {
  const classes = classnames(styles.button, styles[kind as string], className, {
    [styles.block]: block,
  })

  if (to) {
    const linkClasses = classnames(classes, {
      [styles.disabled]: props.disabled,
    })

    return (
      <Link to={props.disabled ? '#' : to} className={linkClasses}>
        {children}
      </Link>
    )
  }

  if (label)
    return (
      <label tabIndex={0} className={classes}>
        {children}
      </label>
    )

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
