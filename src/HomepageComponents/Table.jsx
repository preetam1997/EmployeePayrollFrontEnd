import React, { Component } from 'react'
import { useHistory } from "react-router-dom"
import API from '../Integrate/Integration'
import asset1 from '../assets/delete-black-18dp.svg'
import asset2 from '../assets/create-black-18dp.svg'
import { myContext } from '../Dashboard/EmployeeDashBoard'




export class Table extends Component {
    constructor() {
        super()
    
        this.state = {
             image:'',
             update:false,
             employees:[],
             imageMapping: new Map(),
             count:0
        }

        
    }

    componentDidMount() {
        API.getEmployees().then(response => {
            console.log(response)
            this.setState({
                employees: response.data,
                
            })
            console.log(this.state.employees)
            this.props.onUpdateTable(this.state.employees.length)
        }).catch()
    
        this.state.imageMapping.set("../assets/Ellipse -3.png",require("../assets/Ellipse -3.png").default)
        this.state.imageMapping.set("../assets/Ellipse 1.png",require("../assets/Ellipse 1.png").default)
        this.state.imageMapping.set("../assets/Ellipse -8.png",require("../assets/Ellipse -8.png").default)
        this.state.imageMapping.set("../assets/Ellipse -7.png",require("../assets/Ellipse -7.png").default)

    }

    

   

   delete(id){
       API.deleteEmployees(id)
       window.location.reload();
   }

   

    render() {
        if(this.state.employees.length==0){
            return (
                
                <div>
                        
                </div>
            )
        }
        else{
            return(
                <myContext.Consumer>
                    {data=>(
                        <table id="table-display" className="table">
                        <tbody>
                        <tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>
                        {this.state.employees.map(emp=>{
                            return(

                            <tr>
                            <td><img className="profile" loading='eager' src={this.state.imageMapping.get(emp.profile)}  alt="profilePic" /></td>
                            <td>{emp.name}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary}</td>
                            <td>{emp.day+'/'+emp.month+'/'+emp.year}</td>
                            <td>
                                <img id={emp.id} alt="delete" onClick={()=>this.delete(emp.id)}
                                    src={asset1}/>
                                <img id={emp.id} alt="edit" onClick={()=>data.handleChange(emp.id)}
                                        src={asset2}/>
                                
                            </td>
                        </tr>
                            )
                        })}
                        </tbody>
                    </table> 
                    )}
                
            </myContext.Consumer>                
            )
        }
        
    }
}

export default Table
