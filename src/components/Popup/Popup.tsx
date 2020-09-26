import React from 'react'
import PropTypes from 'prop-types'
import { Container, Title, Controls } from './styles'
import { Dialog, Slide } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions/transition'

export function PopupTitle(props: any) {
  const { children } = props

  return <Title>{children}</Title>
}
PopupTitle.propTypes = {
  children: PropTypes.node,
}
PopupTitle.defaultProps = {
  children: null,
}

export function PopupControls(props: any) {
  const { children } = props

  return <Controls>{children}</Controls>
}
PopupControls.propTypes = {
  children: PropTypes.node,
}
PopupControls.defaultProps = {
  children: null,
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface IPopupProps {
  open: boolean
  handleClose: () => void
}
export const Popup: React.FC<IPopupProps> = (props) => {
  const { children, open, handleClose } = props

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <Container>{children}</Container>
    </Dialog>
  )
}
