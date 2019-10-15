import React from 'react';
import {ProductSearchList} from "./components/Items/ProductSearchList/ProductSearchList";
import { Switch} from "react-router";
import {BrowserRouter as Router, NavLink, Route} from 'react-router-dom'
import {Product} from "./components/Items/Product/Product";
import {SearchBar} from "./components/SearchBar/SearchBar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <div className="App">
          <Router>
              <SearchBar/>
          <Switch>
              <div >
                <Route exact path="/items/:itemId" component={Product}/>
                <Route exact path="/items" component={ProductSearchList}/>
              </div>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
