import React,{useState,useEffect} from 'react'
import {withRouter} from 'react-router'
import image1 from '../assets/Ellipse -3.png'
import image2 from '../assets/Ellipse 1.png'
import image3 from '../assets/Ellipse -8.png'
import image4 from '../assets/Ellipse -7.png'

const PayrollForm=(props)=>{
    let initialValue={
        name:'',
        profileArray:[
            {url:'../assets/Ellipse -3.png'},
            {url:'../assets/Ellipse 1.png'},
            {url:'../assets/Ellipse -8.png'},
            {url:'../assets/Ellipse -7.png'}
        ],
        allDepartments:[
            'HR','Sales','Finance','Engineer','Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        day: '1',
        month: 'Jan',
        year: '2020',
        startDate: '',
        notes: '',
        id: '',
        profileUrl: '',
        isUpdate:false,
        error:{
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: '',
        }
    }
    const [formValue,setform] = useState(initialValue);

    const changevalue = (event)=>{
        setform({...formValue,[event.target.name]: event.target.value})
    }

    const onCheckChange = (name)=>{
        let index = formValue.departmentValue.indexOf(name)
        let checkArray = [...formValue.departmentValue]
        if(index>-1){
            checkArray.splice(index,1)
        }
        else
            checkArray.push(name);
        setform({...formValue, departmentValue:checkArray})
    }

    const getChecked=(name)=>{
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    const validData = async()=>{
        let isError = false;
        let error = {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: '',
        }
        if(formValue.name.length<1){
            error.name = 'name is Required Field'
            isError = true;
        }
        if(formValue.salary.length<1){
            error.salary = 'salary is Required Field'
            isError = true;
        }
        if(formValue.gender.length<1){
            error.gender = 'gender is Required Field'
            isError = true;
        }
        if(formValue.profileUrl.length<1){
            error.profileUrl = 'profileUrl is Required Field'
            isError = true;
        }
        if(formValue.departmentValue.length<1){
            error.departmentValue = 'departmentValue is Required Field'
            isError = true;
        }
        await setform({formValue,error: error})
        return isError;
    }
    const save=async(event)=>{
        event.preventDefault();
        console.log(save)

        // if(await validData()){
        //     console.log('error', formValue);
        //     return;
        // }

        let object = {
            name: formValue.name,
            department: formValue.departmentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            profileUrl: formValue.profileUrl,
            startDate: `${formValue.day} ${formValue.month} ${formValue.year}`,
            notes: formValue.notes,
            id:''
        }
        console.log(object)
    }
    const reset=()=>{
        setform({...initialValue,id:formValue.id,isUpdate:formValue.isUpdate})
        console.log(formValue);
    }

    return(
        <div id="formId" className="form-content">
            <form className="form" action="#" onReset={reset} onSubmit={save}>
                <div className="form-head">
                    Employee Payroll Form
                </div>
                <div className="row-content">
                    <label className="label text"htmlFor="name">Name</label>
                    <input className="input" type="text" id="name" name="name" onChange={changevalue} value={formValue.name} placeholder="Your name...." required/>
                    <div className="text-error" htmlFor="text">{formValue.error.name}</div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="profile">Profile Image</label>
                    <div className="profile-radio-content">
                        <label>
                            <input type="radio" id="profile1" name="profile" value="../assets/Ellipse -3.png"  onChange={changevalue} required/>
                            <img className="profile" id="image" src={image1}/>
                        </label>
                        <label>
                            <input type="radio" id="profile2" name="profile" value="../assets/Ellipse 1.png"  onChange={changevalue} required/>
                            <img className="profile" id="image2" src={image2}/>
                        </label>
                        <label>
                            <input type="radio" id="profile3" name="profile" value="../assets/Ellipse -8.png"  onChange={changevalue} required/>
                            <img className="profile" id="image3" src={image3}/>
                        </label>
                        <label>
                            <input type="radio" id="profile4" name="profile" value="../assets/Ellipse -7.png"  onChange={changevalue} required/>
                            <img className="profile" id="image4" src={image4}/>
                        </label>
                    </div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="gender">Gender</label>
                    <div>
                        <input type="radio" id="male"  onChange={changevalue} name="gender" value="male"/>
                        <label className="text" htmlFor="male">Male</label>
                        <input type="radio" id="female"  onChange={changevalue} name="gender" value="female"/>
                        <label className="text" htmlFor="female">Female</label>
                    </div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="department">Department</label>
                    <div>
                        <input className="checkbox" type="checkbox" id="hr" name="department" value="HR" onChange={()=>onCheckChange("HR")} defaultChecked={()=>getChecked("HR")}/>
                        <label className="text" htmlFor="hr">HR</label>
                        <input className="checkbox" type="checkbox" id="sales" name="department" value="Sales" onChange={()=>onCheckChange("Sales")} defaultChecked={()=>getChecked("Sales")}/>
                        <label className="text" htmlFor="sales">Sales</label>
                        <input className="checkbox" type="checkbox" id="finance" name="department" value="Finance" onChange={()=>onCheckChange("Finance")} defaultChecked={()=>getChecked("Finance")}/>
                        <label className="text" htmlFor="finance">Finance</label>
                        <input className="checkbox" type="checkbox" id="engineer" name="department" value="Engineer"onChange={()=>onCheckChange("Engineer")} defaultChecked={()=>getChecked("Engineer")}/>
                        <label className="text" htmlFor="engineer">Engineer</label>
                        <input className="checkbox" type="checkbox" id="others" name="department" value="Others" onChange={()=>onCheckChange("Others")} defaultChecked={()=>getChecked("Others")}/>
                        <label className="text" htmlFor="others">Others</label>
                    </div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="salary">Choose your salary</label>
                    <input className="input" type="range" name="salary" onChange={changevalue} id="salary" min="300000" max="500000" step="100" value={formValue.salary}/>
                    <output className="salary-output text" htmlFor="salary">{formValue.salary}</output>
                </div>
                <div className="row-content" >
                    <label className="label text" htmlFor="startDate">Start Date</label>
                    <div id="date">
                        <select onChange={changevalue} id="day" name="Day">
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
                        <select onChange={changevalue} id="month" name="Month">
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
                        <select onChange={changevalue} id="year" name="Year">
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                        </select>
                    </div>
                    <div className="date-error" htmlFor="startDate"></div>
                </div>
                <div className="row-content">
                    <label className="label text" htmlFor="notes">Notes</label>
                    <textarea onChange={changevalue} id="notes" className="input" name="Notes" placeholder="" style={{height: 100}}></textarea>
                </div>
                <div className="button-content">
                    <a href="./html_1.html" className="resetButton button cancelButton">Cancel</a>
                    <div className="submit-reset">
                        <button type= "submit" className="button submitButton" id="submitButton">Submit</button>
                        <button type="reset" className="resetButton button">Reset</button>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default withRouter(PayrollForm);