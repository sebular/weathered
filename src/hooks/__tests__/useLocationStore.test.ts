import { renderHook, act } from '@testing-library/react-hooks'
import { useLocationStore } from 'hooks/useLocationStore'
import { LocalStorage } from 'util/LocalStorage'
import { WeatherLocation } from 'types'

const locationOne: WeatherLocation = {
  id: 'my-location',
  city: 'My Location',
  lat: 10,
  lon: 10
}

const locationTwo: WeatherLocation = {
  id: 'my-location-2',
  city: 'My Location 2',
  lat: 84,
  lon: 48
}

const newStorage = () => new LocalStorage<WeatherLocation>(`${Math.random()}`)

describe('useLocationStore', () => {
  it('should store a single location', () => {
    const { result } = renderHook(() => useLocationStore(newStorage()))

    act(() => {
      result.current.addLocation(locationOne.id, locationOne)
    })

    expect(result.current.store).toEqual([[locationOne.id, locationOne]])
  })

  it('should overwrite existing locations', () => {
    const { result } = renderHook(() => useLocationStore(newStorage()))

    act(() => {
      result.current.addLocation(locationOne.id, locationOne)
      result.current.addLocation(locationOne.id, locationOne)
    })

    expect(result.current.store).toEqual([[locationOne.id, locationOne]])
  })

  it('should store multiple locations', () => {
    const { result } = renderHook(() => useLocationStore(newStorage()))

    act(() => {
      result.current.addLocation(locationOne.id, locationOne)
      result.current.addLocation(locationTwo.id, locationTwo)
    })

    expect(result.current.store).toEqual([
      [locationOne.id, locationOne],
      [locationTwo.id, locationTwo]
    ])
  })

  it('should retrieve a location', () => {
    const { result } = renderHook(() => useLocationStore(newStorage()))

    act(() => {
      result.current.addLocation(locationOne.id, locationOne)
    })

    expect(result.current.getLocation(locationOne.id)).toEqual(locationOne)
  })

  it('should remove locations', () => {
    const { result } = renderHook(() => useLocationStore(newStorage()))

    act(() => {
      result.current.addLocation(locationOne.id, locationOne)
      result.current.removeLocation(locationOne.id)
    })

    expect(result.current.store).toEqual([])
  })


  it('should clear locations', () => {
    const { result } = renderHook(() => useLocationStore(newStorage()))

    act(() => {
      result.current.addLocation(locationOne.id, locationOne)
      result.current.addLocation(locationTwo.id, locationTwo)
      result.current.clearAllLocations()
    })

    expect(result.current.store).toEqual([])
  })
})