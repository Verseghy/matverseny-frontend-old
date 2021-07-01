import { ClientReadableStream } from 'grpc-web'
import { useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import { GetSolutionsRequest, GetSolutionsResponse } from '../proto/competition_pb'
import { competitionService } from '../services'
import { useAuthFunctions } from '../state/auth'
import { solutionsData } from '../state/competition'

export const useSolutions = () => {
  const { getAuth } = useAuthFunctions()
  const setSolutions = useSetRecoilState(solutionsData)
  const streamRef = useRef<ClientReadableStream<GetSolutionsResponse>>()

  useEffect(() => {
    const getSolutions = async () => {
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

      streamRef.current = stream
    }

    getSolutions()
  }, [])
}
