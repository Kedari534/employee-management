import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
    setErrorMessage(""); // Clear error message on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/employees", employee);
      setEmployee({ firstName: "", lastName: "", email: "", department: "" });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data); // Show backend error (e.g., duplicate email)
      } else {
        setErrorMessage("Employee with email ... already exists");
      }
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Employee</h2>
      {errorMessage && <div className="error-message" style={{ color: "red" }}>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
