import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddCircle from '@material-ui/icons/AddCircle'
import Adduser from "./Adduser"
function Transition(props) {
  return <Slide direction="up" {...props} />
}

class UserAddModal extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        description: '',
        balance: ''
    }
  render() {
    return (
      <div>
        <Tooltip title="Add Customer">
            <IconButton onClick={this.props.addUser} aria-label="Add Customer">
              <AddCircle />
            </IconButton>
        </Tooltip>
        <Dialog
          open={this.props.isOpen || false}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Add New Customer"}
          </DialogTitle>
          <DialogContent style={{ paddingLeft: '100px', paddingRight: '100px' }} >
               <Adduser 
                    getFirstName={(event) => this.setState({firstName: event.target.value})}
                    getLastName={(event) => this.setState({lastName: event.target.value})} 
                    getEmail={(event) => this.setState({email: event.target.value})} 
                    getDescription={(event) => this.setState({description: event.target.value})}
                    getBalance={(event) => this.setState({balance: event.target.value})}
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.handleSave(this.state)} color="primary">
              Save
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default UserAddModal