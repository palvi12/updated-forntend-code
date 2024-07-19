import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateHospitalComponent = () => {
  const params = useParams();
  const hid = params.hid;

  console.log(params);
  const navigate = useNavigate();

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
  const [hGmail, setHGmail] = useState("");
  const [hAddress, setHAddress] = useState("");
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

  useEffect(() => {
    const getAllHospital = async () => {
      try {
        const { data } = await axiosInstance.get(`hospitals/hospital/${hid}`);
        console.log({ data });
        if (data) {
          setHName(data.hName);
          setHPhoneNumber(data.hPhoneNumber);
          setHGmail(data.hGmail);
          setHAddress(data.hAddress);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    if (hid) getAllHospital();
  }, [hid]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const hospital = { hid, hName, hPhoneNumber, hGmail, hAddress };

    console.log(hospital);

    try {
      const { data } = await axiosInstance.put(
        `hospitals/updateHospital/${hid}`,
        hospital
      );
      if (data) {
        navigate("/hospital");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Update Hospital</h2>
            <div className="card-body">
              <div className="form-group mb-2">
                {/* <label className="form-label"> hid :</label> */}
                {/* <input
                  readOnly
                  className="form-control-plaintext"
                  defaultValue={params.hid}
                ></input> */}
              </div>
              <form onSubmit={submitHandler}>
                {/* <div className="form-group mb-2">
                  <label className="form-label"> id :</label>
                  <input
                    type="text"
                    placeholder="Enter hid"
                    name="hid"
                    className="form-control"
                    value={hid}
                  ></input>
                </div> */}
                <div className="form-group mb-2">
                  <label className="form-label">{" "}
                    <span className="text-danger">*</span> Name :</label>
                  <input
                    type="text"
                    placeholder="Enter hname"
                    name="hname"
                    className="form-control"
                    value={hName}
                    onChange={(e) => handleNameChange(e)}
                  ></input>
                  {hNameError && <p>{hNameError}</p>}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">{" "}
                    <span className="text-danger">*</span> Phone Number:</label>
                  <input
                    type="text"
                    placeholder="Enter hphoneno"
                    name="hphoneno"
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
                  <label className="form-label">{" "}
                    <span className="text-danger">*</span> Gmail :</label>
                  <input
                    type="email"
                    placeholder="Enter hgmail"
                    name="hgmail"
                    className="form-control"
                    value={hGmail}
                    onChange={(e) => handleGmailOnChange(e)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">{" "}
                    <span className="text-danger">*</span> Address :</label>
                  <input
                    type="text"
                    placeholder="Enter haddress"
                    name="haddress"
                    className="form-control"
                    value={hAddress}
                    onChange={(e) => setHAddress(e.target.value)}
                  ></input>
                </div>

                <button className="btn btn-success" type="submit">
                  Submit
                </button>
                <Link to="/hospital" className="btn btn-danger">
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

export default UpdateHospitalComponent;
