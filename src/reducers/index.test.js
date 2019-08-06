import reducer from './index';

describe('All reducers', () => {
  it('should contain keys', () => {
    const newState = reducer(undefined, { type: null });
    const keys = Object.keys(newState);

    expect(keys).toContain('timer');
  });
});
