import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import GuestForm from "./GuestForm"
import ErrorList from "./ErrorList"
import { Redirect } from "react-router-dom"
import translateServerErrors from "../services/translateServerErrors"

const EventShowPage = (props) => {
  const userStatus = props.user

  const [event, setEvent] = useState({
    guests: [],
  })
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const { id } = useParams()
  const [errors, setErrors] = useState([])
  const [loginStatus, setLoginStatus] = useState(true)
  //const eventId = props.match.params.id

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

  const handleDeleteShowPage = async () => {
    try {
      const response = await fetch(`/api/v1/events/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      setShouldRedirect(true)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  if (shouldRedirect === true) {
    return <Redirect to="/events" />
  }

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
            <button variant="contained" className="glow-on-hover" color="primary">
              REGISTER
            </button>
          </Link>
          <Link to="/user-sessions/new">
            <button variant="contained"  className="glow-on-hover" color="primary">
             SIGN IN
            </button>
          </Link>
        </p>
      </div>
    )
  }

  const sendSMSHandler = async (event) => {
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
      <Link to="/events/congratulations">
        <button type="button" className="glow-on-hover" onClick={sendSMSHandler}>
          SEND AN SMS
        </button>
      </Link>
  )}
//<Link to="/events">
//</Link>
  const eventButton = [
    <div key="delete-edit">
      
        <button className="glow-on-hover" onClick={handleDeleteShowPage}>
          DELETE
        </button>
      
      <Link to={`/events/${id}/edit`}>
        <button className="glow-on-hover">EDIT</button>
      </Link>
    </div>,
  ]

  const emptyPtag = [<p key="emptyP"></p>]

  const timeOfEvent = (event) => {
    var time = ""
      if (event > 12) {
        return time = (event - 12) + " PM"
      } else if (event === 12) {
        return "NOON"
      } else { 
        return time = (event) + " AM"
      }
  }
 

  return (
    <div className="event-bg-img-show neartop">
      <div className="row-container vertical">
        <div>
          <h3>Your Event:</h3>
            <div className="post-it">      
              <div className="cute">
                <h3>{event.title}</h3>
                <p>Hosted By: {event.hostedBy}</p>
                <p>Host's Email: {event.hostEmail}</p>
                <p>Date of the Event: {event.date}</p>
                <p>Time of the Event: {timeOfEvent(event.time)}</p>
                  {event.userId === event.currentUserId ? eventButton : emptyPtag}
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
 


