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
    const [open, setOpen] = useState(false)
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [streetaddress, setStreetAddress] = useState('')
    const [postcode, setPostCode] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
        setFirstName(props.firstname)
        setLastName(props.lastname)
        setStreetAddress(props.streetaddress)
        setPostCode(props.postcode)
        setCity(props.city)
        setEmail(props.email)
        setPhone(props.phone)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const inputChanged = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }

    const updateCustomer = () => {
        const newCustomer = {
            firstname: firstname ,
            lastname: lastname ,
            streetaddress: streetaddress ,
            postcode: postcode ,
            city: city ,
            email: email ,
            phone: phone 
        }
        props.updateCustomer(props.link, newCustomer);
        handleClose();
    }
    return (
        <div>
             <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Type inside the fields the information to be edited regarding the customer. Then click on "Save" in order to apply the changes or "Cancel" otherwise.
                    </DialogContentText>
                    <TextField onChange={inputChanged} autoFocus margin="dense" value={firstname} name="firstname" label="First Name" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={lastname} name="lastname" label="Last Name" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={streetaddress} name="streetaddress" label="Street Address" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={postcode} name="postcode" label="Post Code" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={city} name="city" label="City" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={email} name="email" label="Email" fullWidth />
                    <TextField onChange={inputChanged} margin="dense" value={phone} name="phone" label="Phone" fullWidth />
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
