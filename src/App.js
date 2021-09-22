import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Category from './Components/Home/Category';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/Login" component={Login}/>
            <Route exact path="/Register" component={Register}/>  
            <Route exact path="/Home" component={Home}/>  

          </Switch>

        </BrowserRouter>
    </div>
  );
}

export default App;
