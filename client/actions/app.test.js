import {
  LOCAL_STORAGE_KEYS,
} from '../constants';
import {
  STORAGE_GET,
  STORAGE_SET,
} from '../utils/localStorageMiddleware';
import {
  createDispatch,
  getFirstCallForActionType,
  onActionType,
} from '../testHelpers';

import {
  showSettings,
  SHOW_SETTINGS,
  hideSettings,
  HIDE_SETTINGS,
  setSettings,
  SET_SETTINGS,
  restoreSettings,
} from './app';

describe('App actions', () => {
  afterEach(() => jest.clearAllTimers());

  describe('`showSettings` action', () => {
    it('should return appropriate dataset', () => {
      const action = showSettings();

      expect(action).toEqual({
        type: SHOW_SETTINGS,
      });
    });
  });

  describe('`hideSettings` action', () => {
    it('should return appropriate dataset', () => {
      const action = hideSettings();

      expect(action).toEqual({
        type: HIDE_SETTINGS,
      });
    });
  });

  describe('`setSettings` action', () => {
    it('should return appropriate dataset', () => {
      const state = {
        app: {
          settings: {},
        },
      };
      const dispatchMock = jest.fn();
      const dispatch = createDispatch(state, dispatchMock);
      const data = {};

      dispatch(setSettings(data));

      const actionCall = getFirstCallForActionType(dispatchMock, SET_SETTINGS);
      const storageActionCall = getFirstCallForActionType(dispatchMock, STORAGE_SET);
      expect(actionCall[0].payload).toEqual(data);
      expect(storageActionCall[0].payload).toEqual({
        key: LOCAL_STORAGE_KEYS.SETTINGS,
        data,
      });
    });
  });

  describe('`restoreSettings` action', () => {
    it('should return appropriate dataset', () => {
      const state = {
        app: {
          settings: {},
        },
      };
      const data = {
        sessions: [{
          length: 666,
          name: 'session1',
        }],
      };
      const dispatchMock = jest.fn(onActionType(STORAGE_GET, () => data));
      const dispatch = createDispatch(state, dispatchMock);

      dispatch(restoreSettings());

      const actionCall = getFirstCallForActionType(dispatchMock, SET_SETTINGS);
      expect(actionCall[0].payload).toEqual(data);
    });
  });
});
