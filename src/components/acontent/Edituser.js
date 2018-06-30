import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Edituser extends Component {

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
                        value={this.props.defaultFirstName}
                        label="First Name"
                        id="mui-theme-provider-input"
                        />
                    </div>
                    <div>
                        <TextField
                        onChange={(event) => this.props.getLastName(event)}
                        value={this.props.defaultLastName}
                        label="Last Name"
                        id="mui-theme-provider-input"
                        />
                    </div>
                    <div>
                        <TextField
                        onChange={(event) => this.props.getEmail(event)}
                        value={this.props.defaultEmail}
                        label="E-Mail"
                        id="mui-theme-provider-input"
                        />
                    </div>
                    <div>
                        <TextField
                        onChange={(event) => this.props.getDescription(event)}
                        value={this.props.defaultDescription}
                        label="Description"
                        id="mui-theme-provider-input"
                        />
                    </div>
                    <div>
                        <TextField
                        onChange={(event) => this.props.getBalance(event)}
                        value={this.props.defaultBalance}
                        label="Balance"
                        id="mui-theme-provider-input"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Edituser;