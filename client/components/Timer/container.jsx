import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Component from './index';

class TimerContainer extends PureComponent {
  static propTypes = {
  }

  render() {
    return (<Component {...this.props} />);
  }
}

const mapStateToProps = ({ timer }) => ({
  seconds: timer.seconds,
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimerContainer);
