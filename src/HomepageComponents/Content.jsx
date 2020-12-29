import React, { Component } from 'react'
import image1 from '../assets/add-24px.svg'
import MainReg from '../RegistrationPageComponents/RegMain';
import Table from './Table';
export class Content extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            count:10
        }

        
    }

    onCountUpdation=(val)=>{
        this.setState({
            count:val
        })
    }
    
    render() {
        let url = 'http://localhost:3000/register'
        return (
            <div className="main-content">
                <div className="header-content">
                    <div className="emp-detail-text">
                        Employee Details<div className="emp-count">{this.state.count}</div>
                    </div>
                    <a href={url} className="add-button">
                    <img src={image1} alt=""/>Add User</a>
                </div>
                <Table onUpdateTable={this.onCountUpdation}></Table>
            </div>
        )
    }
}

export default Content
