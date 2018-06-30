import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Edituser from "./Edituser";
import Edit from '@material-ui/icons/Edit'
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class UserEditModal extends React.Component {
  render() {
    return (
      <div>
        <Tooltip title="Edit Customer">
            <IconButton onClick={this.props.editUser} aria-label="Edit Customer">
              <Edit />
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
            {"Edit Customer"}
          </DialogTitle>
          <DialogContent style={{ paddingLeft: '100px', paddingRight: '100px' }}  >
               <Edituser 
                    getFirstName={(event) => this.props.setFirstName(event)}
                    getLastName={(event) => this.props.setLastName(event)} 
                    getEmail={(event) => this.props.setEmail(event)} 
                    getDescription={(event) => this.props.setDescription(event)}
                    getBalance={(event) => this.props.setBalance(event)}
                    defaultFirstName={this.props.defaultFirstName}
                    defaultLastName={this.props.defaultLastName}
                    defaultEmail={this.props.defaultEmail}
                    defaultDescription={this.props.defaultDescription} 
                    defaultBalance={this.props.defaultBalance} 
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleUpdate} color="primary">
              update
            </Button>
            <Button onClick={this.props.handleDelete} color="primary">
              delete
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
              cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserEditModal;