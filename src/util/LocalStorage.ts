import { StorageProvider } from 'types'

export class LocalStorage<T> implements StorageProvider<T> {
  private storage = window.localStorage

  constructor(private key: string) {}

  clear = () => this.save()

  getAll = () => this.retrieve()
  
  getList = () => Object.entries(this.retrieve())

  setItem = (name: string, value: T) => {
    this.save({ ...this.retrieve(), [name]: value })
  }

  removeItem = (name: string) => {
    const store = this.retrieve()
    delete store[name]
    this.save(store)
  }

  private retrieve = (): { [name: string]: T } => {
    const raw = this.storage.getItem(this.key)
    if (!raw) { return {} }
    return JSON.parse(raw) as { [name: string]: T }
  }

  private save = (data?: { [name: string]: T }) => {
    if (!data) {
      return this.storage.removeItem(this.key)
    }
    this.storage.setItem(this.key, JSON.stringify(data))
  }
}