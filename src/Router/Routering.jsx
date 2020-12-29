import React, { Component } from 'react'
import {BrowserRouter as Router,
    Switch,
    Route,Redirect, BrowserRouter
  } from "react-router-dom"
import EmployeeDashBoard from '../Dashboard/EmployeeDashBoard'
import HeaderComponent from '../HomepageComponents/HeaderComponent'
import Form from '../RegistrationPageComponents/Form'
import UpdationForm from '../Updater/UpdationForm'




export class Routering extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             
             
        }

    }
    
    

    componentDidUpdate(prevState){
        if(this.state!=prevState){
            console.log(this.state,prevState)  
        }
    }

    render() {
        
        return (
            <div>
                
                    <BrowserRouter>
                    <Switch>            
                    <Route exact path="/update">
                    <HeaderComponent></HeaderComponent>
                    <UpdationForm id={this.state.id}></UpdationForm>
                    </Route>
                    <Route exact path='/register'>
                        <HeaderComponent></HeaderComponent>
                        <Form></Form>
                    </Route>
                    <Route exact path='/'>
                        <EmployeeDashBoard></EmployeeDashBoard>
                    </Route>
                    </Switch>
                    </BrowserRouter>
                
            </div>
        )
    }
}

export default Routering
