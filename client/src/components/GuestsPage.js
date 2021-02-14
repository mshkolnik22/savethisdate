import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import GuestForm from "./GuestForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const GuestsPage = (props) => {
  const [guests, setGuests] = useState([])
  const [errors, setErrors] = useState([])

  const user = props.user

  const getGuests = async () => {
    try {
      const response = await fetch("/api/v1/guests")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setGuests(body.guests)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getGuests()
  }, [])

  const addGuest = async (guestPayload) => {
    try {
      const response = await fetch("/api/v1/guests", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(guestPayload),
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body = await response.json()
        const updatedGuests = guests.concat(body.guest)
        setGuests(updatedGuests)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  const guestListItems = guests.map((guestItem) => {
    return (
      <li key={guestItem.id}>
        <Link to={`/guests/${guestItem.id}`}>{guestItem.name}</Link>
      </li>
    )
  })

  const sortedArray = (guests, fieldName = 'name') => {
    return guests.sort(function (a, b) {
      const fullName = fieldName.split(' ')
      const firstName = fullName[0]
      const lastName = fullName[fullName.length - 1]
      const name = lastName + firstName

      const nameA = a[name].toLowerCase(), nameB = b[name].toLowerCase()
      if (nameA < nameB) 
        return -1
      if (nameA > nameB)
        return 1
      return 0 
    })
  }

return (
  <div>
    <div>
      <div>
        <h3>Your Guests:</h3>
        <ul>{guestListItems}</ul>
      </div>
      <div className="flex-large">
        <Table
          primaryKey={'id'}
          title={'Guest List'}
          columns={['Guest Name', 'Email', 'Phone Number']}
          rowsKeys={['name', 'email', 'phone']}
          data={sortedArray(guests)} />
      </div>
      <div>
        <h3>Add New Guest:</h3>
        <ErrorList errors={errors} />
        <GuestForm addGuest={addGuest} />
      </div>
    </div>
  </div>
)
//<Phonebook addGuest={addGuest} />

}

export default GuestsPage