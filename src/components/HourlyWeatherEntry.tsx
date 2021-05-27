import React from 'react'
import { WeatherIcon } from 'components/WeatherIcon'

interface HourlyWeatherEntryProps {
  time: number
  temp: number
  icon: string
}

export const HourlyWeatherEntry = ({ time, temp, icon }: HourlyWeatherEntryProps) => (
  <td align="center" data-testid="hourly-weather-entry">
    <TwelveHourTime time={time} />
    <div>
      <WeatherIcon icon={icon} size={50} />
    </div>
    <div>{Math.round(temp)}°</div>
  </td>
)

const TwelveHourTime = ({ time }: { time: number }) => {
  const date = new Date(time * 1000)
  const hours = date.getHours()
  const period = hours < 12 ? 'AM' : 'PM'

  return <div data-testid="hourly-weather-time">{(hours % 12) || 12} {period}</div>
}
