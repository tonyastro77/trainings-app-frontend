import React from 'react'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'

function Navigator() {
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
                    </ul>
                </div>    
            </nav>
        </div>
    )
}

export default Navigator
