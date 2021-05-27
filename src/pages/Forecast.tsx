import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { cachedApi, getForecastUrl } from 'api'
import { cities } from 'cities'
import { useLocationStore } from 'hooks/useLocationStore'
import { OneCallForecast } from 'types'
import { LocalStorage } from 'util/LocalStorage'
import { DailyWeather } from 'components/DailyWeather'
import { HourlyWeather } from 'components/HourlyWeather'
import { FaMapMarkedAlt } from 'react-icons/fa'


export const Forecast = () => {
  const history = useHistory()
  const { cityId } = useParams<{ cityId: string }>()
  const [forecast, setForecast] = useState<OneCallForecast|null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const storage = useLocationStore(new LocalStorage('saved-locations'))
  const [city, setCity] = useState<string>('')
  const [lat, setLat] = useState<number|null>(null)
  const [lon, setLon] = useState<number|null>(null)
  const api = cachedApi(window.localStorage)

  useEffect(() => {
    const cityEntry = cities.find(c => c[0] === cityId)
    if (cityEntry) {
      const [id, city, latitude, longitude] = cityEntry
      setLat(latitude)
      setLon(longitude)
      setCity(city)
      return
    }

    const storedEntry = storage.getLocation(cityId)
    if (storedEntry) {
      setLat(storedEntry.lat)
      setLon(storedEntry.lon)
      setCity(storedEntry.city)
    }
  }, [])

  useEffect(() => {
    if (lat === null || lon === null) { return }

    (async () => {
      const forecastData = await api.getCached<OneCallForecast>(getForecastUrl(lat, lon))
      setForecast(forecastData)
      setLoading(false)
    })()
  }, [lat, lon])


  if (loading || !forecast) {
    return (
      <div className="col">
        loading...
      </div>
    )
  }

  return (
    <div className="col">
      <h1>{city}
        &nbsp;&nbsp;&nbsp;
        <button
          className="btn btn-secondary"
          onClick={() => history.push('/')}
        ><FaMapMarkedAlt color="white" /> Locations</button>
      </h1>
      <HourlyWeather hourly={forecast.hourly} />
      <DailyWeather daily={forecast.daily} />
    </div>
  )
}
