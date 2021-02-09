# Save This Date

## Description
My application makes creating events better. With Save This Date you can create any event you wish, add a URL, date and time, and save you the hassle of reminding your guests before the event with your link or location. Your guests can be added and viewed, and the invitation to your event can be sent so that they can Save This Date. You can then view who you invited, and modify the description of your event, if needed.

## Install Instructions

1. yarn install 
2. cd server
3. createdb <savethedate>_development
4. yarn run migrate:latest
5. yarn run dev
6. Navigate to localhost:3000/

## Creators:
- Maria Shkolnik

## Heroku Link 
- https://savethisdate.herokuapp.com/

## List of Features
- index page:
  + sample themes, Welcome!
- Register or Sign in:
  + create an account, or sign in to view your events
- Event form:
  + create your event
- Show page: 
  + list of Guests to your event, once you are logged in


## Outline of Technology in the project
- Express
- React
- Node.js
- Passport
- Objection
- Knex
- PostgreSQL
- Twillio