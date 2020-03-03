import React, { useCallback, useState, useEffect } from 'react'
import shortid from 'shortid'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import {
  Popup,
  PopupTitle,
  PopupControls,
} from '../Popup'
import CloseIcon from '../Icons/close'
import EditIcon from '../Icons/edit'
import DeleteIcon from '../Icons/delete'
import Button from '../Button'
import {
  CloseIconWrapper,
  PopupWrapper,
  FormWrapper,
  RemoveIcon,
  SessionContainer,
} from './styles'
import { ISession } from '../../types/session.interface'
import { ISettings } from '../../types'
import { SessionEdit } from '../SessionEdit'

interface ISessionProps {
  data: ISession
  disableRemove: boolean
  onRemove: Function
  onChange: (session: ISession) => void
  onEditClick: () => void
}
const Session: React.FC<ISessionProps> = ({
  data,
  disableRemove,
  onRemove,
  onChange,
  onEditClick,
}) => {
  const { name, length } = data
  // const [showEdit, setShowEdit] = useState(false)
  const onRemoveClick = useCallback(
    () => {
      if (!disableRemove) {
        onRemove()
      }
    },
    [onRemove, disableRemove],
  )

  return (
    <>
      <SessionContainer>
        <div>
          {name}:&nbsp;
        </div>
        <div>
          {length} s
        </div>

        <RemoveIcon disabled={disableRemove}>
          <EditIcon onClick={onEditClick} />
        </RemoveIcon>

        <RemoveIcon disabled={disableRemove}>
          <DeleteIcon onClick={onRemoveClick} />
        </RemoveIcon>
      </SessionContainer>
      {/* {showEdit && (
        <SessionEdit
          onSubmit={session => onChange({ ...data, ...session })}
          onClose={() => { setShowEdit(false) }}
          session={data}
        />
      )} */}
    </>
  )

  // return (
  //   <>
  //     <TextField
  //       id="session-name"
  //       label="Name*"
  //       value={name}
  //       onChange={handleChange('name')}
  //       error={name.length === 0}
  //     />
  //     <TextField
  //       id="session-length"
  //       label="Length*"
  //       value={length}
  //       type="number"
  //       onChange={handleChange('length')}
  //     />

  //     <RemoveIcon disabled={disableRemove}>
  //       <CloseIcon onClick={onRemoveClick} />
  //     </RemoveIcon>
  //   </>
  // )
}

interface ISessionsProps {
  fields: ISession[]
  onRemove: (index: number) => void
  onAdd: () => void
  onChange: (sessions: ISession[]) => void
  onEditClick: (session: ISession) => void
}
const Sessions: React.FC<ISessionsProps> = ({ fields, onRemove, onAdd, onChange, onEditClick }) => {
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
            onEditClick={() => onEditClick(member)}
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
  hideSettings: () => void
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
  const [sessionToEdit, setSessionToEdit] = useState<ISession | null>(null)
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
    () => setSessions([...sessions]),
    [sessions],
  )
  useEffect(
    () => setSettings(settings),
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
  const onChange = useCallback(
    (sessions: ISession[]) => {
      setSessions(sessions)
    },
    [setSessions],
  )
  const onSessionChange = useCallback(
    (session: ISession) => {
      const sessions = [...localSessions]
      const index = sessions.findIndex(item => item.id === session.id)
      sessions.splice(index, 1, session)
      onChange(sessions)
      setSessionToEdit(null)
    },
    [localSessions, onChange],
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
      {!sessionToEdit && (
        <Popup>
          <PopupTitle>
            Settings
          </PopupTitle>
          <CloseIconWrapper>
            <CloseIcon onClick={hideSettings} />
          </CloseIconWrapper>
          <FormWrapper>
            <Typography variant="subtitle1" gutterBottom>
              Sessions:
            </Typography>
            <Sessions
              fields={localSessions}
              onAdd={onAdd}
              onRemove={onRemove}
              onChange={onChange}
              onEditClick={session => setSessionToEdit(session)}
            />

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
      )}
      {sessionToEdit && (
        <SessionEdit
          onSubmit={onSessionChange}
          onClose={() => { setSessionToEdit(null) }}
          session={sessionToEdit}
        />)}
    </PopupWrapper>
  )
}

export default Settings
