import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { LocationEntry } from 'types'

interface LocationRowProps {
  cityId: string
  location: LocationEntry
  onDelete: (name: string) => void
}

export const LocationRow: FC<LocationRowProps> = props => {
  const history = useHistory()

  return (
    <li className="list-group-item">
      <div className="d-flex flex-row align-items-center">
        <div className="w-75 d-flex">
          <button
            className="btn btn-outline-primary"
            onClick={() => history.push(`/forecast/${props.cityId}`)}
          >
            {props.location.city}
          </button>
        </div>

        <div className="w-25 d-flex justify-content-end">
          <button
            className="btn btn-outline-danger d-sm-none"
            onClick={() => props.onDelete(props.cityId)}
          >
              <IoCloseCircleOutline />
          </button>
          <button
            className="btn btn-outline-danger d-none d-sm-block"
            onClick={() => props.onDelete(props.cityId)}
          >
              <IoCloseCircleOutline /> remove
          </button>
        </div>
      </div>
    </li>
  )
}
