const axios = require('axios').default; 

function getEmployees() {
    return axios.get('http://localhost:8080/emp/get')
}

function addEmployees(Employee) {
    return axios.post('http://localhost:8080/emp/add',Employee)
}

function deleteEmployees(id){
    return axios.put('http://localhost:8080/emp/delete/'+id)
    
}

function updateEmployees(id,Employee){
    return axios.put('http://localhost:8080/emp/update/'+id,Employee)
    
}

function getEmployeesById(id){
    return axios.get('http://localhost:8080/emp/getById/'+id)
}


module.exports={getEmployees,addEmployees,deleteEmployees,getEmployeesById,updateEmployees}