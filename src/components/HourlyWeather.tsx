import React from 'react'
import { WeatherHourly } from 'types'
import { HourlyWeatherEntry } from 'components/HourlyWeatherEntry'

export const HourlyWeather = ({ hourly }: { hourly: WeatherHourly[] }) => (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            <tr>
              {hourly.slice(0, 25).map(hour => (
                <HourlyWeatherEntry
                  key={hour.dt}
                  time={hour.dt}
                  temp={hour.temp}
                  icon={hour.weather[0].icon}
                />
              ))}
            </tr>
          </tbody>
        </table>
      </div>

)