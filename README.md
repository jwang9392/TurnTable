# TurnTable

TurnTable is a single page web application based off OpenTable. This app's main functionality allows for its users to find different nightlife venues based on the user's search parameters, and make table reservations at those venues based on the date, time, and party size. 

## Tech/Frameworks
---
* Ruby / Rails
* PostgreSQL
* Javascript
* JBuilder / JQuery
* React / Redux
* CSS / SCSS
* Webpack

## Features
---
### User Authentication
Users can create an account, taking in their name, email, and password after they pass validations. 
A user can sign in and have their state persist through their cookies until they choose to sign out, and the user is securely authenticated through a hash.


### Search
Users can search for venues and those parameters are checked against different data columns. Results of the search will bring up an index of venues, as well as available reservations for those venues. 

### Reservations
Users specify the date, time, and party size, and the show available reservation times. 
A user is not required to be signed in to create a reservation, but will be prompted to create an account if they are not signed in. 


## Future Implementations
* Reviews
* Favorites
* Search Filters
* Maps feature
* Augment website data based on user location