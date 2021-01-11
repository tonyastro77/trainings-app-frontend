import React , { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import theme from '../stylings/theme/theme'

const useStyles = makeStyles({
    text: {
        color: theme.palette.secondary.main
    },
    input: {
        color: theme.palette.secondary.main
    },
})

function AddCustomer(props) {
    const classes = useStyles()

    const [info, setInfo] = useState({ open: false, 
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '',
        email: '', phone: ''})

    const handleClickOpen = () => {
        setInfo({open: true})
    }

    const handleClose = () => {
        setInfo({open: false})
    }
    
    const inputChanged = (e) => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value })
    }

    const addCustomer = () => {
        const newCustomer = {
            firstname: info.firstname ,
            lastname: info.lastname ,
            streetaddress: info.streetaddress ,
            postcode: info.postcode ,
            city: info.city ,
            email: info.email ,
            phone: info.phone 
        }
        props.saveCustomer(newCustomer)
        handleClose();
    }
    return (
        <div>
            <Dialog
            open={info.open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title" className={classes.text}>New Customer</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Insert here all the details of the new customer. Click on 'Save' in order to save the new information or 'Cancel' if you change your mind.
                </DialogContentText>
                <TextField InputProps={{className: classes.input}} onChange={inputChanged} autoFocus margin="dense" name="firstname" label="First Name" fullWidth />
                <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" name="lastname" label="Last Name" fullWidth />
                <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" name="streetaddress" label="Street Address" fullWidth />
                <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" name="postcode" label="Post Code" fullWidth />
                <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" name="city" label="City" fullWidth />
                <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" name="email" label="Email" fullWidth />
                <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" name="phone" label="Phone" fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                Cancel
                </Button>
                <Button onClick={addCustomer} color="secondary">
                Save
                </Button>
            </DialogActions>
            </Dialog>
            <Button onClick={handleClickOpen} color="primary">Add Customer</Button>           
        </div>
    )
}

export default AddCustomer
