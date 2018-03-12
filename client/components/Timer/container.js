import { connect } from 'react-redux';
import component from './index';

const mapStateToProps = ({ timer }) => ({
  seconds: timer.seconds,
});

export default connect(
  mapStateToProps,
)(component);
