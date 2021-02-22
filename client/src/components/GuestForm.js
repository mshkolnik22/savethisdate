import React, { useState } from "react"

const GuestForm = ({ addGuest }) => {
  const [newGuest, setNewGuest] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    rsvp: "",
  })

  const handleChange = (guest) => {
    setNewGuest({
      ...newGuest,
      [guest.currentTarget.name]: guest.currentTarget.value,
    })
  }
 
 const handleSubmit = (event) => {
  event.preventDefault()
  addGuest(newGuest)
  clearForm()
}

const clearForm = () => {
  setNewGuest({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    rsvp: "",
  })
}

return (
  <div className="event-form-guests">
    <div>
      <form  autocomplete="off" className="form-right" onSubmit={handleSubmit}>
        <label className="label-input" htmlFor="firstName">
          Guest's First Name:
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="Guest's First Name"
            onChange={handleChange}
            value={newGuest.firstName}
          />
        </label>

        <label className="label-input" htmlFor="lastName">
          Guest's Last Name:
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Guest's Last Name"
            onChange={handleChange}
            value={newGuest.lastName}
          />
        </label>

        <label className="label-input" htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            value={newGuest.email}
          />
        </label>

        <label className="label-input" htmlFor="phone">
          Phone:
          <input
            id="phone"
            type="text"
            name="phone"
            placeholder="Phone number"
            onChange={handleChange}
            value={newGuest.phone}
          />
        </label>

        <label className="label-input" htmlFor="rsvp">
          RSVP status:
          <input
            id="rsvp"
            type="text"
            name="rsvp"
            placeholder="rsvp status"
            onChange={handleChange}
            value={newGuest.rsvp}
          />
        </label>
        
        <div>
          <button className="button glow-on-hover">Submit</button>
        </div>
      </form>
    </div>
  </div>
)
}


export default GuestForm