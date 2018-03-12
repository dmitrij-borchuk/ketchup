import { connect } from 'react-redux';
import component from './index';
import {
  startTimer,
  stopTimer,
  resetTimer,
} from '../../actions/timer';

const mapStateToProps = ({ timer }) => ({
  isStarted: timer.isStarted,
});

const mapDispatchToProps = dispatch => ({
  onStartClick: () => dispatch(startTimer()),
  onPauseClick: () => dispatch(stopTimer()),
  onFinishClick: () => dispatch(resetTimer()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
