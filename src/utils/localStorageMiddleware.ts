import { Middleware } from 'redux';
import { getItem, setItem } from './storage';

export const STORAGE_SET = 'STORAGE_SET';
export const STORAGE_GET = 'STORAGE_GET';

const localStorageMiddleware: Middleware = () => {
  return next => (action) => {
    switch (action.type) {
      case STORAGE_SET:
        return setItem(
          action.payload.key,
          action.payload.data,
        );

      case STORAGE_GET:
        return getItem(action.payload);

      default:
        break;
    }
    return next(action);
  };
};

export default localStorageMiddleware;
