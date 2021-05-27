import React from 'react'
import { WeatherIcon } from 'components/WeatherIcon'

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

interface DailyWeatherEntryProps {
  icon: string
  min: number
  max: number
  time: number
}

export const DailyWeatherEntryMobile = ({ icon, min, max, time }: DailyWeatherEntryProps) => (
  <div className="d-flex flex-row align-items-center justify-content-end">
    <div className="d-flex w-25 justify-content-end">{dayString(time)}</div>
    <div className="d-flex w-25 justify-content-end"><WeatherIcon icon={icon} size={50} /></div>
    <div className="w-25 d-flex justify-content-end p-2">
      H {Math.round(max)}°
    </div>
    <div className="w-25">
      L {Math.round(min)}°
    </div>
  </div>
)

export const DailyWeatherEntry = ({ icon, min, max, time }: DailyWeatherEntryProps) => (
  <div className="d-flex flex-row align-items-center justify-content-end">
    <div className="d-flex w-25 justify-content-end p-2"><h3>{dayString(time)}</h3></div>
    <div className="w-25 d-flex justify-content-end"><WeatherIcon icon={icon} size={80} /></div>
    <div className="w-25 d-flex justify-content-end p-2">
      <h4>High {Math.round(max)}°</h4>
    </div>
    <div className="w-25 px-2">
      <h4>Low {Math.round(min)}°</h4>
    </div>
  </div>
)

const dayString = (unixTime: number): string => {
  const date = new Date(unixTime * 1000)
  return DAYS[date.getDay()]
}
