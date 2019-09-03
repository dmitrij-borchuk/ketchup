import React, { useCallback, useState, useEffect } from 'react'
import shortid from 'shortid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Popup, {
  PopupTitle,
  PopupControls,
} from '../Popup'
import CloseIcon from '../Icons/close'
import Button from '../Button'
import {
  CloseIconWrapper,
  PopupWrapper,
  FormWrapper,
  RemoveIcon,
} from './styles'
import { ISession } from '../../types/session.interface'
import { ISettings } from '../../types'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

interface ISessionProps {
  data: ISession
  disableRemove: boolean
  onRemove: Function
  onChange: (session: ISession) => void
}
const Session: React.FC<ISessionProps> = ({ data, disableRemove, onRemove, onChange }) => {
  const { name, length } = data
  const onRemoveClick = useCallback(
    () => {
      if (!disableRemove) {
        onRemove()
      }
    },
    [onRemove, disableRemove],
  )
  const handleChange = (name: keyof ISession) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const session = { ...data }
    if (name === 'length') {
      session[name] = parseInt(event.target.value, 10)
    } else {
      session[name] = event.target.value
    }
    onChange(session)
  }

  return (
    <>
      <TextField
        id="session-name"
        label="Name*"
        value={name}
        onChange={handleChange('name')}
        error={name.length === 0}
      />
      <TextField
        id="session-length"
        label="Length*"
        value={length}
        type="number"
        onChange={handleChange('length')}
      />

      <RemoveIcon disabled={disableRemove}>
        <CloseIcon onClick={onRemoveClick} />
      </RemoveIcon>
    </>
  )
}

interface ISessionsProps {
  fields: ISession[]
  onRemove: (index: number) => void
  onAdd: () => void
  onChange: (sessions: ISession[]) => void
}
const Sessions: React.FC<ISessionsProps> = ({ fields, onRemove, onAdd, onChange }) => {
  const disableRemove = fields.length <= 1
  const handleChange = (index: number) => (session: ISession) => {
    const sessions = [...fields]
    sessions.splice(index, 1, session)
    onChange(sessions)
  }

  return (
    <>
      {fields.map((member, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index}>
          <Session
            data={member}
            disableRemove={disableRemove}
            onRemove={() => onRemove(index)}
            onChange={handleChange(index)}
          />
        </div>
      ))}

      <Button
        onClick={onAdd}
        modifier={Button.MODIFIERS.DARK}
      >
        Add session
      </Button>
    </>
  )
}

interface ISettingsProps {
  onSubmit: (settings: ISettings) => void
  hideSettings: Function
  settings: ISettings
}
const Settings: React.FC<ISettingsProps> = (props) => {
  const {
    hideSettings,
    onSubmit,
    settings,
  } = props
  const { sessions } = settings
  const [localSessions, setSessions] = useState<ISession[]>([])
  const [localSettings, setSettings] = useState<ISettings>(settings)
  const onAdd = useCallback(
    () => {
      localSessions.push({ id: shortid.generate(), name: '', length: 0 })
      setSessions([...localSessions])
    },
    [localSessions],
  )
  const onRemove = useCallback(
    (index) => {
      localSessions.splice(index, 1)
      setSessions([...localSessions])
    },
    [localSessions],
  )

  useEffect(
    () => {
      setSessions([...sessions])
    },
    [sessions],
  )
  useEffect(
    () => {
      setSettings(settings)
    },
    [settings],
  )

  const onSaveClick = useCallback(
    () => {
      onSubmit({
        ...localSettings,
        sessions: localSessions,
      })
      hideSettings()
    },
    [onSubmit, hideSettings, localSessions, localSettings],
  )
  const onClose = useCallback(
    () => {
      hideSettings()
    },
    [hideSettings],
  )
  const onChange = useCallback(
    (sessions: ISession[]) => {
      setSessions(sessions)
    },
    [setSessions],
  )
  const onPlaySoundChange = useCallback(
    (_, checked: boolean) => {
      setSettings({
        ...localSettings,
        playSound: checked,
      })
    },
    [setSettings, localSettings],
  )

  return (
    <PopupWrapper>
      <Popup>
        <PopupTitle>
          Settings
        </PopupTitle>
        <CloseIconWrapper>
          <CloseIcon onClick={onClose} />
        </CloseIconWrapper>
        <FormWrapper>
          <Typography variant="subtitle1" gutterBottom>
            Sessions:
          </Typography>
          <Sessions fields={localSessions} onAdd={onAdd} onRemove={onRemove} onChange={onChange} />

          <div>
            <FormControlLabel
              control={(
                <Checkbox
                  onChange={onPlaySoundChange}
                  color="primary"
                  checked={localSettings.playSound}
                />
              )}
              label="Play sound"
            />
          </div>

        </FormWrapper>
        <PopupControls>
          <Button
            onClick={() => onSaveClick()}
            modifier={Button.MODIFIERS.DARK}
          >
            Save
          </Button>
        </PopupControls>
      </Popup>
    </PopupWrapper>
  )
}

export default Settings
