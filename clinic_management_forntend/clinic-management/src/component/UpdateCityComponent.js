import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateCityComponent = () => {
  const params = useParams();
  const id = params.id;

  console.log(params);
  const navigate = useNavigate();

  const [select_state, setselect_state] = useState("");
  const [select_city, setselect_city] = useState("");

  useEffect(() => {
    const getAllUsersUsingJPAQL = async () => {
      try {
        const { data } = await axiosInstance.get(
          `contt/city/getAllUsersUsingJPAQL/${id}`
        );
        console.log({ data });
        if (data) {
          setselect_state(data.select_state);
          setselect_city(data.select_city);
        }
      } catch (error) {
        console.log({ error });
      }
    };

    if (id) getAllUsersUsingJPAQL();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const city = { id, select_state, select_city };

    console.log(city);

    try {
      const { data } = await axiosInstance.put(`/contt/updateCity/${id}`, city);
      if (data) {
        navigate("/city");
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
            <h2 className="text-center">Update City</h2>
            <div className="card-body">
              {/* <div className="form-group mb-2">
                <label className="form-label"> id :</label>
                <input
                  readOnly
                  className="form-control-plaintext"
                  defaultValue={params.id}
                ></input>
              </div> */}
              <form onSubmit={submitHandler}>
                {/* <div className="form-group mb-2">
                  <label className="form-label"> id :</label>
                  <input
                    type="text"
                    placeholder="Enter id"
                    name="id"
                    className="form-control"
                    value={id}
                  ></input>
                </div> */}
                <div className="form-group mb-2">
                  <label className="form-label">
                  {" "}
                    <span className="text-danger">*</span> Select State :</label>
                  <input
                    type="text"
                    placeholder="Enter select_state"
                    name="select_state"
                    className="form-control"
                    value={select_state}
                    onChange={(e) => setselect_state(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">{" "}
                    <span className="text-danger">*</span> Select City:</label>
                  <input
                    type="text"
                    placeholder="Enter select_city"
                    name="select_city"
                    className="form-control"
                    value={select_city}
                    onChange={(e) => setselect_city(e.target.value)}
                  ></input>
                </div>

                <button className="btn btn-success" type="submit">
                  Submit
                </button>
                <Link to="/city" className="btn btn-danger">
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

export default UpdateCityComponent;
