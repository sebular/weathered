import { cachedApi, CACHE_SECONDS } from '../api'

const createMockStorage = () => {
  const store: Map<string, string> = new Map()

  const storage: Storage = {
    clear: () => store.clear(),
    getItem: (key: string) => store.get(key) || null,
    key: (index: number) => [...store.keys()][index] || null,
    length: store.size,
    removeItem: (key: string) => store.delete(key),
    setItem: (key: string, value: string) => store.set(key, value)
  }

  return { store, storage }
}

const mockFetch = (response: any) => async () => ({
  json: async () => response
} as any)

const responses = {
  one: { response: 'one' },
  two: { response: 'two' },
}

describe('cachedApi', () => {
  it('should return the result', async () => {
    const mockedFetch = mockFetch(responses.one)
    const { storage } = createMockStorage()
    const api = cachedApi(storage, mockedFetch)

    const result = await api.getCached('/test-url')
    expect(result).toEqual(responses.one)
  })

  it('should cache the result', async () => {
    const mockedFetch = mockFetch(responses.one)
    const { store, storage } = createMockStorage()
    const api = cachedApi(storage, mockedFetch)

    const now = Date.now()
    jest.spyOn(Date, 'now').mockImplementation(() => now)

    await api.getCached('/test-url')
    const stored = store.get('/test-url')
    expect(stored).toBeTruthy()

    const { data, storedAt } = JSON.parse(stored!)
    expect(data).toEqual(responses.one)
    expect(storedAt).toEqual(now)
  })

  it('should return from the cache', async () => {
    const mockedFetch = mockFetch(responses.two)
    const { store, storage } = createMockStorage()
    const api = cachedApi(storage, mockedFetch)

    const now = Date.now()
    jest.spyOn(Date, 'now').mockImplementation(() => now)

    const storedAt = now - ((CACHE_SECONDS * 1000))
    storage.setItem('/test-url', JSON.stringify({ data: responses.one, storedAt }))

    const result = await api.getCached('/test-url')
    expect(result).toEqual(responses.one)

    const stored = store.get('/test-url')
    expect(stored).toBeTruthy()

    const cached = JSON.parse(stored!)
    expect(cached.storedAt).toEqual(storedAt)
  })

  it('should expire and update the cache', async () => {
    const mockedFetch = mockFetch(responses.two)
    const { store, storage } = createMockStorage()
    const api = cachedApi(storage, mockedFetch)

    const now = Date.now()
    jest.spyOn(Date, 'now').mockImplementation(() => now)

    const storedAt = now - ((CACHE_SECONDS * 1000) + 1)
    storage.setItem('/test-url', JSON.stringify({ data: responses.one, storedAt }))

    const result = await api.getCached('/test-url')

    expect(result).toEqual(responses.two)

    const stored = store.get('/test-url')
    expect(stored).toBeTruthy()

    const cached = JSON.parse(stored!)
    expect(cached.storedAt).toEqual(now)
  })
})