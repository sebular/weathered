import { useState } from 'react'
import { GeoCoordinates, WeatherLocation } from 'types'
import { cities } from 'cities'

export const useLocation = () => {
  const [location, setLocation] = useState<WeatherLocation|null>(null)

  const requestAccess = () => {
    try {
      window.navigator.geolocation.getCurrentPosition(saveLocation)
    } catch (e) {
      setLocation(null)
    }
  }

  const saveLocation = (location: GeolocationPosition) => {
    const geoCoordinates = {
      lat: location.coords.latitude,
      lon: location.coords.longitude
    }
    setLocation(getWeatherLocation(geoCoordinates))
  }

  return { location, requestAccess }
}

export const getWeatherLocation = (location: GeoCoordinates, cityList: [string, string, number, number][]=cities): WeatherLocation => {
  const { id, city } = cityList.reduce(({ id, city, distance }, [cityId, name, lat, lon]) => {
    const dist = getDistance(location, { lat, lon })
    if (dist < distance) {
      return { id: cityId, city: name, distance: dist }
    }
    return { id, city, distance }
  }, { id: 'my-location', city: 'My Location', distance: Infinity})

  return { id, city, ...location }
}

export const getDistance = (a: GeoCoordinates, b: GeoCoordinates): number => {
  return Math.sqrt((a.lat - b.lat) ** 2 + (a.lon - b.lon) ** 2)
}