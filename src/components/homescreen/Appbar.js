import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawerPaper: {
      backgroundColor: '#343d46',
      height: '100%',
  }
}

class Appbar extends Component {
    render () {
        return (
            <div>
                <div>
                <AppBar position="static" >
                    <Toolbar>
                    <Typography variant="title" color="inherit" style={styles.flex}>
                        Customer Management
                    </Typography>
                    </Toolbar>
                </AppBar>
                </div>
            </div>
        )
    }  
}

export default Appbar