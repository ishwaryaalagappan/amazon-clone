import React,{useEffect} from "react";
import "./App.css" 
import {BrowserRouter ,Route,Switch} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Checkout from "./Checkout";
import {useStateValue} from "./StateProvider";
import {auth} from "./firebase";

function App() {
  const [{user},dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
		 <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
        <Route path="/">
            <Header/>
            <Home/>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;