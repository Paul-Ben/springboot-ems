import React, { useState, useEffect } from "react";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
// import { response } from "express";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigator = useNavigate();

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  // function handleFirstName(e) {
  //   setFirstName(e.target.value);
  // }

  // function handleLastName(e) {
  //   setLastName(e.target.value);
  // }

  // function handleEmail(e) {
  //   setEmail(e.target.value);
  // }

  // const handleFirstName= (e) => setFirstName(e.target.value);
  // const handleLastName= (e) => setLastName(e.target.value);
  // const handleEmail= (e) => setEmail(e.target.value);

  function saveEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        addEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required.";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required.";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form action="">
              <div className="form-group mb-2">
                <label htmlFor="firstName" className="form-label">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="lastName" className="form-label">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <button className="btn btn-success" onClick={saveEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
