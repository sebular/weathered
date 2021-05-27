import React from 'react'
import { WeatherDaily } from 'types'
import { DailyWeatherEntry, DailyWeatherEntryMobile } from 'components/DailyWeatherEntry'

export const DailyWeather = ({ daily }: { daily: WeatherDaily[] }) => (
  <>
    <div className="container d-md-none">
      {daily.map(day => (
        <DailyWeatherEntryMobile
          key={`d${day.dt}`}
          time={day.dt}
          icon={day.weather[0].icon}
          max={day.temp.max}
          min={day.temp.min}
        />
      ))}
    </div>

    <div className="container d-none d-md-block">
      {daily.map(day => (
        <DailyWeatherEntry
          key={`d${day.dt}`}
          time={day.dt}
          icon={day.weather[0].icon}
          max={day.temp.max}
          min={day.temp.min}
        />
      ))}
    </div>
  </>
)