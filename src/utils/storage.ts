// eslint-disable-next-line no-undef
const store = localStorage;

export const setItem = <T>(key: string, data: T) => store.setItem(key, JSON.stringify(data));
export const getItem = <T>(key: string): T | null => {
  const data = store.getItem(key);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};
