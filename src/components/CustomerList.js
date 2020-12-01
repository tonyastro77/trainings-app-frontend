import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import customerService from '../services/customers'
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import 'semantic-ui-css/semantic.min.css'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const CustomerList = () => {
  const classes = useStyles()
  const [customers, setCustomers] = useState([])

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
      .then(returned =>{
        setCustomers(customers.concat(returned))
      })
      .catch(error => console.log(error))
  }
  const updateCustomer = (id, updatedCustomer) => {
    const customer = customers.find(n => n.id === id)
    
    customerService
      .update(id, updatedCustomer)
      .then(returned =>{
        setCustomers(customers.map(customer => customer.id !== id ? customer : returned))
      })
      .catch(error => console.log(error))
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
              <TableCell align="center"><b>First Name</b></TableCell>
              <TableCell align="center"><b>Last Name</b></TableCell>
              <TableCell align="center"><b>Street Address</b></TableCell>
              <TableCell align="center"><b>Post Code</b></TableCell>
              <TableCell align="center"><b>City</b></TableCell>
              <TableCell align="center"><b>Email</b></TableCell>
              <TableCell align="center"><b>Phone</b></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((row) => (
                <TableRow key={row.firstname}>
                  <TableCell align="center">{row.firstname}</TableCell>
                  <TableCell align="center">{row.lastname}</TableCell>
                  <TableCell align="center">{row.streetaddress}</TableCell>
                  <TableCell align="center">{row.postcode}</TableCell>
                  <TableCell align="center">{row.city}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center"><EditCustomer updateCustomer={updateCustomer}/></TableCell>
                  <TableCell align="center"><Button color="secondary">Delete</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
}

export default CustomerList
