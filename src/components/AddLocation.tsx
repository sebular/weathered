import React, { FC, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Typeahead } from 'react-bootstrap-typeahead'
import { cities } from 'cities'

const options = cities.map(c => ({ id: c[0], label: c[1], lat: c[2], lon: c[3] }))

export interface AddLocationProps {
  open: boolean
  setOpen: (open: boolean) => void
  addLocation: (id: string, city: string, lat: number, lon: number) => void
}


export const AddLocation: FC<AddLocationProps> = ({ open, setOpen, addLocation })=> {
  const [selected, setSelected] = useState([])

  const addSelected = () => {
    const [{ id, label, lat, lon }] = selected
    addLocation(id, label, lat, lon)
    setOpen(false)
  }

  return (
    <Modal show={open} onHide={() => setOpen(false)}>
      <Modal.Header>
        <Modal.Title>Add A Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <Typeahead
            id="city-finder"
            placeholder="Find a city..."
            onChange={setSelected}
            options={options}
            selected={selected}

          />

        </div>

      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
        <button className="btn btn-primary" onClick={() => addSelected()}>Add</button>

      </Modal.Footer>
    </Modal>
  )
}