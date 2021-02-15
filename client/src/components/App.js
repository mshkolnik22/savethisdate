import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import Image1 from "../assets/images/1.png";
import Image2 from "../assets/images/2.png";
import Image3 from "../assets/images/3.png";
import Image4 from "../assets/images/4.png";
import Image5 from "../assets/images/5.png";

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import EventShowPage from "./EventShowPage"
import EventsPage from "./EventsPage"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user)
      })
      .catch(() => {
        setCurrentUser(null)
      })
  }, [])
//style={{ width: "600px", margin: "auto", padding: "50px" }}
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <div>
          <div className="bg-img">
            <div className="bg-container">
              <div className="bg-text">
              {/* <div>
              <Carousel itemsToShow={1}>
              <img src={Image1} />
              <img src={Image2} />
              <img src={Image3} />
              <img src={Image4} />
              <img src={Image5} />
              </Carousel>
            </div> */}
            <h2 className="app-header">Welcome to Save This Date!</h2>
            <Link className="button large clear" to="/events">
              <h1 className="app-header">Create Events</h1>
            </Link>
          </div>
          <div className="carousel">
            <img src={Image1} />
            <img src={Image2} />
            <img src={Image3} />
            <img src={Image4} />
            <img src={Image5} />

          </div>
          </div>
       
          </div>

          </div>
        </Route>
        <Route exact path="/events">
           <EventsPage user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/events/:id">
          <EventShowPage user={currentUser} />
        </Route>
      </Switch>
    </Router>
  )
}

export default hot(App)
