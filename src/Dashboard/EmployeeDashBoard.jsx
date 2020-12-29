import React, { Component } from 'react'
import Main from '../HomepageComponents/Main'
import { withRouter } from 'react-router-dom'

export const myContext = React.createContext()
class EmployeeDashBoard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id:2,
            count:2
        }
    }
    
    handleId=(idVal)=>{
        this.props.history.push({
            pathname:"/update" ,
            state: idVal 
        })

        console.log("routing",this.state.id)
    }
    render() {
        const contextValue ={
            id:this.state.id,
            handleChange:(idVal)=>{this.handleId(idVal)}
        }
        return (
            <div>
                <myContext.Provider value={contextValue}>
                        <Main></Main>
                </myContext.Provider>
            </div>
        )
    }
}

export default withRouter(EmployeeDashBoard) 
