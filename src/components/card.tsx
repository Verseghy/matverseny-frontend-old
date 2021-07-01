import React from 'react'
import styles from '../styles/card.module.scss'
import classnames from 'classnames'

export interface CardProps {
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  const classes = classnames(styles.card, className)

  return <div className={classes}>{children}</div>
}

export default Card
