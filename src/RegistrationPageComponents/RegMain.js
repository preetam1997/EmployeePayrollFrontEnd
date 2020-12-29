import React, { Component } from 'react'
import HeaderComponent from '../HomepageComponents/HeaderComponent'
import css1 from '../css/homepage-header.css'
import css2 from '../css/form.css'
import css3 from '../css/button.css'
import css4 from '../css/select.css'
import css5 from '../css/radioContent.css'
import Form from './Form'


export class RegMain extends Component {
    render() {
        return (
            <div>
                <HeaderComponent style={css1}></HeaderComponent>
                <Form style={css2,css3,css4,css5}></Form>
            </div>
        )
    }
}

export default RegMain
