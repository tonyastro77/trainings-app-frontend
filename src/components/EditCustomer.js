import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'semantic-ui-css/semantic.min.css';

function EditCustomer(props) {
    const [info, setInfo] = useState({ open: false, 
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '',
        email: '', phone: ''})

    const handleClickOpen = () => {
        setInfo({
            open: true,
            firstname: props.firstname,
            lastname: props.lastname,
            streetaddress: props.streetaddress, 
            postcode: props.postcode,
            city: props.city,
            email: props.email, 
            phone: props.phone
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
        console.log(newCustomer)
        props.updateCustomer(props.id, newCustomer)
        handleClose();
    }
    return (
        <div>
             <Dialog
                open={info.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Type inside the fields the information to be edited regarding the customer. Then click on "Save" in order to apply the changes or "Cancel" otherwise.
                    </DialogContentText>
                    <TextField onChange={inputChanged} autoFocus margin="dense" value={info.firstname} name="firstname" label="First Name" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={info.lastname} name="lastname" label="Last Name" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={info.streetaddress} name="streetaddress" label="Street Address" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={info.postcode} name="postcode" label="Post Code" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={info.city} name="city" label="City" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={info.email} name="email" label="Email" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={info.phone} name="phone" label="Phone" fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={updateCustomer} color="primary">
                    Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Button color="primary" onClick={handleClickOpen}><i class="edit icon"></i>Edit</Button>
        </div>
    )
}

export default EditCustomer
