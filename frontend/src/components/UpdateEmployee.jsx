import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/employees/${id}`, employee);
      navigate("/");
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={employee.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" value={employee.lastName} onChange={handleChange} required />
        <input type="email" name="email" value={employee.email} onChange={handleChange} required />
        <input type="text" name="department" value={employee.department} onChange={handleChange} required />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;