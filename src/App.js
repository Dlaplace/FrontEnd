import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <Router>
        <nav>
          <Link to="/home">Home</Link>
        </nav>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect path="*" to="/" />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
