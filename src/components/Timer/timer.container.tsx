import * as React from 'react';
import { connect } from 'react-redux';
import Component from './timer.component';
import { IState } from '../../reducers';

export interface ITimerContainerProps {

}

function TimerContainer(props: ITimerContainerProps) {
  return (<Component {...props} />);
}

const mapStateToProps = ({ timer }: IState) => ({
  seconds: timer.seconds,
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerContainer);
