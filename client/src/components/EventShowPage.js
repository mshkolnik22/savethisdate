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
      setEvent(body.event)
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
          setEvent({
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
      <div>
      <ul key={guest.id}>
        <li>First Name: {guest.firstName}</li>
        <li>Last Name: {guest.lastName}</li>
        <li>Email: {guest.email}</li>
        <li>Phone: {guest.phone}</li>
        <li>RSVP: {guest.rsvp}</li>
      </ul>
      </div>
    )
  })

  let loginStatusError = ""

  if (!loginStatus) {
    loginStatusError = (
      <div>
        <p>
          <p className="padding">Add a Guest:</p>
          <Link to="/users/new">
            <Button variant="contained" color="primary">
              Register
            </Button>
          </Link>
          <Link to="/user-sessions/new">
            <Button variant="contained" color="primary">
             Sign In
            </Button>
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="event-bg-img-show">
      <div>
      <p> Your Event Details: </p>
      <ul>
        <li>Title: {event.title}</li>
        <li>Type of Event: {event.typeOfEvent}</li>
        <li>Description: {event.description}</li>
        <li>Hosted By: {event.hostedBy}</li>
        <li>Host's Email: {event.hostEmail}</li>
        <li>Virtual Link: {event.linkURL}</li>
        <li>Location: {event.location}</li>
        <li>Date of the Event: {event.date}</li>
        <li>Time of the Event: {event.time}</li>
        <li>Reminder: {event.reminder}</li>
      </ul>
      </div>
      <div>
        <p>Your Guest List:</p>
      </div>
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
 


