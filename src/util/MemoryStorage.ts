import { StorageProvider } from 'types'

class MemoryStorage<T> implements StorageProvider<T> {
  private storage: Map<string, T> = new Map()

  clear = () => this.storage.clear()
  getAll = () => Object.fromEntries(this.storage)
  getList = () => Object.entries(this.getAll())
  setItem = (name: string, value: T) => this.storage.set(name, value)
  removeItem = (name: string) => this.storage.delete(name)
}