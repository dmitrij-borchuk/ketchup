/* eslint-disable import/prefer-default-export */
export const createDispatch = (state, mock) => (action) => {
  function dispatch(a) {
    if (typeof a === 'function') {
      return a(dispatch, () => state);
    }
    return mock(a);
  }
  return dispatch(action);
};

export const createStoreMock = state => ({
  getState: () => state,
  subscribe: () => {},
  dispatch: () => {},
});

export const getFirstCallForActionType = (mock, type) => mock.mock.calls.filter(
  call => call[0].type === type,
)[0];

export const onActionType = (type, cb) => (action) => {
  if (action.type === type) {
    return cb();
  }
  return null;
};
