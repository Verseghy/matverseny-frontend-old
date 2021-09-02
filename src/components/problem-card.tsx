import { Button, Card, CardProps, Textarea, Input } from '../components'
import styles from '../styles/problem-card.module.scss'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useDebounce, useFormattedProblem, useNotFirstEffect } from '../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faCheck,
  faImages,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { getProblemByID as competitionGetProblemByID } from '../state/competition'
import { sortedProblemIDs, getProblemByID } from '../state/problems'
import { Problem } from '../models/problem'
import { ErrorMessage } from './error-message'
import { processFile, ProcessFileError } from '../utils/image'
import { useAtom } from 'yauk/react'

export interface ProblemCardProps extends CardProps {
  problemID: string
  admin?: boolean
  onDelete?: (id: string) => void
  onUpdate?: (problem: Problem) => void
  onSwap?: (posA: number, posB: number) => void
  isLoading?: boolean
}

export const ProblemCard: React.VFC<ProblemCardProps> = ({
  problemID,
  admin,
  onDelete,
  onUpdate,
  onSwap,
  isLoading,
  ...rest
}) => {
  const problem = useAtom(admin ? getProblemByID(problemID) : competitionGetProblemByID(problemID))
  const totalItems = useAtom(sortedProblemIDs).length

  const [problemText, setProblemText] = useState(problem.body)
  const [problemSolution, setProblemSolution] = useState(problem.solution)
  const [image, setImage] = useState(problem.image)
  const [update, setUpdate] = useState(false)
  const uploadElement = useRef<HTMLInputElement>(null)

  const formattedProblemText = useFormattedProblem(problemText)
  const debouncedText = useDebounce(problemText, 1000)
  const debouncedSolution = useDebounce(problemSolution, 1000)

  const [errorMessage, setErrorMessage] = useState('')
  const errorTimeout = useRef<NodeJS.Timeout>()

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

    const solution = Number(debouncedSolution)
    if (isNaN(solution) || !Number.isSafeInteger(solution)) return

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

  const setError = (message: string) => {
    if (errorTimeout.current) clearTimeout(errorTimeout.current)
    setErrorMessage(message)

    errorTimeout.current = setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const uploadImage = async () => {
    try {
      const imageBase64 = await processFile(uploadElement.current!.files![0])
      setUpdate(true)
      setImage(imageBase64)
    } catch (error: any) {
      if (error === ProcessFileError.NOT_ALLOWED) {
        setError('Nem megengedett fájl formátum')
      } else if (error === ProcessFileError.LARGE_SIZE) {
        setError('Túl nagy fájl, maximális méret 1MiB')
      } else {
        setError('Ismeretlen hiba!')
      }
    }
  }

  return (
    <Card {...rest}>
      <ErrorMessage
        className={styles.errorMessage}
        message={errorMessage}
        translateMessage={false}
      />
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{problem.position}. feladat</h1>
          {isLoading !== undefined && (
            <>
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                <FontAwesomeIcon className={styles.check} icon={faCheck} />
              )}
            </>
          )}
        </div>
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
        error={isNaN(Number(problemSolution)) || !Number.isSafeInteger(Number(problemSolution))}
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
