import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const EventsPage = (props) => {
  const [events, setEvents] = useState([])

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

  const eventListItems = events.map((eventItem) => {
    return (
      <div>
        <h1>All your Events</h1>
        <ul>{eventListItems}</ul>
      </div>
    )
  })

  return (
        <div>
          <h3>Your events:</h3>
          <ul>{eventListItems}</ul>
        </div>
  )
}

export default EventsPage
