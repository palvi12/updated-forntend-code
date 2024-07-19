import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../utils/axiosInstance";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Pagination from "react-bootstrap/Pagination";

const ListPatientComponent = () => {
  const [patients, setpatients] = useState([]);
  const[Ttlpat,setTtlpat]=useState(0);
  const[initailPatient,setinitialPatient]=useState([]);
  const [Search_Patient, setSearch_Patient] = useState([]);
  const [sortedBy, setSortedBy] = useState("default");
  
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5; // data to fetch per page in pagination
 

  // get all patients data
  const getAllUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/patients/getAllUsers");
      setpatients([...data]);
      setTtlpat(data.length);
      setinitialPatient(data);
      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  };

  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const indexOfLastItem =pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const InitPatient=initailPatient;
    setpatients([...InitPatient.slice(indexOfFirstItem, indexOfLastItem)])
  };

  const totalPages = Math.ceil(Ttlpat / itemsPerPage);

  useEffect(() => {
   

    if (patients.length === 0) getAllUsers();
  }, []);

  useEffect(() => {
    if (patients.length > 0) {
      if (sortedBy === "name") {
        setpatients(
          [...patients].sort((a, b) => a.name.localeCompare(b.name))
        );
      } else if (sortedBy === "gender") {
        setpatients(
          [...patients].sort((a, b) => b.gender.localeCompare(a.gender))
        );
      } else if (sortedBy === "appointment_date") {
        setpatients(
          [...patients].sort(
            (a, b) =>
              new Date(a.appointment_date) - new Date(b.appointment_date)
          )
        );
      } else if (sortedBy === "discharge_date") {
        setpatients(
          [...patients].sort(
            (a, b) => new Date(a.discharge_date) - new Date(b.discharge_date)
          )
        );
      } 
    }
  }, [patients, sortedBy]);

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    setSortedBy(sortBy);
  };

  const deletePatient = async (pid) => {
    console.log({ pid });
    try {
      const { data } = await axiosInstance.delete(`/patients/delete/${pid}`);
      const updatedPatients = patients.filter((patient) => patient.pid !== pid);
      setpatients(updatedPatients);
      setTtlpat(Ttlpat-1);
      setinitialPatient(updatedPatients);
      toast.success(`Data with PID: ${pid} deleted.`);
    } catch (error) {
      console.log({ error });
    }
  };
  const SearchPatient = async () => {
    //console.log({});
    try {
      const { data } = await axiosInstance.get(
        `/patients/search?query=${Search_Patient}`
      );
      //console.log({data});
      if (data.length === 0) {
        toast.warn("No data found");
      } else {setpatients([...data]);
      setTtlpat(data.length);
    setinitialPatient(data)}
    } catch (error) {
      console.log({ error });
    }
  };

  const handleReset = async () => {
    setpatients("");
    setSearch_Patient(" ");
    getAllUsers();
  };

  return (
    <Container>
      <h2 className="text-center">List Patients</h2>
      <Link to="/add-patient" className="btn btn-primary mx-2">
        {" "}
        <i className="bi bi-folder-plus"></i> Add Patient
      </Link>
      <button className="btn btn-danger mx-2" onClick={() => SearchPatient()}>
        <i className="bi bi-search"></i> Search Patient
      </button>
      <button className="btn btn-warning mx-2" onClick={() => handleReset()}>
        Reset
      </button>
      <input
        type="text"
        placeholder="Search_Patient"
        name="Search_Patient"
        className="form-control my-2"
        value={Search_Patient}
        onChange={(e) => setSearch_Patient(e.target.value)}
      />

      <label htmlFor="sortBy">
        <h5>Sort By:</h5>
      </label>
      <select id="sortBy" value={sortedBy} onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="name">Name</option>
        <option value="gender">Gender</option>
        <option value="appointment_date">Appointment Date</option>
        <option value="discharge_date">Discharge Date</option>
      </select>

      {patients.length>0? <> <table className="table table-bordered table-striped">
        <thead  style={{verticalAlign: "middle"}}>
          <th> Id</th>
          <th> Name</th>
          <th> Phone number</th>
          <th> Gender</th>
          <th> Address</th>
          <th> Appointment date</th>
          <th> Discharge_date</th>
          <th> hospital Id</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index} style={{verticalAlign: "middle"}}>
              <td>{patient.pid}</td>
              <td>{patient.name}</td>
              <td>{patient.phone_no}</td>
              <td>{patient.gender}</td>
              <td>{patient.address}</td>
              <td>{patient.appointment_date}</td>
              <td>{patient.discharge_date}</td>
              <td>{patient.hospitalId}</td>
              <td>
                <Link
                  className="btn btn-info"
                  to={`/edit-patient/${patient.pid}`}
                >
                  <i className="bi bi-pencil-square"></i>
                </Link>

                <button
                  className="btn btn-danger"
                  onClick={() => deletePatient(patient.pid)}
                   style={{ marginLeft: "10px" }}
                >
                  {" "}
                  <i className="bi bi-trash3-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
      </>

      :<></>}

      
      <ToastContainer />
    </Container>
  );
};

export default ListPatientComponent;
