import { renderHook, act } from '@testing-library/react-hooks'
import { cities } from 'cities'
import { useLocation, getWeatherLocation, getDistance } from 'hooks/useLocation'

const getCities = (...ids: string[]) => cities.filter(c => ids.includes(c[0]))

describe('getDistance', () => {
  it('should calculate distance 0 for the same point', () => {
    const a = { lat: 0, lon: 0 }
    const b = { lat: 0, lon: 0 }
    expect(getDistance(a, b)).toEqual(0)
  })

  it('should calculate distance along latitude', () => {
    const a = { lat: 1, lon: 1 }
    const b = { lat: 6, lon: 1 }
    expect(getDistance(a, b)).toEqual(5)
  })

  it('should calculate distance along longitude', () => {
    const a = { lat: 2, lon: 2 }
    const b = { lat: 2, lon: -3 }
    expect(getDistance(a, b)).toEqual(5)
  })

  it('should calculate distance along latitude and longitude', () => {
    const a = { lat: 0, lon: 0 }
    const b = { lat: Math.sqrt(2), lon: -Math.sqrt(2) }
    expect(getDistance(a, b)).toEqual(2)
  })
})

describe('getWeatherLocation', () => {
  it('should find the nearest city in the dataset', () => {
    const usaCities = getCities(
      'seattle-united-states',
      'san-francsisco-united-states',
      'milwaukee-united-states',
      'houston-united-states',
      'jersey-city-united-states',
      'new-york-city-united-states'
    )
    const [id, city, lat, lon] = cities.find(c => c[0] === 'charlotte-united-states')!
    expect(getWeatherLocation({ lat, lon }, usaCities).id).toEqual('jersey-city-united-states')
  })

  it('should find the nearest city but preserve real coordnates', () => {
    const actualSeattle = { lat: 47.60, lon: -122.32 }
    const weatherLocation = getWeatherLocation(actualSeattle)
    expect(weatherLocation.id).toEqual('seattle-united-states')
    expect(weatherLocation.lat).toEqual(actualSeattle.lat)
    expect(weatherLocation.lon).toEqual(actualSeattle.lon)
  })

})

describe('useLocation', () => {
  it('should request location from the browser and set it in state', async () => {
    const mockedGetCurrentPosition = jest.fn((callback: PositionCallback) => {
      const position = { coords: { latitude: 40, longitude: -4 } }
      callback(position as any)
    })

    const { navigator } = window
    const navSpy = jest.spyOn(window, 'navigator', 'get')
    navSpy.mockImplementation(() => ({
      ...navigator,
      geolocation: {
        ...navigator.geolocation,
        getCurrentPosition: mockedGetCurrentPosition
      }
    }))
    const { result } = renderHook(() => useLocation())

    act(() => {
      result.current.requestAccess()
    })

    expect(navSpy).toHaveBeenCalledTimes(1)
    expect(result.current.location).toEqual({
      id: 'madrid-spain',
      city: 'Madrid, Spain',
      lat: 40,
      lon: -4
    })
  })
})