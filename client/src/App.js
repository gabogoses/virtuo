import React, { Component } from "react";

import AppNavbar from "./components/AppNavbar";
import CarList from "./components/CarList";
import CarModal from "./components/CarModal";
import StationList from "./components/StationList";

import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <CarModal />
            <CarList />
            <br />
            <br />
            <StationList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
