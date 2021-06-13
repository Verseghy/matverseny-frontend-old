import { Problem } from '../models/problem'
import Card, { CardProps } from '../components/card'
import styles from '../styles/problem.module.scss'
import KaTeX from 'katex'

export interface ProblemCardProps extends CardProps {
  problem: Problem
}

const ProblemCard: React.VFC<ProblemCardProps> = ({ problem, ...rest }) => {
  let text = problem.body
  const inline = problem.body.match(/\$(?!\$)([^$]*)\$(?!\$)/g) || []
  const block = problem.body.match(/\$\$([^$]*)\$\$/g) || []

  for (const i of inline) {
    const a = KaTeX.renderToString(i.substring(1, i.length - 1), { displayMode: false })
    text = text.replace(i, a)
  }

  for (const b of block) {
    const a = KaTeX.renderToString(b.substring(2, b.length - 2), { displayMode: true })
    text = text.replace(b, a)
  }

  return (
    <Card {...rest}>
      <h1 className={styles.title}>{problem.position}. feladat</h1>
      <p dangerouslySetInnerHTML={{__html: text}} />
      <img src={problem.image} alt="" />
    </Card>
  )
}

export default ProblemCard

