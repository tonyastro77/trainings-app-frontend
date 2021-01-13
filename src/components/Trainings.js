import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import customerService from '../services/customers'
import trainingService from '../services/trainings'
import AddTraining from './AddTraining'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import 'semantic-ui-css/semantic.min.css'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import theme from '../stylings/theme/theme'
import moment from 'moment'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tableCell: {
      color: theme.palette.secondary.main
    },
})

function Trainings() {
    const classes = useStyles()
    const [customers, setCustomers] = useState([])
    const [trainings, setTrainings] = useState([])
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)

    const fetchData = () => {
        trainingService
          .getAll()
          .then(response => {
            setTrainings(response)
          })
    }

    useEffect(() => {
        fetchData()
    }, []);

    const saveTraining = (training) => {
        trainingService
          .create(training)
          .then(returned => {
            setTrainings(trainings.concat(returned))
          })
          .then(response => {
            setMessage('Training saved successfully')
            setOpen(true)
          })
          .catch(error => console.log(error))
    }

    const deleteTraining = (id, deletedTraining) => {
        if (window.confirm("Are you sure you want to delete this training info?")){
          const newTrainingList = trainings.filter(n => n.id !== id)
          console.log(newTrainingList)
      
          trainingService
            .deleteItem(id, deletedTraining)
            .then(response => {
              setTrainings(newTrainingList)
            })
            .then(response => {
              setMessage('Training deleted')
              setOpen(true)
            })
            .catch(error => console.log(error)) 
        }
    }

    function handleClose(){
        setOpen(false);
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                    <i class="heartbeat icon"></i>
                        Trainings list
                    </Typography>
                </Toolbar>
            </AppBar>
            <AddTraining saveTraining={saveTraining}/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell} align="center"><b>Date</b></TableCell>
                            <TableCell className={classes.tableCell} align="center"><b>Duration</b></TableCell>
                            <TableCell className={classes.tableCell} align="center"><b>Activity</b></TableCell>
                            <TableCell className={classes.tableCell} align="center"><b>Customer's Name</b></TableCell>                       
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trainings.map((row, i) => (
                            <TableRow key={row.firstname}>
                                <TableCell className={classes.tableCell} align="center">{moment(row.date).format("MMMM Do YYYY")}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{row.duration}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{row.activity}</TableCell>
                                <TableCell className={classes.tableCell} align="center">{row.firstname}</TableCell>
                                <TableCell align="center"><Button color="secondary" onClick={() => deleteTraining(row.id, row)}>Delete</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message={message}
            />
        </div>
    )
}

export default Trainings
