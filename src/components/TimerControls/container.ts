import { connect } from 'react-redux';
import component from './index';
import {
  startTimer,
  stopTimer,
  resetTimer,
} from '../../actions/timer';
import { IState } from '../../reducers';

const mapStateToProps = ({ timer }: IState) => ({
  isStarted: timer.isStarted,
});

const mapDispatchToProps = {
  onStartClick: startTimer,
  onPauseClick: stopTimer,
  onFinishClick: resetTimer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
