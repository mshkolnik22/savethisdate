import React, { useState } from "react";
import Calendar from "react-calendar";

const EventForm = (props) => {
  const [eventRecord, setEventRecord] = useState({
    title: "",
    typeOfEvent: "",
    description: "",
    hostedBy: "",
    hostEmail: "",
    linkURL: "",
    location: "",
    date: "",
    time: "",
    reminder: "",
  });

  const [dateOfCalendar, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const handleChangeOfDate = (value) => {
    setDate(value);
    setShowCalendar(false);
  };

  const handleChange = (event) => {
    setEventRecord({
      ...eventRecord,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    eventRecord.date = dateOfCalendar.toLocaleDateString("en-US");
    props.addEvent(eventRecord);
    clearForm();
  };

  const clearForm = () => {
    setEventRecord({
      title: "",
      typeOfEvent: "",
      description: "",
      hostedBy: "",
      hostEmail: "",
      linkURL: "",
      location: "",
      date: "",
      time: "",
      reminder: "",
    });
  };

  return (
    <div>
      <div>
        <form className="form-right" onSubmit={handleSubmit}>
          <label className="label-input" htmlFor="title">
            Event Title (*Required):
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Title of the Event"
              onChange={handleChange}
              value={eventRecord.title}
            />
          </label>

          <label className="label-input" htmlFor="description">
            Event Description:
            <input
              id="description"
              type="text"
              name="description"
              placeholder="Description of the Event"
              onChange={handleChange}
              value={eventRecord.description}
            />
          </label>

          <label className="label-input" htmlFor="hostedBy">
            Hosted By (*Required):
            <input
              id="hostedBy"
              type="text"
              name="hostedBy"
              placeholder="Hosted By"
              onChange={handleChange}
              value={eventRecord.hostedBy}
            />
          </label>

          <label className="label-input" htmlFor="hostEmail">
            Contact Information Host (*Required):
            <input
              id="hostEmail"
              type="text"
              name="hostEmail"
              placeholder="Contact information of the Host"
              onChange={handleChange}
              value={eventRecord.hostEmail}
            />
          </label>

          <label className="label-input" htmlFor="linkURL">
            Virtual Event Link:
            <input
              id="linkURL"
              type="text"
              name="linkURL"
              placeholder="Virtual Event Link"
              onChange={handleChange}
              value={eventRecord.linkURL}
            />
          </label>

          <label className="label-input" htmlFor="location">
            Location:
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Location of the Event"
              onChange={handleChange}
              value={eventRecord.location}
            />
          </label>

          <label className="label-input" htmlFor="typeOfEvent">
            Type of the Event:
            <select name="typeOfEvent" onChange={handleChange} value={eventRecord.typeOfEvent}>
              <option value=""> Please select the type of the Event: </option>
              <option value="1">Birthday</option>
              <option value="2">Dinner Party</option>
              <option value="3">Game Night</option>
              <option value="4">Hike</option>
              <option value="5">Housewarming</option>
              <option value="6">Meeting</option>
              <option value="7">Pool Party</option>
              <option value="8">Reunion</option>
              <option value="9">Sweet 16</option>
              <option value="10">Theme Night</option>
              <option value="11">Wedding</option>
              <option value="12">Other</option>
            </select>
          </label>

          <label className="label-input" htmlFor="time">
            Start time of the Event:
            <select name="time" onChange={handleChange} value={eventRecord.time}>
              <option value="">Please select the starting time: </option>
              <option value="1">1 AM</option>
              <option value="2">2 AM</option>
              <option value="3">3 AM</option>
              <option value="4">4 AM</option>
              <option value="5">5 AM</option>
              <option value="6">6 AM</option>
              <option value="7">7 AM</option>
              <option value="8">8 AM</option>
              <option value="9">9 AM</option>
              <option value="10">10 AM</option>
              <option value="11">11 AM</option>
              <option value="12">12 NOON</option>
              <option value="13">1 PM</option>
              <option value="14">2 PM</option>
              <option value="15">3 PM</option>
              <option value="16">4 PM</option>
              <option value="17">5 PM</option>
              <option value="18">6 PM</option>
              <option value="19">7 PM</option>
              <option value="20">8 PM</option>
              <option value="21">9 PM</option>
              <option value="22">10 PM</option>
              <option value="23">11 PM</option>
              <option value="24">12 MIDNIGHT</option>
            </select>
          </label>

          <label className="label-input" htmlFor="reminder">
            Reminder:
            <select name="reminder" onChange={handleChange} value={eventRecord.reminder}>
              <option value=""></option>
              <option value="1">1 day</option>
              <option value="2">2 days</option>
              <option value="3">3 days</option>
              <option value="4">4 days</option>
              <option value="5">7 days</option>
              <option value="6">10 days</option>
              <option value="7">14 days</option>
              <option value="8">21 days</option>
              <option value="9">1 month</option>
              <option value="10">2 months</option>
              <option value="11">NONE</option>
            </select>
          </label>

          <label className="label-input" htmlFor="date">
            Date of the Event (*Required):
          </label>
          <div className="calendar">
            <input
              className="label-input"
              value={dateOfCalendar.toLocaleDateString("en-US")}
              onFocus={() => setShowCalendar(true)}
            />
            <Calendar
              className={showCalendar ? "" : "hide"}
              value={dateOfCalendar}
              onChange={handleChangeOfDate}
            />
          </div>

          <div className="vertical-container">
            <button className="button glow-on-hover">SUBMIT</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
