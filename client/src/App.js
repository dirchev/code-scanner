import React, { Component } from 'react';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import CodePreview from './components/pages/CodePreview';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          {/* ProtectedRoutes */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/preview/:id" component={CodePreview} />
        </div>
      </Router>
    )
  }
}

export default App;
