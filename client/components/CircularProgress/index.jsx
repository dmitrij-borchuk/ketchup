import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

// const Circle = styled.div`
//   align-items: center;
//   border: 3px solid #b71c1c;
//   border-radius: 50%;
//   display: flex;
//   box-sizing: border-box;
//   justify-content: center;
//   ${props => css`
//     height: ${props.size};
//     width: ${props.size};
//   `}
// `;

const Circle = styled.circle`
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
  stroke: #666;
  stroke-width: 5px;
}`;

const CircleBar = Circle.extend`
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1s linear;
  stroke: #666;
  stroke-width: 5px;
  stroke: #FF9F1E;
  ${props => css`
    stroke-dashoffset: ${props.progress};
  `}
}`;
// #cont {
//   display: block;
//   height: 200px;
//   width: 200px;
//   margin: 2em auto;
//   box - shadow: 0 0 1em black;
//   border - radius: 100 %;
//   position: relative;
// }
// #cont: after {
//   position: absolute;
//   display: block;
//   height: 160px;
//   width: 160px;
//   left: 50 %;
//   top: 50 %;
//   box - shadow: inset 0 0 1em black;
//   content: attr(data - pct)"%";
//   margin - top: -80px;
//   margin - left: -80px;
//   border - radius: 100 %;
//   line - height: 160px;
//   font - size: 2em;
//   text - shadow: 0 0 0.5em black;
// }

export default function CircularProgress(props) {
  const {
    // children,
    size,
    progress,
  } = props;
  const r = 90;
  const c = Math.PI * (r * 2);
  const percentage = Math.max(Math.min(progress, 100), 0);
  const pct = ((100 - percentage) / 100) * c;

  return (
    <svg id="svg" width={size} height={size} viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <Circle r={r} cx="100" cy="100" fill="transparent" strokeDashoffset="0" />
      <CircleBar progress={pct} r={r} cx="100" cy="100" fill="transparent" strokeDashoffset="0" />
    </svg>
    // <Circle size={size}>
    //   <div>
    //     {children}
    //   </div>
    // </Circle>
  );
}

CircularProgress.propTypes = {
  // children: PropTypes.oneOfType([
  //   PropTypes.node,
  //   PropTypes.string,
  // ]),
  size: PropTypes.string,
  progress: PropTypes.number,
};

CircularProgress.defaultProps = {
  // children: '',
  size: '100px',
  progress: 0,
};
