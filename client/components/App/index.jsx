import React from 'react';
import Timer from '../Timer/container';
import TimerControls from '../TimerControls/container';
import styles from './styles.css';

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.circle}>
        <div>
          <Timer />
          <div className={styles.controls}>
            <TimerControls />
          </div>
        </div>
      </div>
    </div>
  );
}

App.propTypes = {
};

App.defaultProps = {
};
