import { Problem } from '../models/problem'
import Card, { CardProps } from '../components/card'
import Textarea from '../components/textarea'
import Button from '../components/button'
import Input from '../components/input'
import styles from '../styles/problem-card.module.scss'
import { Fragment, useEffect, useState } from 'react'
import { useFormatedProblem } from '../hooks/formatted-problem'
import { useNotFirstEffect } from '../hooks/not-first-effect'
import { useDebounce } from '../hooks/debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons'

export interface ProblemCardProps extends CardProps {
  problem: Problem,
  admin?: boolean,
  totalItems: number,
  onDelete?: (id: string) => void,
  onUpdate?: (problem: Problem) => void,
  onSwap?: (posA: number, posB: number) => void,
}

enum Swap {
  UP,
  DOWN,
}

const ProblemCard: React.VFC<ProblemCardProps> = ({
  problem,
  admin,
  totalItems,
  onDelete,
  onUpdate,
  onSwap,
  ...rest
}) => {
  const [problemText, setProblemText] = useState(problem.body)
  const [problemSolution, setProblemSolution] = useState(problem.solution)
  const [update, setUpdate] = useState(false)

  const formattedProblemText = useFormatedProblem(problemText)
  const debouncedText = useDebounce(problemText, 1000)
  const debouncedSolution = useDebounce(problemSolution, 1000)

  const first = problem.position === 1
  const last = problem.position === totalItems

  useEffect(() => {
    setUpdate(false)
    setProblemText(problem.body)
    setProblemSolution(problem.solution)
  }, [problem.body, problem.solution])

  useNotFirstEffect(() => {
    if (!onUpdate || !update) return
    onUpdate({
      ...problem,
      body: debouncedText,
      solution: debouncedSolution,
    })
  }, [debouncedText, debouncedSolution, onUpdate])

  const swapProblem = (swap: Swap) => {
    if (!onSwap) return
    onSwap(problem.position, problem.position + (swap === Swap.UP ? -1 : 1))
  }

  return (
    <Card {...rest}>
      <div className={styles.header}>
        <h1 className={styles.title}>{problem.position}. feladat</h1>
        {!!admin && (
          <div className={styles.buttons}>
            <Button onClick={() => { swapProblem(Swap.UP) }} disabled={first}>
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            <Button onClick={() => { swapProblem(Swap.DOWN) }} disabled={last}>
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            <Button onClick={() => onDelete&& onDelete(problem.id)} kind="danger">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        )}
      </div>
      <p dangerouslySetInnerHTML={{__html: formattedProblemText}} />
      <img src={problem.image} alt="" />
      {!!admin && (
        <Fragment>
          <Textarea block rows={5} value={problemText} className={styles.problemText} onInput={(event) => {
            setUpdate(true)
            setProblemText((event.target as HTMLTextAreaElement).value)
          }} />
          <span>Megoldás</span>
        </Fragment>
      )}
      <Input block error={isNaN(Number(problem.solution))} inputMode="numeric" value={problemSolution ?? ''} onInput={(event) => {
        setUpdate(true)
        setProblemSolution((event.target as HTMLInputElement).value)
      }} />
    </Card>
  )
}

export default ProblemCard

