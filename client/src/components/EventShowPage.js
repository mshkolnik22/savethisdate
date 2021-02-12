import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import ErrorList from "./ErrorList"
import translateServerErrors from "../services/translateServerErrors"
 
const EventShowPage = (props) => {
 const userStatus = props.user
 
 const [event, setEvent] = useState({
   invites: [],
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
 
 
 let loginStatusError = ""
 
 if (!loginStatus) {
   loginStatusError = (
     <div>
       <p>
         <p className="padding">To Add Guests:</p>
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
   <div>
     <ul>
       <li>Title of the Event: {event.title}</li>
       <li>Type of the Event: {event.typeOfEvent}</li>
       <li>Description: {event.description}</li>
       <li>Hosted by: {event.hostedBy}</li>
       <li>Host's email: {event.hostEmail}</li>
       <li>Virtual Link (URL): {event.linkURL}</li>
       <li>Location: {event.location}</li>
       <li>Date of the Event: {event.description}</li>
       <li>Start Time: {event.description}</li>
       <li>Reminder needed: {event.location}</li>
     </ul>
     <div>
       <ErrorList errors={errors} />
       {loginStatusError}
     </div>
   </div>
 )
}
 
export default EventShowPage
 


