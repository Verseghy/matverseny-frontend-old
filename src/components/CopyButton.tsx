import { faCheck, faClipboard, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, ButtonProps } from './button'
import s from '../styles/CopyButton.module.scss'

export interface CopyButtonProps extends ButtonProps {
  text: string
}

enum CopyButtonState {
  NORMAL,
  SUCCESS,
  ERROR,
}

export const CopyButton: React.VFC<CopyButtonProps> = ({ text, ...rest }) => {
  const [state, setState] = useState(CopyButtonState.NORMAL)
  const [to, setTO] = useState<NodeJS.Timeout | null>(null)

  const onClick = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setState(CopyButtonState.SUCCESS)

        if (to !== null) clearTimeout(to)
        setTO(
          setTimeout(() => {
            setState(CopyButtonState.NORMAL)
          }, 1000)
        )
      },
      () => {
        setState(CopyButtonState.ERROR)

        if (to !== null) clearTimeout(to)
        setTO(
          setTimeout(() => {
            setState(CopyButtonState.NORMAL)
          }, 1000)
        )
      }
    )
  }

  return (
    <Button onClick={onClick} {...rest}>
      {state === CopyButtonState.NORMAL && <FontAwesomeIcon icon={faClipboard} fixedWidth />}
      {state === CopyButtonState.SUCCESS && (
        <FontAwesomeIcon icon={faCheck} fixedWidth className={s.success} />
      )}
      {state === CopyButtonState.ERROR && (
        <FontAwesomeIcon icon={faTimes} fixedWidth className={s.error} />
      )}
    </Button>
  )
}
