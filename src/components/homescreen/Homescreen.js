import React, { Component } from 'react'
import Appbar from './Appbar'
import Userman from '../acontent/Userman'

class Homescreen extends Component {
    render () {
        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'white'}}>
                <div style={{ height: '100px' }}>
                    <Appbar/>
                </div>
                <div style={{ flex: 1, display: 'flex' }}>
                    <Userman />
                </div>
            </div>
        )
    }
}

export default Homescreen