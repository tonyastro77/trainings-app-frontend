import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import CalendarTrainings from './components/CalendarTrainings'
import CustomerList from './components/CustomerList'
import Trainings from './components/Trainings'
import Navigator from './Navigator'
import './Navigator'
import { AuthProvider } from './contexts/AuthContext'


function Home() {

    return (
        <div>
            <Router>
                <AuthProvider>
                    <div>
                        <Navigator />
                        <Switch>
                        <Route exact path="/" component={CustomerList} />                    
                        <Route path="/trainings" render={() => <Trainings />} />
                        <Route path="/calendar" render={() => <CalendarTrainings />} />
                        <Route render={() => <h1>Page not found</h1>} />      
                        </Switch>
                    </div>      
                </AuthProvider>             
            </Router>   
        </div>
    )
}

export default Home
