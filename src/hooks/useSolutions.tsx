import { ClientReadableStream } from 'grpc-web'
import { useEffect, useRef } from 'react'
import { useSetAtom } from 'yauk/react'
import { GetSolutionsRequest, GetSolutionsResponse } from '../proto/competition_pb'
import { competitionService } from '../services'
import { getAuth } from '../state/auth'
import { solutionsData } from '../state/competition'
import { retry } from '../utils/retry'

export const useSolutions = () => {
  const setSolutions = useSetAtom(solutionsData)
  const streamRef = useRef<ClientReadableStream<GetSolutionsResponse>>()

  useEffect(() => {
    const getSolutions = (): Promise<void> => {
      return new Promise(async (resolve, reject) => {
        const stream = competitionService.getSolutions(
          new GetSolutionsRequest(),
          await getAuth()
        ) as ClientReadableStream<GetSolutionsResponse>

        stream.on('data', (res: GetSolutionsResponse) => {
          if (res.getType() === GetSolutionsResponse.Modification.K_CHANGE) {
            setSolutions((state) => {
              return {
                ...state,
                [res.getId()]: res.getValue().toString(),
              }
            })
            return
          }

          setSolutions((state) => ({
            ...state,
            [res.getId()]: '',
          }))
        })

        stream.on('end', () => {
          resolve()
        })

        stream.on('error', () => {
          reject()
        })

        streamRef.current = stream
      })
    }

    retry(getSolutions, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
