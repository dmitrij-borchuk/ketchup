import React from 'react';
import Timer from '../Timer/container';
import styles from './styles.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Timer />
    </div>
  );
}

App.propTypes = {
};

App.defaultProps = {
};
