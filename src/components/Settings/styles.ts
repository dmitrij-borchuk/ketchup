import styled from 'styled-components'

export const CloseIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  right: 5px;
  top: 5px;
`
export const PopupWrapper = styled.div`
  color: #000;
`
export const FormWrapper = styled.div`
  padding: 25px 0 15px 0;
`
export const LabelText = styled.div`
  flex-shrink: 0;
  padding-right: 10px;
  text-align: right;
  width: 150px;
`
export const InputLabel = styled.label`
  display: flex;
  padding-bottom: 10px;
`
export const InputWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`
interface IIconProps {
  disabled?: boolean
}
export const IconWrapper = styled.span<IIconProps>`
  ${props => (props.disabled ? 'opacity: 0.3;' : 'cursor: pointer;')}
`

export const SessionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const SessionControls = styled.span`
  margin-left: 20px;
`
