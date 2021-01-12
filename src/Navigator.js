import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Button, Typography } from '@material-ui/core'
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import { useAuth } from './contexts/AuthContext'
import { useHistory } from 'react-router-dom'

function Navigator() {
    const [ error, setError ] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            history.push('/login')
        } catch{
            setError('Failed to log out')
        }
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
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Typography color="secondary">
                            <strong>Email: </strong> {currentUser.email}
                        </Typography>                     
                        <Button color="secondary" onClick={handleLogout}><i class="sign out alternate icon"></i>Logout</Button>
                    </form>
                </div>    
            </nav>
        </div>
    )
}

export default Navigator
