import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import customerService from '../services/customers'
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableCell: {
    color: theme.palette.secondary.main
  },
})

const CustomerList = () => {
  const classes = useStyles()
  const [customers, setCustomers] = useState([])
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)

  const fetchData = () => {
    customerService
      .getAll()
      .then(response => {
        setCustomers(response)
      })
  }

  useEffect(() => {
    fetchData()
  }, []);

  const saveCustomer = (customer) => {
    customerService
      .create(customer)
      .then(returned => {
        setCustomers(customers.concat(returned))
      })
      .then(response => {
        setMessage('Customer saved successfully')
        setOpen(true)
      })
      .catch(error => console.log(error))
  }
  const updateCustomer = (id, updatedCustomer) => {
    const customer = customers.find(n => n.id === id)
    console.log(updatedCustomer)

    customerService
      .update(id, updatedCustomer)
      .then(returned =>{
        setCustomers(customers.map(customer => customer.id !== id ? customer : returned))
      })
      .then(response => {
        setMessage('Changes saved successfully')
        setOpen(true)
      })
      .catch(error => console.log(error))
  }

  const deleteCustomer = (id, deletedCustomer) => {
    if (window.confirm("Are you sure you want to delete this customer?")){
      const newCustomerList = customers.filter(n => n.id !== id)
      console.log(newCustomerList)
  
      customerService
        .deleteItem(id, deletedCustomer)
        .then(response => {
          setCustomers(newCustomerList)
        })
        .then(response => {
          setMessage('Customer deleted')
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
            <i class="user icon"></i>
              Customers list
            </Typography>
          </Toolbar>
        </AppBar>
        <AddCustomer saveCustomer={saveCustomer}/>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="a dense table">
            <TableHead>
              <TableRow>
              <TableCell className={classes.tableCell} align="center"><b>First Name</b></TableCell>
              <TableCell className={classes.tableCell} align="center"><b>Last Name</b></TableCell>
              <TableCell className={classes.tableCell} align="center"><b>Street Address</b></TableCell>
              <TableCell className={classes.tableCell} align="center"><b>Post Code</b></TableCell>
              <TableCell className={classes.tableCell} align="center"><b>City</b></TableCell>
              <TableCell className={classes.tableCell} align="center"><b>Email</b></TableCell>
              <TableCell className={classes.tableCell} align="center"><b>Phone</b></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((row, i) => (
                <TableRow key={row.firstname}>
                  <TableCell className={classes.tableCell} align="center">{row.firstname}</TableCell>
                  <TableCell className={classes.tableCell} align="center">{row.lastname}</TableCell>
                  <TableCell className={classes.tableCell} align="center">{row.streetaddress}</TableCell>
                  <TableCell className={classes.tableCell} align="center">{row.postcode}</TableCell>
                  <TableCell className={classes.tableCell} align="center">{row.city}</TableCell>
                  <TableCell className={classes.tableCell} align="center">{row.email}</TableCell>
                  <TableCell className={classes.tableCell} align="center">{row.phone}</TableCell>
                  <TableCell align="center"><EditCustomer updateCustomer={updateCustomer} link={row.id} customer={row} /></TableCell>
                  <TableCell align="center"><Button color="secondary" onClick={() => deleteCustomer(row.id, row)}>Delete</Button></TableCell>
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

export default CustomerList
