import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Adduser extends Component {

    state = {
        gender: 'male',
    }
    
    render () {
        return (
            <div style={{ marginRight: '20px' }} >
                    <div style={{ padding: '30px'  }}  >
                        <div>
                            <TextField
                            onChange={(event) => this.props.getFirstName(event)}
                            label="First Name"
                            id="mui-theme-provider-input"
                            />
                        </div>
                        <div>
                            <TextField
                            onChange={(event) => this.props.getLastName(event)}
                            label="Last Name"
                            id="mui-theme-provider-input"
                            />
                        </div>
                        <div>
                            <TextField
                            onChange={(event) => this.props.getEmail(event)}
                            label="E-Mail"
                            id="mui-theme-provider-input"
                            />
                        </div>
                        <div>
                            <TextField
                            onChange={(event) => this.props.getDescription(event)}
                            label="Description"
                            id="mui-theme-provider-input"
                            />
                        </div>
                        <div>
                            <TextField
                            onChange={(event) => this.props.getBalance(event)}
                            label="Balance"
                            id="mui-theme-provider-input"
                            />
                        </div>
                    </div>
            </div>
        
        )
    }
}

export default Adduser;