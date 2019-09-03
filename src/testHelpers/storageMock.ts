export const getStorageContextValueMock = (fn: Function) => {
  return {
    setItem: () => { },
    getItem: <T>(key: string) => {
      return fn(key)
    },
  }
}
