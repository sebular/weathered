export const CACHE_SECONDS = 240 

interface CachedResult<T> {
  data: T,
  storedAt: number
}

export const cachedApi = (storage: Storage, fetch: typeof window.fetch=window.fetch) => {
  const getCached = async <T>(url: string): Promise<T> => {
    const cachedRaw = storage.getItem(url)
    if (!cachedRaw) {
      return getAndCache<T>(url)
    }

    const { data, storedAt }: CachedResult<T> = JSON.parse(cachedRaw)
    if (Date.now() - storedAt > CACHE_SECONDS * 1000) {
      return getAndCache<T>(url)
    }

    return data
  }

  const getAndCache = async <T>(url: string): Promise<T> => {
      const data = await fetch(url).then(res => res.json()) as T
      const cache: CachedResult<T> = { data, storedAt: Date.now() }
      storage.setItem(url, JSON.stringify(cache))
      return data
  }

  return { getCached, getAndCache }
}

export const getForecastUrl = (lat: number, lon: number) =>
  `/open-weather?lat=${lat}&lon=${lon}&units=imperial`