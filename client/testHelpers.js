/* eslint-disable import/prefer-default-export */
export const createDispatch = (state, mock) => (action) => {
  function dispatch(a) {
    if (typeof a === 'function') {
      a(dispatch, () => state);
    } else {
      mock(a);
    }
  }
  dispatch(action);
};
