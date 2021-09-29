import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Main from './Components/HomeAdmin/Main';
import React from 'react';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/Home" component={Home}/>  
            <Route exact path="/Main" component={Main}/>  
          </Switch>
        </BrowserRouter>
    </div>
  );
}
export default App;
