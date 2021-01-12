import React from 'react'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './PrivateRoute'

function App() {


  return (    
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />               
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>      
  );
}

export default App;
