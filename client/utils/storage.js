// eslint-disable-next-line no-undef
const store = localStorage;

export const setItem = (key, data) => store.setItem(key, JSON.stringify(data));
export const getItem = key => JSON.parse(store.getItem(key));
