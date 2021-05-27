import { useState, useRef } from 'react'
import { StorageProvider, WeatherLocation } from 'types'

export const useLocationStore = (storageProvider: StorageProvider<WeatherLocation>) => {
  const storeRef = useRef<StorageProvider<WeatherLocation>>(storageProvider)
  const [store, setStore] = useState<[string, WeatherLocation][]>(storageProvider.getList())
  
  const addLocation = (name: string, location: WeatherLocation) => {
    storeRef.current.setItem(name, location)
    setStore(storeRef.current.getList())
  }

  const getLocation = (name: string): WeatherLocation|null => {
    return storeRef.current.getAll()[name] || null
  }

  const removeLocation = (name: string) => {
    storeRef.current.removeItem(name)
    setStore(storeRef.current.getList())
  }

  const clearAllLocations = () => {
    storeRef.current.clear()
    setStore(storeRef.current.getList())
  }

  return {
    store,
    addLocation,
    getLocation,
    removeLocation,
    clearAllLocations
  }
}


