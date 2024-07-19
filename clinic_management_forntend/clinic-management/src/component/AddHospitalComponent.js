import React, { useEffect, useState} from "react";
 

import axiosInstance from "../utils/axiosInstance";
//import {useHistory} from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";

const AddHospitalComponent = () => {
  const navigate = useNavigate();

  const [hid, sethid] = useState("");
  // const [isError, setIsError] = useState(false);
  // const pattern = new RegExp(/^\d{1,5}$/);
  // const[hidError,sethidError]=useState(' ');
  // const { register,  errors } = useForm();
  const [hName, setHName] = useState("");
  const [hNameError, setHNameError] = useState("");
  const validateName = (value) => {
    if (!value.trim()) {
      setHNameError("Name is required");
    } else if (!/^[a-zA-Z0-9]*$/.test(value)) {
      setHNameError("Name must contain only letters");
    } else {
      setHNameError("");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setHName(value);
    validateName(value);
  };
  const [hPhoneNumber, setHPhoneNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const pattern =/^[0-9]{1,10}$/;
  const [hAddress, setHAddress] = useState("");
  const [hGmail, setHGmail] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [isValid, setIsValid] = useState(true);

  const handleGmailOnChange = (e) => {
    const inputEmail = e.target.value;
    setHGmail(inputEmail);

    // Regular expression for email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // Check if the input email matches the regex
    setIsValid(emailRegex.test(inputEmail));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const hospital = { hid, hName, hPhoneNumber, hAddress, hGmail };


    console.log(hospital);

    try {
      const { data } = await axiosInstance.post("/hospitals/addHospital", hospital);

      sethid("")
      setHName("")
      setHPhoneNumber("")
      setHAddress("")
      setHGmail("")


      if (data) {
        toast.success("Data added successfully")
        setTimeout(()=>{
          console.log("This will be called after 1.5 seconds");
          navigate("/hospital");
        },1500);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handleChange(e) {
  //     const email = e.target.value;
  //     const isValidEmail = emailRegex.test(email);
  //     // Update state or show validation message based on `isValidEmail`.
  //   }
  // const handlegmailChange = (e) => {
  //     const value = e.target.value;
  //     setValidgmail(value)
  //     validateName(value);
  //   };

  return (
    
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Add Hospital</h2>
            <div className="card-body">
              
              <form onSubmit={submitHandler}>
                {/* <div className="form-group mb-2">
                  <label className="form-label"> Hospital id :</label>
                  <input
                    type="text"
                    placeholder="Enter hid"
                    name="hid"
                    className="form-control"
                    value={hid}
                    // ref={register({
                    //   required: true,
                    //   pattern: /^[0-9]+$/, // Only allows numeric characters
                    // })}
                    onChange={(e) => sethid(e.target.value)}
                  ></input>
                  
                </div> */}
                <div className="form-group mb-2">
                  <label className="form-label">
                    <span className="text-danger">*</span> Hospital name :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    name="HName"
                    required
                    className="form-control"
                    value={hName}
                    onChange={(e) => handleNameChange(e)}
                  ></input>
                  {hNameError && <p>{hNameError}</p>}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    <span className="text-danger">*</span> Hospital Phone Number:
                  </label>
                  <input
                    type="text"
                    
                    placeholder="Enter phone_no"
                    name="phonenumber"
                    minLength={10}
                    maxLength={10}
                    required
                    className="form-control"
                    value={hPhoneNumber}
                    onChange={(e) => {
                      
                      if (pattern.test(e.target.value)) {
                        setHPhoneNumber(e.target.value);
                        console.log(e.target.value);
                        setIsError(false);
                      } else setIsError(true);
                    }}
                  ></input>
                  
                    
                    {isError ? "Invalid" :   hPhoneNumber}
                  
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    <span className="text-danger">*</span> Hospital address :
                  </label>
                  <input
                    type="text"
                    placeholder="Enter haddress"
                    name="haddress"
                    required
                    className="form-control"
                    value={hAddress}
                    onChange={(e) => setHAddress(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">
                    <span className="text-danger">*</span> Hospital gmail :
                  </label>
                  <input
                    type="email"
                    placeholder="Enter gmail"
                    name="hgmail"
                    required
                    className="form-control"
                    value={hGmail}
                    onChange={(e) => handleGmailOnChange(e)}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  type="submit"
                  
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

export default AddHospitalComponent;
