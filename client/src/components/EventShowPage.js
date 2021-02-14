import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import GuestForm from "./GuestForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const EventShowPage = (props) => {
  const userStatus = props.user

  const [event, setEvent] = useState({
    guests: [],
  })
  const { id } = useParams()

  const [errors, setErrors] = useState([])
  const [loginStatus, setLoginStatus] = useState(true)

  const getEvent = async () => {
    try {
      const response = await fetch(`/api/v1/events/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setEvent(body.trail)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getEvent()
  }, [])

  const addGuest = async (newGuestData) => {
    if (!userStatus) {
      setLoginStatus(false)
    } else {
      try {
        const response = await fetch(`/api/v1/events/${id}/guests`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(newGuestData),
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
          setEvents({
            ...event,
            guests: [...event.guests, body.newGuest],
          })
        }
      } catch (error) {
        console.error(`Error in fetch: ${error.message}`)
      }
    }
  }

  const getGuests = event.guests.map((guest) => {
    return (
      <ul key={guest.id}>
        <li>Comment: {guest.comment}</li>
        <li>Rating: {guest.rating}</li>
      </ul>
    )
  })

  let loginStatusError = ""

  if (!loginStatus) {
    loginStatusError = (
      <div>
        <p>
          <p className="padding">Sign In to Add a Guest:</p>
          <Link className="button padding" to="/users/new">
            Register
          </Link>
          <Link className="button padding" to="/user-sessions/new">
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="event-bg-img-show">
      <ul>
        <li>First Name: {event.firstName}</li>
        <li>Last Name: {event.lastName}</li>
        <li>Email: {event.email}</li>
        <li>Phone: {event.phone}</li>
        <li>RSVP Status: {event.rsvp}</li>
      </ul>
      <div>
        <ErrorList errors={errors} />
        {loginStatusError}
        <GuestForm addGuest={addGuest} userStatus={userStatus} />
        {getGuests}
      </div>
    </div>
  )
}


export default EventShowPage
 


