import React, { useState } from "react"

const GuestForm = (props) => {
  const [guestRecord, setGuestRecord] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    rsvp: "",
  })

  const handleChange = (guest) => {
    setGuestRecord({
      ...guestRecord,
      [guest.currentTarget.name]: guest.currentTarget.value,
    })
  }
 
 const handleSubmit = (guest) => {
  guest.preventDefault()
  props.addGuest(guestRecord)
  clearForm()
}

const clearForm = () => {
  setEventRecord({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    rsvp: "",
  })
}

return (
  <div>
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">
          Guest's First Name:
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Guest's First Name"
            onChange={handleChange}
            value={guestRecord.firstName}
          />
        </label>

        <label htmlFor="lastName">
          Guest's Last Name:
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Guest's Last Name"
            onChange={handleChange}
            value={guestRecord.lastName}
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            value={guestRecord.email}
          />
        </label>

        <label htmlFor="phone">
          Phone:
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone number"
            onChange={handleChange}
            value={guestRecord.phone}
          />
        </label>

        <label htmlFor="rsvp">
          RSVP status:
          <input
            id="rsvp"
            type="text"
            name="rsvp"
            placeholder="rsvp status"
            onChange={handleChange}
            value={guestRecord.rsvp}
          />
        </label>
        <div>
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
)
}


export default GuestForm