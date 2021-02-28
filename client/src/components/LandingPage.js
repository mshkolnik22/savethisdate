import React from "react"
import { Link } from "react-router-dom"

import Image1 from "../assets/images/birthday.jpg";
import Image2 from "../assets/images/movienight.jpg";
import Image3 from "../assets/images/sweet16.jpg";
import Image4 from "../assets/images/hiking.jpg";
import Image5 from "../assets/images/discordnight.jpg";

const LandingPage = props => {

return (
 <div>
   <div className="bg-img">
     <div className="bg-container">
      <div className="bg-text">
         <h2 className="app-header">Welcome to Save This Date!</h2>
         <Link to="/events">
           <button className="glow-on-hover bold" variant="contained" color="primary">
             CREATE NEW
           </button>
         </Link>
         <Link to="/events">
           <button className="glow-on-hover bold" variant="contained" color="primary">
             YOUR EVENTS
           </button>
         </Link>
         <Link to="/invites">
           <button className="glow-on-hover bold" variant="contained" color="primary">
             CUSTOMIZE
           </button>
         </Link>
       </div>

      <div className="carousel">
         <a href="/events"><img className="borderimg" src={Image1} /></a>
         <a href="/events"><img className="borderimg" src={Image2} /></a>
         <a href="/events"><img className="borderimg" src={Image3} /></a>
         <a href="/events"><img className="borderimg" src={Image4} /></a>
         <a href="/events"><img className="borderimg" src={Image5} /></a>
       </div>
     </div>
   </div>
 </div>
)
}

export default LandingPage
