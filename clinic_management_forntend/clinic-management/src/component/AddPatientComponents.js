import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
//import {useHistory} from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPatientComponents = () => {
  const navigate = useNavigate();
  // const[patients,setPatients]=useState([]);
  const [pid, setpid] = useState("");
  const [pidError, setpidError] = useState("");
  const [name, setname] = useState("");
  const [nameError, setnameError] = useState("");

  const validateName = (value) => {
    if (!value.trim()) {
      setnameError("Name is required");
    } else if (!/[^0-9]/.test(value)) {
      setnameError("Name must contain only letters");
    } else {
      setnameError("");
    }
  };

  const handleNameChange = (e) => {
    if (!/^[0-9]/.test(e.target.value)) {
      setname(e.target.value);
      console.log(e.target.value);
      setnameError(false);
    } else setnameError(true);
  };

  const [phone_no, setphone_no] = useState("");
  const [isError, setIsError] = useState(false);
  const pattern =/^[0-9]{1,10}$/;
  const [gender, setgender] = useState("male");

  const [address, setaddress] = useState("");
  const [appointment_date, setappointment_date] = useState("");
  const [discharge_date, setdischarge_date] = useState("");
  // const [error, setError] = useState('');

  // const handleAppointmentDateChange=(date)=>{
  //   if(date<new Date()){
  //     console.error('Invalid appointment date');
  //   }else{
  //     setappointment_date(date);

  //   }
  // };
  // const handleDischargeDateChange = (date) => {
  //   // Validate discharge date (no past dates allowed)
  //   if (date < new Date()) {
  //     // Show an error message or handle it as needed
  //     console.error('Invalid discharge date');
  //   } else {
  //     setdischarge_date(date);
  //   }
  // };

  
  const currentDate=new Date().toISOString().split('T')[0];
  // const selectedAppointmentDate = new Date(appointment_date);
  // const selectedDischargeDate = new Date(discharge_date);

 

  const [hospitalId, sethospitalId] = useState("");

  const submitHandler = async (e) => {

    
    console.log(hospitalId)
    e.preventDefault();
    if(hospitalId===""){
      toast.error("Please select hospital name")
      return
      
   
      
    }


    const patient = {
      pid,
      name,
      phone_no,
      gender,
      address,
      appointment_date,
      discharge_date,
      hospitalId,
    };
    
    try {
      const { data } = await axiosInstance.post("/patients/add", patient);
      
      setpid("")
      setname("")
      setphone_no("")
      setgender("male")
      setaddress("")
      setappointment_date("")
      setdischarge_date("")
      sethospitalId("")

      


      

      


      if (data) {
        toast.success("Data added successfully")
        setTimeout(() =>{
          console.log("This will be called after 2 seconds");
          navigate("/patients");
        },2000);
        

      }
    } catch (error) {
      toast.error("Patient with same phone no. already registered")

      console.log(error);
      

    }
  };
  const [hospital, sethospital] = useState([]);

  const getAllHospital = async () => {
    try {
      const { data } = await axiosInstance.get("hospitals/getAllHospital");
      console.log({ data });
      sethospital([...data]);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    // getAllHospital();
    if (hospital.length === 0) getAllHospital();
  }, [hospital]);

  


  const validatepid = (value) => {
    if (!value.trim()) {
      setpidError("Entity ID is required");
    } else if (!/^[a-zA-Z0-9]*$/.test(value)) {
      setpidError("Entity ID must be alphanumeric");
    } else {
      setpidError("");
    }
  };
  // const addPatient=(newPatient)=>{
  //   if(!patients.some(patient=>patient.id===newPatient.id)){
  //     setPatients([...patients,newPatient]);
  //   }
  //   else{
  //     console.log("Patient already exists");
  //   }
  // };

  const handlepidChange = (e) => {
    const value = e.target.value;
    setpid(value);
    validatepid(value);
  };
//   if (selectedAppointmentDate < currentDate || selectedDischargeDate < currentDate) {
//     setError('Please select a future date.');
//     return;
//   }

  
// };
  const existingphone_no = [];
  return (
     
    
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Add Patient</h2>
            <div className="card-body">
              
              <form onSubmit={submitHandler}>
                {/* <div className="form-group mb-2">
                  <label className="form-label">
                    <span className="text-danger">*</span>Patient Id :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter pid"
                    name="pid"
                    className="form-control"
                    value={pid}
                    onChange={(e) => handlepidChange(e)}
                  ></input>
                  {pidError && <p>{pidError}</p>}
                </div> */}
                <div className="form-group mb-2">
                  <label for="validationCustom04" className="form-label">
                    {" "}
                    <span className="text-danger">*</span>  Name :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    required
                    className="form-control"
                    id="validationCustom04"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                  ></input>

                  {nameError && <p>{nameError}</p>}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    <span className="text-danger">*</span> Phone Number:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter phone_no"
                    name="phone_no"
                    minLength={10}
                    maxLength={10}
                    required
                    className="form-control"
                    value={phone_no}
                    onChange={(e) => {
                      if (pattern.test(e.target.value)) {
                        setphone_no(e.target.value);
                        console.log(e.target.value);
                        setIsError(false);
                      } else setIsError(true);
                    }}
                  ></input>
                  {/* {error && <p style=={{color:'red'}}>{error}</p>} */}
                  
                    
                    {isError ? "Invalid" :  phone_no}
                  
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    <span className="text-danger">*</span> Gender :
                  </label>
                  <select
                    className="form-select"
                    onChange={(e) => setgender(e.target.value)}
                  >
                    <option value={"male"}>{"male"}</option>
                    <option value={"female"}>{"female"}</option>
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    <span className="text-danger">*</span>  Address :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    required
                    className="form-control"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    <span className="text-danger">*</span>
                    Appointment_date :
                  </label>
                  {/* <DatePicker
          selected={appointment_date}
          onChange={handleAppointmentDateChange}
          minDate={new Date()} // Restrict past dates
        /> */}
                  
                  <input
                    type="Date"
                    placeholder="Enter appointment_date"
                    name="appointment_date"
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="form-control"
                    value={appointment_date}
                    //<DatePicker selected={appointment_date}

                    onChange={(e) => setappointment_date(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                     Discharge_date :
                  </label>
                  {/* <DatePicker
          selected={discharge_date}
          onChange={handleDischargeDateChange}
          minDate={new Date()} // Restrict past dates
        /> */}
                  <input
                    type="Date"
                    placeholder="Enter appointment_date"
                    name="discharget_date"
                    min={appointment_date || currentDate}
                    required
                    className="form-control"
                    value={discharge_date}
                    onChange={(e) => setdischarge_date(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    {" "}
                    <span className="text-danger">*</span>Hospital Id :
                  </label>
                  <select

                    className="form-select"
                    
                    onChange={(e) => sethospitalId(e.target.value)}
                  >
                    {hospital.map((option) => (
                      <option key={option.hid} value ={option.hid}>{option.hName}</option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-success"
                  type="submit"
                  // onClick={() => toast.success("Data added successfully")}
                >
                  Submit
                </button>
                <Link to="/patients" className="btn btn-danger">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddPatientComponents;
