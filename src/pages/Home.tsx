import React, { useState, useEffect } from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import { AddLocation } from 'components/AddLocation'
import { LocationRow } from 'components/LocationRow'
import { useLocation } from 'hooks/useLocation'
import { useLocationStore } from 'hooks/useLocationStore'
import { LocalStorage } from 'util/LocalStorage'

export const Home = () => {
  const { location, requestAccess } = useLocation()
  const storage = useLocationStore(new LocalStorage('saved-locations'))
  const [open, setOpen] = useState(false)

  const addLocation = (id: string, city: string, lat: number, lon: number) => {
    storage.addLocation(id, { id, city, lat, lon })
  }

  useEffect(() => {
    if (!location) { return }
    (async () => {
      const { id } = location
      storage.addLocation(id, location)
    })()
  }, [location])

  return (
    <div className="mt-3">
      <h1>Weathered</h1>
      <h2>Locations</h2>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={requestAccess}>
          <IoLocationSharp color="white" /> add current location
        </button>
        <button className="btn btn-secondary mx-3" onClick={() => setOpen(true)}>
          search
        </button>

      </div>

      <ul className="list-group" style={{ maxWidth: '1024px' }}>
        {storage.store.map(([id, location]) => (
          <LocationRow
            key={id}
            cityId={id}
            location={location}
            onDelete={name => storage.removeLocation(name)}
          />
        ))}
      </ul>
      <AddLocation open={open} setOpen={setOpen} addLocation={addLocation} />
    </div>
  )
}