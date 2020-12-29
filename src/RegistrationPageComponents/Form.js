import React, { Component } from 'react'
import image1 from '../assets/Ellipse -3.png'
import image2 from '../assets/Ellipse 1.png'
import image3 from '../assets/Ellipse -8.png'
import image4 from '../assets/Ellipse -7.png'
import API from '../Integrate/Integration'
import { withRouter } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert'


export class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             open:false,
             department:[],
             fields:{
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
    
    handleChange = (e) => {
        let fields = this.state.fields;

        fields[e.target.name] = e.target.value;
        let firstNameRegex = RegExp("^([A-Z]{1})([a-z]{2,})$");
        let date = new Date(fields.day+" "+fields.month+" "+fields.year)
        let currentDate = new Date()
        let dateDifference = Math.ceil((Math.abs(date-currentDate))/(1000 * 60 * 60 * 24))
        
        if(!firstNameRegex.test(fields.name)){
            this.setState({
                nameError:'Name Incorrect'
            })    
        }
        else{
            this.setState({
                fields,
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
                fields,
                dateError:''
            })
        }
        this.setState(state=>{
            if(state.fields.department!="" && !state.department.includes(state.fields.department)){
                const department = [...state.department,state.fields.department];
                return {department};
            }
            
        })

        console.log(this.state);
    }

    handleSubmit = (e) => {

        this.setState({
            open:true
        })

        let Employee = {
            name: this.state.fields.name,
            profile:this.state.fields.profile,
            gender:this.state.fields.gender,
            department:this.state.department.join(),
            salary: this.state.fields.salary,
            day:this.state.fields.day,
            month:this.state.fields.month,
            year:this.state.fields.year,
            notes:this.state.fields.Notes     
        }
        console.log(Employee);
        
        this.axiosFunc(Employee,function(response) {
            console.log(response)});
            
        e.preventDefault();
        window.setTimeout(function(){
            window.location = "http://localhost:3000/dashboard";
        },2000)
    }
    
    axiosFunc=function(Employee,callback){

        let response=API.addEmployees(Employee)
        response.then(r=>{
            callback(r.data)
        }).catch(err=>{
            console.log(err)
        })

    }
    
    onReset(){
        this.setState({
            department:[],
            fields:{
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
            <div id="formId" className="form-content" onSubmit={this.handleSubmit}>
            <form className="form" action="#">
                <div className="form-head">
                    Employee Payroll Form
                </div>
                <div className="row-content">
                    <label className="label text"htmlFor="name">Name</label>
                    <input className="input" type="text" id="name" name="name" onChange={this.handleChange} placeholder="Your name...." required/>
                    <error-output className="text-error" htmlFor="text">{this.state.nameError}</error-output>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="profile">Profile Image</label>
                    <div className="profile-radio-content">
                        <label>
                            <input type="radio" id="profile1" onChange={this.handleChange} name="profile" value="../assets/Ellipse -3.png" required/>
                            <img className="profile" id="image" src={image1}/>
                        </label>
                        <label>
                            <input type="radio" id="profile2" onChange={this.handleChange} name="profile" value="../assets/Ellipse 1.png" required/>
                            <img className="profile" id="image2" src={image2}/>
                        </label>
                        <label>
                            <input type="radio" id="profile3" onChange={this.handleChange} name="profile" value="../assets/Ellipse -8.png" required/>
                            <img className="profile" id="image3" src={image3}/>
                        </label>
                        <label>
                            <input type="radio" id="profile4" onChange={this.handleChange} name="profile" value="../assets/Ellipse -7.png" required/>
                            <img className="profile" id="image4" src={image4}/>
                        </label>
                    </div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="gender">Gender</label>
                    <div>
                        <input type="radio" id="male" onChange={this.handleChange} name="gender" value="male"/>
                        <label className="text" htmlFor="male">Male</label>
                        <input type="radio" id="female" onChange={this.handleChange} name="gender" value="female"/>
                        <label className="text" htmlFor="female">Female</label>
                    </div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="department">Department</label>
                    <div>
                        <input className="checkbox" type="checkbox" onChange={this.handleChange} id="hr" name="department" value="HR"/>
                        <label className="text" htmlFor="hr">HR</label>
                        <input className="checkbox" type="checkbox" onChange={this.handleChange} id="sales" name="department" value="Sales"/>
                        <label className="text" htmlFor="sales">Sales</label>
                        <input className="checkbox" type="checkbox" onChange={this.handleChange} id="finance" name="department" value="Finance"/>
                        <label className="text" htmlFor="finance">Finance</label>
                        <input className="checkbox" type="checkbox" onChange={this.handleChange} id="engineer" name="department" value="Engineer"/>
                        <label className="text" htmlFor="engineer">Engineer</label>
                        <input className="checkbox" type="checkbox" onChange={this.handleChange} id="others" name="department" value="Others"/>
                        <label className="text" htmlFor="others">Others</label>
                    </div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="salary">Choose your salary</label>
                    <input className="input" type="range" name="salary" onChange={this.handleChange} id="salary" min="300000" max="500000" step="100" value={this.state.fields.salary}/>
                    <output className="salary-output text" htmlFor="salary">{this.state.fields.salary}</output>
                </div>
                <div className="row-content" >
                    <label className="label text" htmlFor="startDate">Start Date</label>
                    <div id="date">
                        <select id="day" onChange={this.handleChange} name="day">
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
                        <select id="month" onChange={this.handleChange} name="month">
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
                        <select id="year" onChange={this.handleChange} name="year">
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
                    <textarea id="notes" className="input" name="Notes" onChange={this.handleChange} placeholder="" style={{height: 100}}></textarea>
                </div>
                <div className="button-content">
                    <a href="/dashboard" className="resetButton button cancelButton">Cancel</a>
                    <div className="submit-reset">
                        <button type= "submit" className="button submitButton" id="submitButton">Submit</button>
                        <Snackbar open={this.state.open}>
                            <Alert severity="success">
                                Employee Added!! 
                            </Alert>
                        </Snackbar>
                        <button type="reset" className="resetButton button">Reset</button>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

export default Form 
