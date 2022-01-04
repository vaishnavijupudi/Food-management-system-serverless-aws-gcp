import logo from './logo.svg';
import './App.css';
import RestaurantsList from "./Client/RestaurantsList";
import Restaurantitems from './Client/Restaurantitems';
import Header from "./Client/header.jsx";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import {
  withAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import Auth from 'aws-amplify';
import SecurityQuestion from "./SecurityQuestion";
import lexbot from './Client/lexbot';
import order from './Client/Order';

function App() {
  return (
    <div className="App">
      <div>
        <Header/>
      </div>
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={SecurityQuestion}/>
            <Route exact path="/list" component={RestaurantsList}/>
            <Route exact path="/items" component={Restaurantitems}/>
            <Route exact path="/lex" component={lexbot}/>
            <Route exact path="/order" component={order}/>
          </Switch>
        </Router>
      </div>
  </div>
  );
}

export default withAuthenticator(App);
