import React, { Component } from 'react'
import css1 from '../css/homepage-header.css'
import css2 from '../css/homepage-adduserHeader.css'
import css3 from '../css/homepage-table.css'
import Content from './Content'
import HeaderComponent from './HeaderComponent'
import Table from './Table'

export class Main extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }

        
    }
    
    
    render() {
        return (
            <div >
              <HeaderComponent  style={css1}></HeaderComponent>  
              <Content></Content>
            </div>
        )
    }
}

export default Main
