import React, { Component } from 'react'
import image1 from '../assets/logo.png'


export class HeaderComponent extends Component {
    render() {
        return (
            <div>
            <header className="1header-content header">
                <div className="logo-content">
                <img src={image1} alt=""></img>
                <div>
                    <span className="emp-text">EMPLOYEE</span><br/>
                    <span className="emp-text emp-payroll">PAYROLL</span>
                </div>
                </div>
            </header>
            </div>
        )
    }
}

export default HeaderComponent
