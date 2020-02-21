import React, { Component } from "react";
import { hot } from "react-hot-loader";
import MapContainer from "./components/MapContainer"
//import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Hello, World! </h1>
        <MapContainer></MapContainer>
      </div>
    );
  }
}

export default hot(module)(App);