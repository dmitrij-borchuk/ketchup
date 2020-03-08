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
  IconWrapper,
  SessionContainer,
  SessionControls,
} from './styles'
import { ISession } from '../../types/session.interface'
import { ISettings } from '../../types'
import { SessionEdit } from '../SessionEdit'
import { Flex } from '../../commonStyles'

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
        <Flex>
          <div>
            {name}:&nbsp;
          </div>
          <div>
            {length} s
          </div>
        </Flex>

        <SessionControls>
          <IconWrapper disabled={disableRemove}>
            <EditIcon
              onClick={onEditClick}
              color="#424242"
            />
          </IconWrapper>

          <IconWrapper disabled={disableRemove}>
            <DeleteIcon
              onClick={onRemoveClick}
              color="#424242"
            />
          </IconWrapper>
        </SessionControls>
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
  open: boolean
}
const Settings: React.FC<ISettingsProps> = (props) => {
  const {
    hideSettings,
    onSubmit,
    settings,
    open,
  } = props
  const { sessions } = settings
  const [localSessions, setSessions] = useState<ISession[]>([])
  const [localSettings, setSettings] = useState<ISettings>(settings)
  const [sessionToEdit, setSessionToEdit] = useState<ISession | undefined>()
  const onAdd = useCallback(
    () => {
      setSessionToEdit({
        length: 0,
        name: '',
        id: shortid.generate(),
      })
    },
    [],
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
      if (index >= 0) {
        sessions.splice(index, 1, session)
      } else {
        sessions.push(session)
      }
      onChange(sessions)
      setSessionToEdit(undefined)
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
      <Popup
        open={open && !sessionToEdit}
        handleClose={hideSettings}
      >
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
      <SessionEdit
        open={!!sessionToEdit}
        onSubmit={onSessionChange}
        onClose={() => { setSessionToEdit(undefined) }}
        session={sessionToEdit}
      />
    </PopupWrapper>
  )
}

export default Settings
