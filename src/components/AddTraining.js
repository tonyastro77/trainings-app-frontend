import React , { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import customerService from '../services/customers'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import theme from '../stylings/theme/theme'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import moment from 'moment'

const useStyles = makeStyles({
    text: {
        color: theme.palette.secondary.main
    },
    input: {
        color: theme.palette.secondary.main
    },
    titleHome: {
        color: '#ffffff',
        fontSize: '1rem',
    },
    formControl: {
        minWidth: "100%",
    }
})

function AddTraining(props) {
    const classes = useStyles()
    const [customers, setCustomers] = useState([])

    const [info, setInfo] = useState({ open: false, 
        duration: '', activity: '', firstname: '', lastname: ''})

    const [selectedDate, setSelectedDate] = React.useState(new Date())

    const fetchData = () => {
        customerService
          .getAll()
          .then(response => {
            setCustomers(response)
        })
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    const handleClickOpen = () => {
        setInfo({open: true})
    }

    const handleClose = () => {
        setInfo({open: false})
        console.log(customers)
    }
    
    const inputChanged = (e) => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value })
    }

    const handleChanged = (e) => {
        e.preventDefault();
        setInfo({ firstname: e.target.value, open: true} );
    }

    const handleDateChange = (date) => {
        setSelectedDate(moment(date).format("YYYY-MM-DD"));
    }

    const addTraining = () => {
        const newTraining = {
            date: selectedDate,
            duration: info.duration,
            activity: info.activity,
            firstname: info.firstname,
            lastname: info.lastname,
        }
        props.saveTraining(newTraining)
        handleClose();
    }

    return (
        <div>
            <Dialog
            open={info.open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            disableBackdropClick={true}
            >
            <DialogTitle id="form-dialog-title" className={classes.text}>New Training</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Insert the details of the new exercise. Click on 'Save' in order to save or 'Cancel' to go back.
                </DialogContentText>
                <InputLabel id="demo-simple-select-label">Date</InputLabel>
                <FormControl className={classes.formControl}>                 
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label=""
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                                className: classes.titleHome
                            }}
                            InputProps={{className: classes.titleHome}}
                            classes={{
                                root: classes.titleHome,
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>     
                <InputLabel id="demo-simple-select-label">Duration (minutes)</InputLabel>
                <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" name="duration" fullWidth />
                <InputLabel id="demo-simple-select-label">Activity</InputLabel>
                <TextField InputProps={{className: classes.input}} onChange={inputChanged} margin="dense" name="activity" fullWidth />
                <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                <FormControl className={classes.formControl}>              
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={info.firstname}
                        onChange={handleChanged}
                        classes={{
                            root: classes.titleHome,
                        }}
                    >
                    {customers.map( c => 
                        <MenuItem value={c.lastname + ', ' + c.firstname} 
                            classes={{
                            root: classes.titleHome,
                            }}
                        >
                            {c.lastname + ', ' + c.firstname}
                        </MenuItem>
                    )}
                    </Select>
                </FormControl>       
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                Cancel
                </Button>
                <Button onClick={addTraining} color="secondary">
                Save
                </Button>
            </DialogActions>
            </Dialog>
            <Button onClick={handleClickOpen} color="primary">Add Training</Button>           
        </div>
    )
}

export default AddTraining
