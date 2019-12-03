import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TodosList from "./components/todos-list.component";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";
import Logo from "./logo.svg";

class App extends Component {
  
  render() {
    return (
      <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="google.com"  target="_brank">
              <img src={Logo} with="30" height="40"/>
            </a> 
            <Link to="/" className="navbar-brnad" >STACK-MERN </Link>
            <div className="collpase nav-collpase">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item"><Link to="/" className="nav-link">TODOLIST</Link></li>
                <li className="navbar-item"><Link to="/create" className="nav-link">Create TODO</Link></li>
              </ul>
            </div>
            </nav>
            <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo}/>
          <Route path="/create" component={CreateTodo} />
          </div>
         
      </Router>
    );
  }
}

export default App;
