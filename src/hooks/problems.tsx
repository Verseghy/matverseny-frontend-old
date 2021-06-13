import { ClientReadableStream } from 'grpc-web'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/auth'
import { Problem } from '../models/problem'
import { AdminClient } from '../proto/AdminServiceClientPb'
import { ReadRequest } from '../proto/admin_pb'
import { ProblemStream } from '../proto/shared_pb'

export const useProblems = (service: AdminClient): Problem[] => {
  const [problems, setProblems] = useState<{[key: string]: Problem}>({})
  const stream = useRef<ClientReadableStream<ProblemStream> | null>(null)
  const { getAccessToken } = useContext(AuthContext)

  useEffect(() => { (async () => {
    const s = service.getProblems(new ReadRequest(), {
      Authorization: `Bearer: ${await getAccessToken()}`
    }) as ClientReadableStream<ProblemStream>

    s.on('data', (p: ProblemStream) => {
      const type = p.getType()
      if (type === ProblemStream.Type.K_INITIAL) {
        const initial = p.getInitial()!
        const problem = initial.getProblem()!

        setProblems((state) => ({
          ...state,
          [problem.getId()]: {
            id: problem.getId(),
            position: initial.getAt(),
            body: problem.getBody(),
            image: problem.getImage(),
          }
        }))
      } else if (type === ProblemStream.Type.K_UPDATE) {
        // const update = p.getUpdate()!
        // const problem = update.getProblem()!
      } else if (type === ProblemStream.Type.K_DELETE) {
      } else if (type === ProblemStream.Type.K_SWAP) {
      } else if (type === ProblemStream.Type.K_CREATE) {
        const create = p.getCreate()!
        const at = create.getAt()
        const id = create.getProblem()!.getId();
        setProblems((state) => {
          let mapped = Object.entries(state).map(([key, value]) => {
            if (value.position >= at) {
              return [key, {
                ...value,
                position: value.position + 1,
              }]
            } else {
              return [key, value]
            }
          })
          let o = Object.fromEntries(mapped)
          o[id] = {
            id,
            position: at,
            body: '',
            image: '',
          }
          return o
        })
      } else {
        console.error(`unknown ProblemStream type: ${type}`)
      }
    })

    s.on('end', () => {
      console.log('stream end')
    })

    stream.current = s
  })()}, [service])

  return Array.from(Object.values(problems)).sort((a, b) => a.position - b.position)
}
