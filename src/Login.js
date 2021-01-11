import React, { useState } from 'react'
import fire from './config/Fire';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'column',
      justify: 'center',
      alignItems: 'center',
    },
}));


function Login() {
    const classes = useStyles();
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(state.email, state.password).then((u) =>{
        }).catch((error) => {
          console.log(error);
        });
      }
      
    const signup = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(state.email, state.password).then((u) =>{console.log(u)
        }).catch((error) => {
          console.log(error);
        });
      }
      
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <div className={classes.root}>
                <div className={classes.paper}>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail">Email address</label>
                            <input value={state.email} onChange={handleChange} type="email" name="email"
                            class="form-control" id="exampleInputEmail" aria-describedly="emailHelp"
                            placeholder="Enter email" />
                        </div>
                        <small id="emailHelp" class="form-text text-muted">We will never share your email with anyone else.</small>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input value={state.password} onChange={handleChange} type="password" name="password"
                            class="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <button type="submit" onClick={login} class="btn btn-primary">Login</button>
                        <button onClick={signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
                    </form>
                </div>
            </div>               
        </div>
    )
}

export default Login
