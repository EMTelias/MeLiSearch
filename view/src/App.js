import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {ProductSearchList} from "./components/ProductSearchList/ProductSearchList";
import { Switch} from "react-router";
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom'

import {Product} from "./components/Product/Product";
import {SearchBar} from "./components/SearchBar/SearchBar";

function App() {

  const style = {
    backgroundColor: "#e6e6e6",
    };

  return (
      <div className="App">
          <Router>
              <SearchBar/>
          <Switch>
              <div style = {style}>
                <Route exact path="/items/:itemId" component={Product}/>
                <Route exact path="/items" component={ProductSearchList}/>
              </div>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
