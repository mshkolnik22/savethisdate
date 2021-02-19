import React from "react"
import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';
import Image1 from "../assets/images/text.jpg";

const Congratulations = (props) => {

  return (
    <div className="event-bg-img-congrats">
      <div>
      <h1>Congratulations, your text message was sent with Twilio!</h1>
        <img src={Image1}></img>
      </div>
      <h3>In this Beta Version, the text message is only sent from and to registered Twilio users.</h3>
      <h3>Thank you for using "Save This Date!"</h3>
      <Link to="/events">
        <Button className="glow-on-hover bold" variant="contained" color="primary">
          More Events
        </Button>
      </Link>
  
    </div>
  )
}

export default Congratulations