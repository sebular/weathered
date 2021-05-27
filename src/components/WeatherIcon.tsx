import React from 'react'
import { IconType } from 'react-icons/lib'
import * as W from 'react-icons/wi'

const IconMap: { [key: string]: IconType} = {
  '01d': W.WiDaySunny,
  '02d': W.WiDaySunnyOvercast,
  '03d': W.WiDayCloudy,
  '04d': W.WiDayCloudy,
  '09d': W.WiDayShowers,
  '10d': W.WiDayRain,
  '11d': W.WiThunderstorm,
  '13d': W.WiDaySnow,
  '50d': W.WiFog,

  '01n': W.WiNightClear,
  '02n': W.WiNightPartlyCloudy,
  '03n': W.WiNightAltCloudy,
  '04n': W.WiNightAltCloudy,
  '09n': W.WiNightAltShowers,
  '10n': W.WiNightAltRain,
  '11n': W.WiNightAltThunderstorm,
  '13n': W.WiNightAltSnow,
  '50n': W.WiNightFog
}

const DefaultWeatherIcon = W.WiAlien

export interface WeatherIconProps {
  icon: string
  size: number

}

export const WeatherIcon = ({ icon, size }: WeatherIconProps) => {
  const Icon = IconMap[icon] || DefaultWeatherIcon
  return <Icon size={size} />
}