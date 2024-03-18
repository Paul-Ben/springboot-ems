import React, {useEffect, useState} from 'react';
import {listEmployees} from "../services/EmployeeService";
import {useNavigate} from 'react-router-dom';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([]);

    const navigator = useNavigate();

    useEffect(()=>{
        listEmployees().then((response)=>{
            setEmployees(response.data);
        }).catch(error =>{
            console.error(error);
        })
    }, [])

    // const dummyData = [
    //     {
    //         "id": 1,
    //         "firstName": "Paul",
    //         "lastName": "Ajene",
    //         "email": "paul@gmail.com"
    //     },
    //     {
    //         "id": 2,
    //         "firstName": "Zeus",
    //         "lastName": "Ajene",
    //         "email": "zeus@gmail.com"
    //     },
    //     {
    //         "id": 3,
    //         "firstName": "Zerah",
    //         "lastName": "Ajene",
    //         "email": "zerah@gmail.com"
    //     },
    //     {
    //         "id": 4,
    //         "firstName": "zita",
    //         "lastName": "Ajene",
    //         "email": "zita@gmail.com"
    //     }
    // ]

    const addEmployee = () =>{
        navigator("/add-employee")
    }

    // const updateEmployee = (id) =>{
    //     navigator(`/edit-employee/${id}`)
    // }

    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }

    return (
        <div className='container'>
            <div className="pt-5"></div>
            <div className='pt-5'>
                <h2 className="text-center">List of Employees</h2>
                <button className='btn btn-primary mb-2' onClick={addEmployee}>Add Employee</button>
                <div className="container">
                <table className='table table-striped table-bordered'>
            <thead className='thead-dark'>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td><button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>update</button></td>
                        </tr>
                        )
                }
            </tbody>
        </table>
                </div>
            </div>

        </div>
    )
}

export default ListEmployeeComponent