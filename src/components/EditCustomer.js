import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'semantic-ui-css/semantic.min.css';
import theme from '../stylings/theme/theme'

const useStyles = makeStyles({
    text: {
        color: theme.palette.secondary.main
    },
    input: {
        color: theme.palette.secondary.main
    },
})

function EditCustomer(props) {
    const classes = useStyles()

    const [info, setInfo] = useState({ open: false, 
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '',
        email: '', phone: ''})

    const handleClickOpen = () => {
        setInfo({
            open: true,
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress, 
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email, 
            phone: props.customer.phone
        })
    }

    const handleClose = () => {
        setInfo({open: false})
    }

    const inputChanged = (e) => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value })
    }

    const updateCustomer = () => {
        const newCustomer = {
            firstname: info.firstname ,
            lastname: info.lastname ,
            streetaddress: info.streetaddress ,
            postcode: info.postcode ,
            city: info.city ,
            email: info.email ,
            phone: info.phone 
        }
        props.updateCustomer(props.link, newCustomer)
        handleClose();
    }
    return (
        <div>
             <Dialog
                open={info.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title" className={classes.text}>Edit Customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Type inside the fields the information to be edited regarding the customer. Then click on "Save" in order to apply the changes or "Cancel" otherwise.
                    </DialogContentText>
                    <TextField InputProps={{className: classes.input}} onChange={inputChanged} autoFocus margin="dense" value={info.firstname} name="firstname" label="First Name" fullWidth />
                    <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" value={info.lastname} name="lastname" label="Last Name" fullWidth />
                    <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" value={info.streetaddress} name="streetaddress" label="Street Address" fullWidth />
                    <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" value={info.postcode} name="postcode" label="Post Code" fullWidth />
                    <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" value={info.city} name="city" label="City" fullWidth />
                    <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" value={info.email} name="email" label="Email" fullWidth />
                    <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" value={info.phone} name="phone" label="Phone" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                    Cancel
                    </Button>
                    <Button onClick={updateCustomer} color="secondary">
                    Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Button color="secondary" onClick={handleClickOpen}><i class="edit icon"></i>Edit</Button>
        </div>
    )
}

export default EditCustomer
