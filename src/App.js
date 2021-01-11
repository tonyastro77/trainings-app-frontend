import React, { useState, useEffect } from 'react'
import fire from './config/Fire'
import Login from './Login'
import Home from './Home'
import './Navigator'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    authListener();
  }, []);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
      }
      else {
        setUser(null);
      }
    });
  }

  return (
    <div className="App">
      {user ? (<Home />) : (<Login/>)}
    </div>
  );
}

export default App;
