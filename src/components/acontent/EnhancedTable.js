import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import UserAddModal from "./UserAddModal";
import UserEditModal from "./UserEditModal";
import { lighten } from '@material-ui/core/styles/colorManipulator';

const columnData = [
  { id: 'firstname', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'lastname', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'balance', numeric: false, disablePadding: false, label: 'Balance' },
];

class EnhancedTableHead extends React.Component {

  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                {column.label}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Customers
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
            <UserEditModal 
              isOpen={props.isOpenEdit} 
              handleClose={props.handleCloseEdit} 
              editUser={props.editUserModal} 
              handleUpdate={props.handleUpdate}
              handleDelete={props.handleDelete}
              defaultFirstName={props.defaultFirstName}
              defaultLastName={props.defaultLastName}
              defaultEmail={props.defaultEmail}
              defaultDescription={props.defaultDescription}
              defaultBalance={props.defaultBalance}
              setFirstName={(event) => props.setFirstName(event)}
              setLastName={(event) => props.setLastName(event)}
              setEmail={(event) => props.setEmail(event)}
              setDescription={(event) => props.setDescription(event)}
              setBalance={(event) => props.setBalance(event)}
            />
        ) : <UserAddModal isOpen={props.isOpen} handleClose={props.handleClose} handleSave={props.handleSave} addUser={props.addUser}  />}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eFirstName: '',
      eLastName: '',
      eEmail: '',
      eDescription: '',
      eBalance: '',
      selected: [],
      customers: [],
      page: 0,
      rowsPerPage: 10,
      addUserModalStatus: false,
      editUserModalStatus: false,
      apiURL: 'http://localhost:9000/'
    };
  }

  componentDidMount() {
    this.listCustomers()
  }
  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.customers.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleSave = (userInfo) => {
    const customers = [...this.state.customers];
    const url = this.state.apiURL+'addcustomer'
    const customer = {
      id: "temp_id",
      firstname: userInfo.firstName,
      lastname: userInfo.lastName,
      email: userInfo.email,
      description: userInfo.description,
      balance: userInfo.balance
    }
    customers.unshift(customer)
    this.setState({customers: customers, addUserModalStatus: false})

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    }).catch(error => console.error('Error:', error))
    .then(res => {
      customers[0].id = res.id
      this.setState({customers: customers})
    })
  }

  openEditModal = () => {
    const userID = this.state.selected[0]
    const users = [...this.state.customers]
    const userIndex = users.findIndex(user => {
      return user.id === userID
    })
    this.setState({
      eFirstName: users[userIndex].firstname,
      eLastName: users[userIndex].lastname,
      eEmail: users[userIndex].email,
      eDescription: users[userIndex].description,
      eBalance: users[userIndex].balance,
      editUserModalStatus: true
    })
  }

  handleUpdate = () => {
    const customerID = this.state.selected[0]
    const customers = [...this.state.customers]
    const customerIndex = customers.findIndex(customer => {
      return customer.id === customerID
    })
    const customer = {
      customerID: customers[customerIndex].id,
      firstname: this.state.eFirstName,
      lastname: this.state.eLastName,
      email: this.state.eEmail,
      description: this.state.eDescription,
      balance: this.state.eBalance
    }
    customers[customerIndex].firstname = this.state.eFirstName
    customers[customerIndex].lastname = this.state.eLastName
    customers[customerIndex].email = this.state.eEmail
    customers[customerIndex].description = this.state.eDescription
    customers[customerIndex].balance = this.state.eBalance
    this.setState({customers: customers, selected: [], editUserModalStatus: false})
    const url = this.state.apiURL+'updatecustomer'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    }).catch(error => console.error('Error:', error))
    .then(res => {
        console.log(res)
    })
  }

  handleDelete = () => {
    const customerID = this.state.selected[0]
    const customers = [...this.state.customers]
    const customerIndex = customers.findIndex(customer => {
      return customer.id === customerID
    })
    const url = this.state.apiURL+'deletecustomer'
    const customer = {customerID: customerID}
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(customer),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    customers.splice(customerIndex, 1)
    this.setState({customers: customers, selected: [], editUserModalStatus: false})
  }

  listCustomers = () => {
      var url = this.state.apiURL+'listcustomers';
      fetch(url, {method: 'POST'})
      .then((res) => {
        return res.json();
      }).catch(error => console.error('Error:', error))
      .then((res) => {
        console.log(res)
        if(res !== undefined) {
          const customers = res.data.map(customer => {
          return {
            id: customer.id, 
            firstname: customer.metadata.firstname,
            lastname: customer.metadata.lastname,
            email: customer.email,
            description: customer.description,
            balance: customer.account_balance
          }
        })
        this.setState({customers: customers})
        }
      });
  }
  render() {
    const { classes } = this.props;
    const { customers, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, customers.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length} editUser={this.handleEditUser} 
          addUser={() => this.setState({addUserModalStatus: true})} 
          handleClose={() => {this.setState({addUserModalStatus: false})}}
          handleSave={this.handleSave}
          isOpen={this.state.addUserModalStatus}
          editUserModal={this.openEditModal}
          isOpenEdit={this.state.editUserModalStatus}
          handleCloseEdit={() => {this.setState({editUserModalStatus: false})}}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
          defaultFirstName={this.state.eFirstName}
          defaultLastName={this.state.eLastName}
          defaultEmail={this.state.eEmail}
          defaultDescription={this.state.eDescription}
          defaultBalance={this.state.eBalance}
          setFirstName={(event) => this.setState({eFirstName: event.target.value})}
          setLastName={(event) => this.setState({eLastName: event.target.value})}
          setEmail={(event) => this.setState({eEmail: event.target.value})}
          setDescription={(event) => this.setState({eDescription: event.target.value})}
          setBalance={(event) => this.setState({eBalance: event.target.value})}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={customers.length}
            />
            <TableBody>
              {customers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.firstname}
                      </TableCell>
                      <TableCell>{n.lastname}</TableCell>
                      <TableCell>{n.email}</TableCell>
                      <TableCell>{n.description}</TableCell>
                      <TableCell>{n.balance}€</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);