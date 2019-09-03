import React, { createContext } from 'react'
import { getItem, setItem } from '../utils/storage'

const defaultContextValue: IStorageContextValue = {
  getItem,
  setItem,
}

export interface IStorageContextValue {
  getItem: <T>(key: string) => T | null
  setItem: <T>(key: string, data: T) => void
}
export const StorageContext = createContext<IStorageContextValue>(defaultContextValue)

export const StorageContextProvider: React.FC = ({ children }) => {
  return (
    <StorageContext.Provider value={defaultContextValue}>
      {children}
    </StorageContext.Provider>
  )
}
