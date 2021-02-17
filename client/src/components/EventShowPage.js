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
      <ul className="div-tile" key={guest.id}>
        <li>{guest.firstName} {guest.lastName}</li>
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

  const sendSMSHandler = async (event) => {
    event.preventDefault();
    console.log("Ring")
    try {
      const response = await fetch("/api/v1/sms", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: "",
      })
      if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
      } else {
          const body = await response.json()   
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const showSendSMSLink = () => {
    return (
      <Link to="/sms">
        <button type="button" onClick={sendSMSHandler}>
          Send an SMS
        </button>
      </Link>
  )}

  return (
    <div className="event-bg-img-show">
      <div className="row-container vertical">
        
        <div>
            
          </div>
          <div>
            <h3> Your Event Details: </h3>
            <div className="post-it">
            
            <div className="cute">
              <p>Title: {event.title}</p>
              <p>Hosted By: {event.hostedBy}</p>
              <p>Host's Email: {event.hostEmail}</p>
              <p>Date of the Event: {event.date}</p>
              <p>Time of the Event: {event.time}</p>
              <h3>Send a Text: </h3>
              {showSendSMSLink()}
            </div>

            
          </div>
        </div>
      
      </div>
      <div className="row-container horizontal">
        <div  className="row-fit">
        <h3>Invite Guests:</h3>
          <ErrorList errors={errors} />
            {loginStatusError}
            
          <GuestForm addGuest={addGuest} userStatus={userStatus} />
            {getGuests}
          </div>
      </div>
    </div>
  )
}


export default EventShowPage
 


