import React, { Component } from 'react'
import image1 from '../assets/Ellipse -3.png'
import image2 from '../assets/Ellipse 1.png'
import image3 from '../assets/Ellipse -8.png'
import image4 from '../assets/Ellipse -7.png'
import API from '../Integrate/Integration'
import { withRouter } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'

class UpdationForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            open:false,
            department:[],
            employee:{
                name:'',
                profile:'',
                gender:'',
                department:'',
                salary:400000,
                day:'1',
                month:'January',
                year:'2020',
                notes:''
            },
            
            nameError:'',
            dateError:''
        }
    }

    componentDidMount() {
        this.setState({
            id:this.props.location.state,
        })

        this.fetchData()
        console.warn(this.props.location.state)
    }

    fetchData(){
        API.getEmployeesById(this.props.location.state).then(response => {
            console.log(response.data.id)
            
            this.setState({
                employee: response.data,
            })
            
            

            this.setState(state=>{
                let list = state.employee.department.split(',')
                state.employee.department=''
                const department = [...list]
                return {department};
                
                
            })
        }).catch()
        
    }

    handleChange = (e) => {
        let employee = this.state.employee;
        employee[e.target.name] = e.target.value;
        this.setState({
            employee
        })

        let firstNameRegex = RegExp("^([A-Z]{1})([a-z]{2,})$");
        let date = new Date(employee.day+" "+employee.month+" "+employee.year)
        let currentDate = new Date()
        let dateDifference = Math.ceil((Math.abs(date-currentDate))/(1000 * 60 * 60 * 24))
        
        if(!firstNameRegex.test(employee.name)){
            this.setState({
                nameError:'Name Incorrect'
            })    
        }
        else{
            this.setState({
                employee,
                nameError: ''
            })
        }

        if(date>currentDate || dateDifference>90){
            this.setState({
                dateError:'Date Incorrect'
            }) 
        }
        else{
            this.setState({
                employee,
                dateError:''
            })
        }



        this.setState(state=>{
            if(state.employee.department!="" && !state.department.includes(state.employee.department)){
                const department = [...state.department,state.employee.department];
                state.employee.department=''
                return {department};
            }
            else if(state.department.includes(state.employee.department)){
                const index = state.department.indexOf(state.employee.department);
                if (index > -1) {
                    state.department.splice(index, 1);
                }
                state.employee.department=''

            }
        })
        console.log(this.state);
    }

    handleSubmit = (e) => {

        this.setState({
            open:true
        })

        let Employee = {
            name: this.state.employee.name,
            profile:this.state.employee.profile,
            gender:this.state.employee.gender,
            department:this.state.department.join(),
            salary: this.state.employee.salary,
            day:this.state.employee.day,
            month:this.state.employee.month,
            year:this.state.employee.year,
            notes:this.state.employee.notes     
        }
        console.log(Employee);
        API.updateEmployees(this.state.id,Employee)

        e.preventDefault();
        window.setTimeout(function(){
            window.location = "http://localhost:3000/dashboard";
        },2000)
    }

    onReset(){
        this.setState({
            department:[],
            employee:{
                name:'',
                profile:'',
                gender:'',
                department:'',
                salary:'',
                day:'1',
                month:'January',
                year:'2020',
                notes:''
            }
        });
    }
    
    render() {
        return (
            <div>
                <div id="formId" className="form-content" onSubmit={this.handleSubmit}>
                    <form className="form" action="#">
                        <div className="form-head">
                            Employee Payroll Form
                        </div>
                        <div className="row-content">
                            <label className="label text"htmlFor="name">Name</label>
                            <input className="input" type="text" id="name" name="name" onChange={this.handleChange} value={this.state.employee.name} placeholder="Your name...." required/>
                            <error-output className="text-error" htmlFor="text">{this.state.nameError}</error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="profile">Profile Image</label>
                            <div className="profile-radio-content">
                                <label>
                                    <input type="radio" id="profile1" onChange={this.handleChange} name="profile" checked={this.state.employee.profile=="../assets/Ellipse -3.png"} value="../assets/Ellipse -3.png" required/>
                                    <img className="profile" id="image" src={image1}/>
                                </label>
                                <label>
                                    <input type="radio" id="profile2" onChange={this.handleChange} name="profile" checked={this.state.employee.profile=="../assets/Ellipse 1.png"} value="../assets/Ellipse 1.png" required/>
                                    <img className="profile" id="image2" src={image2}/>
                                </label>
                                <label>
                                    <input type="radio" id="profile3" onChange={this.handleChange} name="profile" checked={this.state.employee.profile=="../assets/Ellipse -8.png"} value="../assets/Ellipse -8.png" required/>
                                    <img className="profile" id="image3" src={image3}/>
                                </label>
                                <label>
                                    <input type="radio" id="profile4" onChange={this.handleChange} name="profile" checked={this.state.employee.profile=="../assets/Ellipse -7.png"} value="../assets/Ellipse -7.png" required/>
                                    <img className="profile" id="image4" src={image4}/>
                                </label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="gender">Gender</label>
                            <div>
                                <input type="radio" id="male" onChange={this.handleChange} name="gender" checked={this.state.employee.gender=="male"} value="male"/>
                                <label className="text" htmlFor="male">Male</label>
                                <input type="radio" id="female" onChange={this.handleChange} name="gender" checked={this.state.employee.gender=="female"} value="female"/>
                                <label className="text" htmlFor="female">Female</label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="department">Department</label>
                            <div>
                                <input className="checkbox" type="checkbox" onChange={this.handleChange} id="hr" checked={this.state.department.includes("HR")} name="department" value="HR"/>
                                <label className="text" htmlFor="hr">HR</label>
                                <input className="checkbox" type="checkbox" onChange={this.handleChange} id="sales" checked={this.state.department.includes("Sales")} name="department" value="Sales"/>
                                <label className="text" htmlFor="sales">Sales</label>
                                <input className="checkbox" type="checkbox" onChange={this.handleChange} id="finance"checked={this.state.department.includes("Finance")} name="department" value="Finance"/>
                                <label className="text" htmlFor="finance">Finance</label>
                                <input className="checkbox" type="checkbox" onChange={this.handleChange} id="engineer" checked={this.state.department.includes("Engineer")} name="department" value="Engineer"/>
                                <label className="text" htmlFor="engineer">Engineer</label>
                                <input className="checkbox" type="checkbox" onChange={this.handleChange} id="others" checked={this.state.department.includes("Others")} name="department" value="Others"/>
                                <label className="text" htmlFor="others">Others</label>
                            </div>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="salary">Choose your salary</label>
                            <input className="input" type="range" name="salary" onChange={this.handleChange} id="salary" min="300000" max="500000" step="100" value={this.state.employee.salary}/>
                            <output className="salary-output text" htmlFor="salary">{this.state.employee.salary}</output>
                        </div>
                        <div className="row-content" >
                            <label className="label text" htmlFor="startDate">Start Date</label>
                            <div id="date">
                                <select id="day" onChange={this.handleChange}  value={this.state.employee.day} name="day">
                                    <option value = "1">1</option>
                                    <option value = "2">2</option>
                                    <option value = "3">3</option>
                                    <option value = "4">4</option>
                                    <option value = "5">5</option>
                                    <option value = "6">6</option>
                                    <option value = "7">7</option>
                                    <option value = "8">8</option>
                                    <option value = "9">9</option>
                                    <option value = "10">10</option>
                                    <option value = "11">11</option>
                                    <option value = "12">12</option>
                                    <option value = "13">13</option>
                                    <option value = "14">14</option>
                                    <option value = "15">15</option>
                                    <option value = "16">16</option>
                                    <option value = "17">17</option>
                                    <option value = "18">18</option>
                                    <option value = "19">19</option>
                                    <option value = "20">20</option>
                                    <option value = "21">21</option>
                                    <option value = "22">22</option>
                                    <option value = "23">23</option>
                                    <option value = "24">24</option>
                                    <option value = "25">25</option>
                                    <option value = "26">26</option>
                                    <option value = "27">27</option>
                                    <option value = "28">28</option>
                                    <option value = "29">29</option>
                                    <option value = "30">30</option>
                                    <option value = "31">31</option>
                                </select>
                                <select id="month" onChange={this.handleChange} value={this.state.employee.month} name="month">
                                    <option value = "January">January</option>
                                    <option value = "February">February</option>
                                    <option value = "March">March</option>
                                    <option value = "April">April</option>
                                    <option value = "May">May</option>
                                    <option value = "June">June</option>
                                    <option value = "July">July</option>
                                    <option value = "August">August</option>
                                    <option value = "September">September</option>
                                    <option value = "October">October</option>
                                    <option value = "November">November</option>
                                    <option value = "December">December</option>
                                </select>
                                <select id="year" onChange={this.handleChange} value={this.state.employee.year} name="year">
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                </select>
                            </div>
                            <error-output className="date-error" htmlFor="startDate">{this.state.dateError}</error-output>
                        </div>
                        <div className="row-content">
                            <label className="label text" htmlFor="notes">Notes</label>
                            <textarea id="notes" className="input" name="notes" onChange={this.handleChange} value={this.state.employee.notes} placeholder="" style={{height: 100}}></textarea>
                        </div>
                        <div className="button-content">
                            <a href="./html_1.html" className="resetButton button cancelButton">Cancel</a>
                            <div className="submit-reset">
                                <button type= "submit" className="button submitButton" id="submitButton">Update</button>
                                <Snackbar open={this.state.open}>
                                    <Alert severity="success">
                                         Employee Updated!! 
                                    </Alert>
                                </Snackbar>
                                <button type="reset" className="resetButton button">Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(UpdationForm)  
