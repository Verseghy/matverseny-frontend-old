import Card, { CardProps } from '../components/card'
import Textarea from '../components/textarea'
import Button from '../components/button'
import Input from '../components/input'
import styles from '../styles/problem-card.module.scss'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useFormatedProblem } from '../hooks/formatted-problem'
import { useNotFirstEffect } from '../hooks/not-first-effect'
import { useDebounce } from '../hooks/debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faImages, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useRecoilValue } from 'recoil'
import { getProblemByID as competitionGetProblemByID } from '../state/competition'
import { sortedProblemIDs, getProblemByID } from '../state/problems'
import { Problem } from '../models/problem'

export interface ProblemCardProps extends CardProps {
  problemID: string
  admin?: boolean
  onDelete?: (id: string) => void
  onUpdate?: (problem: Problem) => void
  onSwap?: (posA: number, posB: number) => void
}

const ProblemCard: React.VFC<ProblemCardProps> = ({
  problemID,
  admin,
  onDelete,
  onUpdate,
  onSwap,
  ...rest
}) => {
  const problem = useRecoilValue(
    admin ? getProblemByID(problemID) : competitionGetProblemByID(problemID)
  )
  const totalItems = useRecoilValue(sortedProblemIDs).length

  const [problemText, setProblemText] = useState(problem.body)
  const [problemSolution, setProblemSolution] = useState(problem.solution)
  const [image, setImage] = useState(problem.image)
  const [update, setUpdate] = useState(false)
  const uploadElement = useRef<HTMLInputElement>(null)

  const formattedProblemText = useFormatedProblem(problemText)
  const debouncedText = useDebounce(problemText, 1000)
  const debouncedSolution = useDebounce(problemSolution, 1000)

  const first = problem.position === 1
  const last = problem.position === totalItems

  useEffect(() => {
    if (admin) return
    setProblemSolution(problem.solution ?? '')
  }, [problem.solution, admin])

  useEffect(() => {
    setUpdate(false)
    setProblemText(problem.body)
    setImage(problem.image)
    if (admin) setProblemSolution(problem.solution)
  }, [problem.body, problem.solution, problem.image, admin])

  useNotFirstEffect(() => {
    if (!onUpdate || !update) return
    onUpdate({
      ...problem,
      body: debouncedText,
      image,
      solution: debouncedSolution,
    })
  }, [debouncedText, debouncedSolution, image, onUpdate])

  const swapProblem = (swap: 'up' | 'down') => {
    if (!onSwap) return
    onSwap(problem.position, problem.position + (swap === 'up' ? -1 : 1))
  }

  const uploadImage = () => {
    const reader = new FileReader()
    reader.onload = () => {
      setUpdate(true)
      setImage(reader.result!.toString())
    }
    reader.readAsDataURL(uploadElement.current!.files![0])
  }

  return (
    <Card {...rest}>
      <div className={styles.header}>
        <h1 className={styles.title}>{problem.position}. feladat</h1>
        {!!admin && (
          <div className={styles.buttons}>
            {problem.image === '' ? (
              <Button kind="primary" label>
                <input ref={uploadElement} onChange={uploadImage} hidden type="file" />
                <FontAwesomeIcon icon={faImages} />
              </Button>
            ) : (
              <Button
                kind="danger"
                onClick={() => {
                  setUpdate(true)
                  setImage('')
                }}
              >
                Kép törlése
              </Button>
            )}
            <Button
              onClick={() => {
                swapProblem('up')
              }}
              disabled={first}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            <Button
              onClick={() => {
                swapProblem('down')
              }}
              disabled={last}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            <Button onClick={() => onDelete && onDelete(problem.id)} kind="danger">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        )}
      </div>
      <p className={styles.problem} dangerouslySetInnerHTML={{ __html: formattedProblemText }} />
      {!!problem.image && <img className={styles.image} src={problem.image} alt="" />}
      {!!admin && (
        <Fragment>
          <Textarea
            block
            rows={5}
            value={problemText}
            className={styles.problemText}
            onInput={(event) => {
              setUpdate(true)
              setProblemText((event.target as HTMLTextAreaElement).value)
            }}
          />
          <span>Megoldás</span>
        </Fragment>
      )}
      <Input
        block
        error={isNaN(Number(problemSolution))}
        inputMode="numeric"
        value={problemSolution ?? ''}
        onInput={(event) => {
          setUpdate(true)
          setProblemSolution((event.target as HTMLInputElement).value)
        }}
      />
    </Card>
  )
}

export default ProblemCard
