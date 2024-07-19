import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
//import {useHistory} from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdatePatientComponents = () => {
  const params = useParams();
  const pid = params.pid;

  console.log(params);
  const navigate = useNavigate();

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
  const currentDate=new Date().toISOString().split('T')[0];
  const [hospitalId, sethospitalId] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axiosInstance.get(`patients/patients/${pid}`);
        console.log({ data });
        if (data) {
          setname(data.name);
          setphone_no(data.phone_no);
          setgender(data.gender);
          setaddress(data.address);
          setappointment_date(data.appointment_date);
          setdischarge_date(data.discharge_date);
          sethospitalId(data.hospitalId);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    if (pid) getUser();
  }, [pid]);

  const submitHandler = async (e) => {
    e.preventDefault();

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

    console.log(patient);

    try {
      const { data } = await axiosInstance.put(`/patients/updatePatient/${pid}`, patient);
      
      setname("")
      setphone_no("")
      setgender("male")
      setaddress("")
      setappointment_date("")
      setdischarge_date("")
      sethospitalId("")

      if (data) {
        
        navigate("/patients");
      }
    } catch (error) {
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

  

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Update Patient</h2>
            <div className="card-body">
              {/* <div className="form-group mb-2">
                <label className="form-label"> pid :</label>
                <input
                  readOnly
                  className="form-control-plaintext"
                  defaultValue={params.pid}
                ></input>
              </div> */}
              <form onSubmit={submitHandler}>
                {/* <div className="form-group mb-2">
                  <label className="form-label"> pid :</label>
                  <input
                    type="text"
                    placeholder="Enter pid"
                    name="pid"
                    className="form-control"
                    value={pid}
                  ></input>
                </div> */}
                <div className="form-group mb-2">
                  <label className="form-label">
                  {" "}
                    <span className="text-danger">*</span> Name :</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                  ></input>

                  {nameError && <p>{nameError}</p>}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                  {" "}
                    <span className="text-danger">*</span> Phone Number:</label>
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
                    <span className="text-danger">*</span> Gender :</label>
                  {/* <input
                    type="text"
                    placeholder="Enter gender"
                    name="gender"
                    className="form-control"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                  ></input> */}
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
                    <span className="text-danger">*</span> Address :</label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    className="form-control"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">{" "}
                    <span className="text-danger">*</span> Appointment_date :</label>
                  <input
                    type="Date"
                    placeholder="Enter appointment_date"
                    name="appointment_date"
                    min={new Date().toISOString().split('T')[0]}
                    className="form-control"
                    value={appointment_date}
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
                  <label className="form-label">{" "}
                    <span className="text-danger">*</span>Hospital Id :</label>
                  {/* <input
                    type="text"
                    placeholder="Enter hospital_id"
                    name="hospital_id"
                    className="form-control"
                    value={hospital_id}
                    onChange={(e) => sethospital_id(e.target.value)}
                  ></input> */}
                   <select

                    className="form-select"
                    
                    onChange={(e) => sethospitalId(e.target.value)}
                  >
                    {hospital.map((option) => (
                      <option key={option.hid} value ={option.hid}>{option.hName}</option>
                    ))}
                  </select>
                </div>

                <button className="btn btn-success" type="submit">
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
    </div>
  );
};

export default UpdatePatientComponents;
