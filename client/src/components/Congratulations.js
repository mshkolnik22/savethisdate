import React from "react"
import { Link } from "react-router-dom"
import Image1 from "../assets/images/text.jpg";

const Congratulations = (props) => {

  return (
    <div className="event-bg-img-congrats">
      <div>
      <h1>Congratulations!</h1>
      <h1>Your text message was sent with Twilio!</h1>
        <img className="borderimg" src={Image1}></img>
      </div>
      <h3>In this Beta Version, the text message is only sent from and to registered Twilio users.</h3>
      <h3>Thank you for using "Save This Date!"</h3>
      <button className="button glow-on-hover bold" variant="contained" color="primary">
        <Link to="/events">
          More Events
        </Link>
      </button>
    </div>
  )
}

export default Congratulations