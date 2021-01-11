import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import fire from './config/Fire'
import CalendarTrainings from './components/CalendarTrainings'
import CustomerList from './components/CustomerList'
import Trainings from './components/Trainings'
import Navigator from './Navigator'
import './Navigator'

function Home() {
    const logout = () => {
        fire.auth().signOut();
    }

    return (
        <div>
            <BrowserRouter>
            <div>
                <Navigator />
                <Switch>
                <Route exact path="/" component={CustomerList} />
                <Route path="/trainings" render={() => <Trainings />} />
                <Route path="/calendar" render={() => <CalendarTrainings />} />
                <Route render={() => <h1>Page not found</h1>} />      
                </Switch>
            </div>        
            </BrowserRouter>   
        </div>
    )
}

export default Home
