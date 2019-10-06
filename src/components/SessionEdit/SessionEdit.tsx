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

interface ISessionEditProps {
  onSubmit: (session: ISession) => void
  onClose: () => void
  session?: ISession,
}
export const SessionEdit: React.FC<ISessionEditProps> = (props) => {
  const {
    onSubmit,
    onClose,
    session,
  } = props
  const [sessionName, setSessionName] = useState<string>(session ? session.name : '')
  const [sessionLength, setSessionLength] = useState<number>(session ? session.length : 0)
  const onNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setSessionName(event.target.value),
    [],
  )
  const onLengthChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSessionLength(parseInt(event.target.value, 10)),
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
    <Popup>
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
        />
        <TextField
          id="session-length"
          label="Length*"
          value={sessionLength}
          type="number"
          onChange={onLengthChange}
        />
      </FormWrapper>
      <PopupControls>
        <Button
          onClick={onSaveClick}
          modifier={Button.MODIFIERS.DARK}
        >
          Save
        </Button>
      </PopupControls>
    </Popup>
  )
}
