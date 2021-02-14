import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EventForm from "./EventForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

const EventsPage = (props) => {
  const [events, setEvents] = useState([])
  const [errors, setErrors] = useState([])

  const user = props.user

  const getEvents = async () => {
    try {
      const response = await fetch("/api/v1/events")
  
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const body = await response.json()
      setEvents(body.events)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  const addEvent = async (eventPayload) => {
    try {
      const response = await fetch("/api/v1/events", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(eventPayload),
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
        const updatedEvents = events.concat(body.event)
        setEvents(updatedEvents)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
 

  // const eventListItems = events.map((eventItem) => {
  //   return (
  //     <div>
  //       <h1>All your Events</h1>
  //       <ul>{eventListItems}</ul>
  //     </div>
  //   )
  // })

  const eventListItems = events.map((eventItem) => {
    return (
      <div className="scroll">
        <li key={eventItem.id}>
          <Link to={`/events/${eventItem.id}`}>{eventItem.title}</Link>
        </li>
      </div>
    )
  })
 

  return (
    <div className="event-bg-img">
      <div className="events-and-form">
        <div className="events-left">
          <h3>Your events:</h3>
          <ul>{eventListItems}</ul>
        </div>
        <div className="form-right">
         <h3>Add New Event:</h3>
         <ErrorList errors={errors} />
         <EventForm addEvent={addEvent} />
        </div>
      </div>
    </div>
  )
}

export default EventsPage
