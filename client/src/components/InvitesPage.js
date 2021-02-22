import React from "react";

import Image1 from "../assets/images/1.png";
import Image2 from "../assets/images/2.png";
import Image3 from "../assets/images/3.png";
import Image4 from "../assets/images/4.png";
import Image5 from "../assets/images/5.png";

const InvitesPage = (props) => {
  return (
    <div className="event-bg-img-invites">
      <div className="tile-list">
        <h1>Browse Different Styles</h1>
        <h3>Your Former Events Include:</h3>
        <ul className="ul-style">
          <li>Launch 31 Reunion</li>
          <li>Lord Of The Rings - Part 3</li>
          <li>Discord Get Together</li>
          <li>Yoga Class</li>
          <li>... and a Sweet 16 Birthday Party!</li>
        </ul>
      </div>
      <div className="carouselcustomize">
        <img className="borderimg" src={Image1} />
        <img className="borderimg" src={Image2} />
        <img className="borderimg" src={Image3} />
        <img className="borderimg" src={Image4} />
        <img className="borderimg" src={Image5} />
      </div>
    </div>
  );
};

export default InvitesPage;
