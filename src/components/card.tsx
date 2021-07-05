import React from 'react'
import styles from '../styles/card.module.scss'
import classnames from 'classnames'

export interface CardProps extends React.HTMLProps<HTMLDivElement> {
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className, ...rest }) => {
  const classes = classnames(styles.card, className)

  return <div className={classes} {...rest}>{children}</div>
}

export default Card
