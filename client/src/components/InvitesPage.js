import React from "react"
import { Link } from "react-router-dom"
import Button from '@material-ui/core/Button';
import Image1 from "../assets/images/1.png";
import Image2 from "../assets/images/2.png";
import Image3 from "../assets/images/3.png";
import Image4 from "../assets/images/4.png";
import Image5 from "../assets/images/5.png";

const InvitesPage = (props) => {


  return (
    <div className="bg-container bg-text event-bg-img-invites centertop">
      <div>
        <h1>Browse Different Styles</h1>
      </div>
      <div>
      <h3>Options include:</h3>
      <div>
        <div className="carouselcustomize">
          <img src={Image1} />
          <img src={Image2} />
          <img src={Image3} />
          <img src={Image4} />
          <img src={Image5} />
        </div>
        </div>
      </div>
    </div>
  )
}

export default InvitesPage