import React from 'react'
import styles from '../styles/container.module.scss'

export interface ContainerProps {
  center: boolean
}

const Container: React.FC<ContainerProps> = ({ center, children }) => {
  return <div className={styles.container}>{children}</div>
}

export default Container
