export const getStorageContextValueMock = (getFn: Function, setFn?: Function) => {
  return {
    setItem: setFn || (() => {}),
    getItem: <T>(key: string) => {
      return getFn(key)
    },
  }
}

export const getStorageMock = (initialState: any) => {
  const ls: any = initialState || {}
  return {
    setItem: (key: string, data: any) => {
      ls[key] = data
    },
    getItem: (key: string) => {
      return ls[key]
    },
  }
}
