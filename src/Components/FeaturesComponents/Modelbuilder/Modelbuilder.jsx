import React, { useState, useEffect } from "react";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { Button, Text } from "@nextui-org/react";
import { Sidenav } from "../../sidenav/Sidenav";
import { Input, Select, Slider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Item from "antd/lib/list/Item";
export const Modelbuilder = () => {
  const navigate = useNavigate();
  const gender_array = [
    { value: "male", text: "Male" },
    { value: "female", text: "Female" },
  ];
  const children_array = [
    { value: 0, text: "0" },
    { value: 1, text: "1" },
    { value: 2, text: "2" },
    { value: 3, text: "3" },
    { value: 4, text: "4" },
    { value: 5, text: "5" },
  ];
  const smoker_array = [
    { value: "yes", text: "Yes" },
    { value: "no", text: "No" },
  ];
  // "Less than a Bachelors",
  // "Bachelor’s degree",
  // "Master’s degree",
  // "Post grad",
  const region_array = [
    {value:"southwest", text:"South West"},
    {value:"southeast", text:"South East"},
    {value:"northwest", text:"North West"},
    {value:"northeast", text:"North East"},
  ]
  const [children, setchildren] = useState('2');
  const [region, setregion] = useState('southeast');
  const [gender, setgender] = useState('male');
  const [smoker, setsmoker] = useState('no');
  const [age, setage] = useState('21');
  const [bmi, setbmi] = useState('25.75');

  const[exp,setexp]= useState(3)
  const handleChange = (selectedoption) => {
    
    setgender(selectedoption)
    
  };
  
  const handleChangeQ = (selectedoption) => {
    setregion(selectedoption)
  };

  const handleChangeR = (selectedoption) => {
    setchildren(selectedoption)
  };
  const handleChangeS = (selectedoption) => {
    setsmoker(selectedoption)
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // let file = e.target.files[0];

    const res = await fetch("http://127.0.0.1:5000/api/modelBuilder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gender,
        region,
        children,
        smoker,
        age,
        bmi,
        
      }),
    });
    await res.json();
    navigate('/mbresult')
  };
 


  return (
    <div className="modelbuilder__parent">
      <Sidenav />
      <div className="MB_form__cont">
        <div className="MB_form_cont__child">
          <div className="MB_icon_images"></div>
          <h1>Software Developer Salary Prediction</h1>
          <h3>We need some information to predict the salary</h3>
          <form onSubmit={handleSubmit}>

          <label className="MB__form_lable" htmlFor="select">
              Enter your age:
          </label>  
          <Input onChange={e => setage(e.target.value)} name="person_age" placeholder="Enter your age here"/>
            
            
            <label className="MB__form_lable" htmlFor="select">
              Select the gender
            </label>
            <Select
              size="large"
              placeholder="select gender"
              onChange={handleChange}
              className="country_inp"
              options={gender_array}
            >
            </Select>

            <label className="MB__form_lable" htmlFor="select">
              Enter your BMI:
          </label>  
          <Input onChange={e => setbmi(e.target.value)} name="person_BMI" placeholder="Enter your BMI here"/>
            
            
            <label className="MB__form_lable" htmlFor="select">
              Select the number of children
            </label>
            <Select
              size="large"
              placeholder="select number of children"
              onChange={handleChangeR}
              className="country_inp"
              options={children_array}
            >
            </Select>

            <label className="MB__form_lable" htmlFor="select">
              Select smoker/not
            </label>
            <Select
              size="large"
              placeholder="select smoker/not"
              onChange={handleChangeS}
              className="country_inp"
              options={smoker_array}
            >
            </Select>


            <label className="MB__form_lable" htmlFor="select">
              Select the region
            </label>
            <Select
              size="large"
              placeholder="select region"
              onChange={handleChangeQ}
              className="country_inp"
              options={region_array}
            >
            </Select>
            
        <Button className="MB_pred_btn" onPre type="submit"> Prediction</Button>
          </form>
          
        </div>
      </div>
    </div>
  );
};
