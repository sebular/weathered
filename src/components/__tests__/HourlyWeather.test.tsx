import React from 'react'
import { render, screen } from '@testing-library/react'

import { HourlyWeather } from 'components/HourlyWeather'
import { SampleResponse } from 'SampleOneCallResponse'

describe('<HourlyWeather />', () => {

  it('should limit the number of hourly entries', async () => {
    const hourlyWeather = render(<HourlyWeather hourly={SampleResponse.hourly} />)

    const entries = await hourlyWeather.getAllByTestId('hourly-weather-entry')
    expect(entries.length).toBe(25)

  })

  it('should correctly render 24 hour time', async () => {
    const hourlyWeather = render(<HourlyWeather hourly={SampleResponse.hourly} />)

    const timeEntries = await hourlyWeather.getAllByTestId('hourly-weather-time')

    const midnightEntry = timeEntries[6]
    expect(midnightEntry.innerHTML).toEqual('12 AM')

    const oneAmEntry = timeEntries[7]
    expect(oneAmEntry.innerHTML).toEqual('1 AM')

  })
})