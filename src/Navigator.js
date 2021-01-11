import React from 'react'
import {Link} from 'react-router-dom'
import fire from './config/Fire';
import Button from '@material-ui/core/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'

function Navigator() {

    const logout = () => {
        fire.auth().signOut();
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/"><i class="home icon"></i>Exercise Plan Oy</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Customers</Link>{' '}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/trainings">Trainings</Link>{' '}
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/calendar"><i class="calendar alternate outline icon"></i>Calendar</Link>{' '}
                        </li>  
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                    <Button color="secondary" onClick={logout}><i class="sign out alternate icon"></i>Logout</Button>
                    </form>
                </div>    
            </nav>
        </div>
    )
}

export default Navigator
