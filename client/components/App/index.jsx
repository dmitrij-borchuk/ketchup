import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Timer from '../Timer/container';
import TimerControls from '../TimerControls/container';
import appleTouchIcon from '../../assets/favicon/apple-touch-icon.png';
import favicon32x32 from '../../assets/favicon/favicon-32x32.png';
import favicon16x16 from '../../assets/favicon/favicon-16x16.png';
import webmanifest from '../../assets/favicon/site.webmanifest';
import safariPinnedTab from '../../assets/favicon/safari-pinned-tab.svg';

const AppWrapper = styled.div`
  align-items: center;
  background: #f44336;
  color: #fff;
  display: flex;
  font-family: 'Roboto', sans-serif;
  height: 100%;
  justify-content: center;
`;
const Circle = styled.div`
  align-items: center;
  border: 3px solid #b71c1c;
  border-radius: 50%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  height: 90vmin;
  width: 90vmin;
`;
const Controls = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet>
        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="144x144" href={appleTouchIcon} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
        <link rel="manifest" href={webmanifest} />
        <link rel="mask-icon" href={safariPinnedTab} color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <Circle>
        <div>
          <Timer />
          <Controls>
            <TimerControls />
          </Controls>
        </div>
      </Circle>
    </AppWrapper>
  );
}

App.propTypes = {
};

App.defaultProps = {
};
