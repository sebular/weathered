export interface WeatherLocation {
  id: string
  city: string
  lat: number
  lon: number
}

export interface GeoCoordinates {
  lat: number
  lon: number
}

export interface StorageProvider<T> {
  clear: () => void
  getAll: () => { [name: string]: T }
  getList: () => [string, T][]
  setItem: (name: string, value: T) => void
  removeItem: (name: string) => void
}

export interface OneCallForecast {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: WeatherCurrent
  minutely: WeatherMinutely[]
  hourly: WeatherHourly[]
  daily: WeatherDaily[]
}

export interface WeatherCurrent {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: SimpleWeather[]
}

export interface WeatherHourly {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: SimpleWeather[]
  pop: number
  rain?: { '1h': number }
}

export interface WeatherDaily {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: DailyTemp
  feels_like: DailyFeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: SimpleWeather[]
  clouds: number
  pop: number
  rain?: number
  uvi: number
}

export interface DailyTemp {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

export interface DailyFeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}

export interface WeatherMinutely {
  dt: number 
  precipitation: number
}

export interface SimpleWeather {
  id: number
  main: string
  description: string
  icon: string
}