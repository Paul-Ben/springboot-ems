import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";
const Add_Employee_URL = "http://localhost:8080/api/employees/add";


export const listEmployees = ()=>{
    return axios.get(REST_API_BASE_URL);
}

export const addEmployee = (employee) =>{
    return axios.post(Add_Employee_URL, employee);
}

export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL+ '/' +employeeId);

export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL+ '/' +employeeId, employee);