import React, { useState, useEffect } from 'react';
import { Link,      useNavigate } from 'react-router-dom';  
import axiosInstance from "../utils/axiosInstance";

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
 import Form from "react-bootstrap/Form";  
 import Select from 'react-select';
import { State, City } from 'country-state-city';
 
const AddCityComponent = () => {
     
        const navigate = useNavigate();
        const  initialCityData={
            select_state: '',
            select_city: '',
           
        }
        const[errors, setErrors] = useState({
            select_state: "",
        select_city: "",
         
        },[]);  
          const[currentData,setCurrentData]=useState(initialCityData);
 
        const handleInputChange = (e) => {
          const{name, value} = e.target;
        setCurrentData({...currentData,[name]:value});
        switch (name) {
            case 'name':
            setErrors({...errors,name:validateName(value)});
            break;
            case 'state':
            setErrors({...errors,state:validateState(value)});
            break;
          //   case 'totalSites':
          //   setErrors({...errors,totalSites:validateTotalSites(value)});
          // break;
        default:
          break;
       
        };
      }
      const handleStateChange = (selectedOption) => {
        setCurrentData({ ...currentData, select_state: selectedOption.value, select_city: '' });
        setErrors({...errors,select_state:validateState(selectedOption.value),select_city:''})
    };
 
    const handleNameChange = (selectedOption) => {
        setCurrentData({ ...currentData, select_city: selectedOption.value });
        setErrors({...errors,select_city:validateName(selectedOption.value)})
    };
        const validateName=(select_city)=>{
          if(!select_city){
            return "City name is required"
          }
           
          return '';
        }
        const validateState=(select_state)=>{
          if(!select_state){
            return "state name is required"
          }
           
         
          return '';
        }
       
         
        const addCity =  (event) => {
          event.preventDefault();
           
        const {select_city,select_state } = currentData;
        const newErrors = {};
        newErrors.select_city=validateName(select_city);
        newErrors.select_state=validateState(select_state);
        //newErrors.totalSites=validateTotalSites(totalSites);
        setErrors(newErrors);
        console.log("dta",currentData)
        console.log("erorrr",newErrors)
        if (Object.values(newErrors).every(error => error === '')) {
            console.log('Form submitted successfully:', currentData);
            axiosInstance.post("/contt/addCity",currentData).then((response)=>{
                toast.success("location added successfully!");
                if(response.status === 200){
                    setCurrentData(initialCityData);
                    console.log(response.data);
                    navigate('/city')
                   
                }
            }).catch((error)=>{
                console.log("error", error)
                toast.error(error.response?.data.message);
            })
        }
        // else {
        //     console.log('Form has errors. Please correct them.');
        // }
       
    }
           
            // LocationServices.addLocation(currentData)
            //     .then((response) => {
            //         toast.success("City created successfully!");
            //         if (response.status === 200) {
            //             setCurrentData(initialCityData);
                         
            //             navigate('/LocationList')
            //         }
            //     })
            //     .catch((error) => {
            //         console.log("error", error);
            //         if (error.response && error.response.status === 400) {
            //             const errorResponse = error.response.data;
            //             if (errorResponse.errorState) {
            //                 setErrors({});
            //                 Object.keys(errorResponse.errorState).forEach((key) => {
            //                     const errorMessage = errorResponse.errorState[key][0];
            //                     setErrors((prevErrors) => ({
            //                         ...prevErrors,
            //                         [key]: errorMessage,
            //                     }));
            //                 });
            //             } else {
            //                 setErrors({});
            //             }
            //         }
            //     });
             
            const stateOptions = State.getStatesOfCountry("IN").map(item => ({ value: item.isoCode, label: item.name }));
            const cityOptions = currentData.select_state
                ? City.getCitiesOfState("IN", currentData.select_state).map(city => ({ value: city.name, label: city.name }))
                : [];          
               
       
       
   
   
  return (
    <div>
    <div className='container mt-5 mb-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center' style={{fontWeight:"bold"}}> ADD CITY</h2>
                    <div className='card-body'>
                            <div className='form-group mb-2'>
                                <Form>
                                     
                                     <Form.Group className="mb-3" controlId="formState">
                                    <Select
                                        options={stateOptions}
                                        onChange={handleStateChange}
                                        placeholder="Select State"
                                        value={stateOptions.find(option => option.value === currentData.select_state)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.state}
                                    </Form.Control.Feedback>
                                    <span style={{ display: "flex", color: "red" }}>{errors.select_state}</span>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formName">
                                    <Select
                                        options={cityOptions}
                                        onChange={handleNameChange}
                                        placeholder="Select City"
                                        value={cityOptions.find(option => option.value === currentData.select_city)}
                                        isDisabled={!currentData.select_state}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.select_city}
                                    </Form.Control.Feedback>
                                    <span style={{ display: "flex", color: "red" }}>{errors.select_city}</span>
                                </Form.Group>
                                </Form>
                                {/* <Form>
                                    <Form.Group className="mb-3" controlId="formTaskName">
                                    {/* <Form.Label>{("City Name")}</Form.Label> */}
                                    {/* <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter total Sites"
                                        name="totalSites"
                                        value={currentData.totalSites}
                                            onChange={handleInputChange}/>
                                        <Form.Control.Feedback type="invalid">
                                        {errors.totalSites}
                                    </Form.Control.Feedback>
                                    <span style={{display: "flex", color: "red"}}>{errors.totalSites}</span>
                                    </Form.Group>  
                                </Form> */}
                            </div>
                            <button onClick={addCity} className='btn btn-success'>Save</button> {" "}
                            <Link to={"/city"} className='btn btn-danger' href='/'>Cancel</Link>
                    </div>
                </div>
            </div>
        </div>
    <ToastContainer />
    </div>
     
       
   
  )
}
 
export default AddCityComponent