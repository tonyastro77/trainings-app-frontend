import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CustomerList from './components/CustomerList'
import Trainings from './components/Trainings'
import Navigator from './Navigator'
import './Navigator'

function Home() {
    return (
        <div>
            <BrowserRouter>
            <div>
                <Navigator />
                <Switch>
                <Route exact path="/" component={CustomerList} />
                <Route path="/trainings" render={() => <Trainings />} />
                <Route render={() => <h1>Page not found</h1>} />    
                
                </Switch>
            </div>        
            </BrowserRouter>   
        </div>
    )
}

export default Home
