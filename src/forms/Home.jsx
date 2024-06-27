import React, { useState,useEffect } from "react";
import "../design/form.css";
import BasicDetails from "./BasicDetails";
import Documents from "./Documents";
import EducationDetails from "./EducationDetails";
import WorkExperience from "./WorkExperience";
import { useParams } from "react-router-dom";
import useLocalData from "../customhooks/useLocalData";

const Home = () => {
  const { getUser } = useLocalData("data");
  const routeParams = useParams();
  const [currStep, setCurrStep] = useState(1);

  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    rollno: "",
    phone: "",
    dob: "",
    address: "",  
    pincode:"",
    email: "",
    gender: "",
    educationDetails: [
      { university_name: "", passing_year: "", percentage: "" },
    ],
    workExperience: [{ company_name: "", designation: "", from: "", to: "" }],
    profilephoto:"",
    xmarksheet:"",
    xiimarksheet:"",
  });

  useEffect(()=>{
    if((routeParams.id)){
      setDetails(getUser(routeParams.id))
  }
  },[])
 
  const nextStep = () => {
    setCurrStep(currStep + 1);
  };

  const prevStep = () => {
    setCurrStep(currStep - 1);
  };

  

  // console.log(details);
  switch (currStep) {
    case 1:
      return (
        <BasicDetails
          setDetails={setDetails}
          details={details}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <EducationDetails
          setDetails={setDetails}
          details={details}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 3:
      return (
        <WorkExperience
          setDetails={setDetails}
          details={details}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <Documents
          setDetails={setDetails}
          details={details}
          prevStep={prevStep}
        />
      );
    default:
  }

};

export default Home;
