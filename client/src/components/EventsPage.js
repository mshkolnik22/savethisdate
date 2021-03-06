import React, { useRef, useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EventForm from "./EventForm"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"

import arrowDown from "../assets/images/down-button-pink.png";
import arrowUp from "../assets/images/up-rounded-pink.png";
import ScrollArrow from "./ScrollArrow"

import {FaArrowCircleUp} from 'react-icons/fa';

const EventsPage = (props) => {
  const [events, setEvents] = useState([])
  const [errors, setErrors] = useState([])
  const [showScroll, setShowScroll] = useState(false)

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

  const eventListItems = events.map((eventItem) => {
    return (
      <div key={eventItem.id}>
        <li>
          <Link to={`/events/${eventItem.id}`}>
            <h4>{eventItem.title}</h4>
          </Link>
        </li>
      </div>
    )
  })

  return (
    <div className="event-bg-img-all">
      <div className="events-and-form">
        <div className="events-left tile-list">
          <h1>Your events:</h1>
          <a href="/events"><img className="arrow" src={arrowDown} /></a>
        
          <ul >{eventListItems}</ul>
          <a href="/events"><img className="arrow" src={arrowUp} /></a>
        </div>
        <div className="form-right">
         <h1>Add New event:</h1>
         <ErrorList errors={errors} />
         <EventForm addEvent={addEvent} />
        </div>
      </div>
    </div>
  )
}

export default EventsPage
