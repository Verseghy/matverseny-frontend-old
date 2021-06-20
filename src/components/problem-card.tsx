import { Problem } from '../models/problem'
import Card, { CardProps } from '../components/card'
import Textarea from '../components/textarea'
import Button from '../components/button'
import Input from '../components/input'
import styles from '../styles/problem-card.module.scss'
import { Fragment, useCallback, useContext } from 'react'
import { AdminContext } from '../context/admin'
import { DeleteRequest, SwapRequest, UpdateRequest } from '../proto/admin_pb'
import { AuthContext } from '../context/auth'
import { Problem as ProblemPB } from '../proto/shared_pb'
import { useFormatedProblem } from '../hooks/formatted-problem'
import { useNotFirstEffect } from '../hooks/not-first-effect'
import { useDebounce } from '../hooks/debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faTrash } from '@fortawesome/free-solid-svg-icons'

export interface ProblemCardProps extends CardProps {
  problem: Problem
  admin?: boolean
}

enum Swap {
  UP,
  DOWN,
}

const ProblemCard: React.VFC<ProblemCardProps> = ({ problem, admin, ...rest }) => {
  const {service, setProblem, update, setUpdate, findProblem, data} = useContext(AdminContext)!
  const {getAccessToken} = useContext(AuthContext)
  const formattedProblemText = useFormatedProblem(problem.body)
  const debouncedText = useDebounce(problem.body, 1000)
  const debouncedSolution = useDebounce(problem.solution, 1000)

  const deleteProblem = useCallback(async () => {
    const req = new DeleteRequest()
      .setId(problem.id)

    await service.deleteProblem(req, {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }, [service, problem.id, getAccessToken])

  const updateProblem = useCallback(async () => {
    if (!update) return

    const problemPB = new ProblemPB()
      .setId(problem.id)
      .setBody(problem.body)
      .setImage(problem.image)

    if (problem.solution !== '') {
      const value = Number(problem.solution)
      if (!isNaN(value) && Number.isSafeInteger(value)) {
        problemPB.setSolution(value)
      }
    }

    const req = new UpdateRequest()
      .setProblem(problemPB)
  
    await service.updateProblem(req, {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }, [update, service, problem, getAccessToken])

  const swapProblem = useCallback(async (swap: Swap) => {
    const req = new SwapRequest()
      .setA(problem.id)

    
    let problemB
    if (swap === Swap.UP) {
      problemB = (findProblem({ position: problem.position - 1 }))
    } else {
      problemB = findProblem({ position: problem.position + 1 })
    }

    if (!problemB) return

    req.setB(problemB.id)

    await service.swapProblem(req, {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }, [service, problem.id, getAccessToken])

  useNotFirstEffect(() => { updateProblem() }, [debouncedText, debouncedSolution])

  return (
    <Card {...rest}>
      <div className={styles.header}>
        <h1 className={styles.title}>{problem.position}. feladat</h1>
        {!!admin && (
          <div className={styles.buttons}>
            <Button onClick={() => { swapProblem(Swap.UP) }} disabled={problem.position <= 1}>
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
            <Button onClick={() => { swapProblem(Swap.DOWN) }} disabled={problem.position >= data.length}>
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            <Button onClick={deleteProblem} kind="danger">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        )}
      </div>
      <p dangerouslySetInnerHTML={{__html: formattedProblemText}} />
      <img src={problem.image} alt="" />
      {!!admin && (
        <Fragment>
          <Textarea block rows={5} value={problem.body} className={styles.problemText} onInput={(event) => {
            setUpdate(true)
            setProblem(problem.id, { body: (event.target as HTMLTextAreaElement).value })
          }} />
          <span>Megoldás</span>
        </Fragment>
      )}
      <Input block error={isNaN(Number(problem.solution))} inputMode="numeric" value={problem.solution ?? ''} onInput={(event) => {
        setUpdate(true)
        setProblem(problem.id, { solution: (event.target as HTMLInputElement).value })
      }} />
    </Card>
  )
}

export default ProblemCard

