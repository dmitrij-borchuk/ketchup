import React, { useCallback, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import shortid from 'shortid'
import {
  Popup,
  PopupTitle,
  PopupControls,
  CloseIconWrapper,
} from '../Popup'
import CloseIcon from '../Icons/close'
import Button from '../Button'
import {
  FormWrapper,
} from './styles'
import { ISession } from '../../types/session.interface'

const MAX_SESSION_LENGTH = 5999

interface ISessionEditProps {
  onSubmit: (session: ISession) => void
  onClose: () => void
  session?: ISession
  open: boolean
}
export const SessionEdit: React.FC<ISessionEditProps> = (props) => {
  const {
    onSubmit,
    onClose,
    session,
    open,
  } = props
  const [sessionName, setSessionName] = useState<string>(session ? session.name : '')
  const [sessionLength, setSessionLength] = useState<number>(session ? session.length : 0)
  const onNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setSessionName(event.target.value),
    [],
  )
  const onLengthChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = parseInt(event.target.value, 10)
      value = isNaN(value) ? 0 : value
      setSessionLength(Math.min(MAX_SESSION_LENGTH, Math.max(0, value)))
    },
    [],
  )

  const onSaveClick = useCallback(
    () => {
      onSubmit({
        id: session ? session.id : shortid.generate(),
        name: sessionName,
        length: sessionLength,
      })
    },
    [session, onSubmit, sessionName, sessionLength],
  )
  const title = `${session ? 'Edit' : 'Create'} session`

  return (
    <Popup
      open={open}
      handleClose={onClose}
    >
      <PopupTitle>
        {title}
      </PopupTitle>
      <CloseIconWrapper>
        <CloseIcon onClick={onClose} />
      </CloseIconWrapper>
      <FormWrapper>
        <TextField
          id="session-name"
          label="Name*"
          value={sessionName}
          onChange={onNameChange}
          error={sessionName.length === 0}
          data-testid="session-name-input"
        />
        <TextField
          id="session-length"
          label="Length*"
          value={sessionLength}
          type="number"
          onChange={onLengthChange}
          error={sessionLength <= 0}
          data-testid="session-length-input"
        />
      </FormWrapper>
      <PopupControls>
        <Button
          onClick={onSaveClick}
          modifier={Button.MODIFIERS.DARK}
          disabled={sessionName.length === 0 || sessionLength <= 0}
        >
          Save
        </Button>
      </PopupControls>
    </Popup>
  )
}
