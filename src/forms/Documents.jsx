import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../components/inputComponent/InputComponent";
import Buttons from "../components/buttons/Buttons";
import { useParams } from "react-router-dom";
import useLocalData from "../customhooks/useLocalData";
// import getLocalData from "../customhooks/getLocalData";
const Documents = ({ prevStep, details, setDetails }) => {
  const routeParams = useParams();
  console.log(routeParams.id);
  const {dataInsert,dataUpdate}=useLocalData('data');
  const navigate = useNavigate();




  const [errors, setErrors] = useState({});

  const validation = (name, value) => {
    switch (name) {
      case "profilephoto":
        if (!value.trim()) {
          return " Profile Photo cannot be blank";
        } else {
          return "";
        }

      case "xmarksheet":
        if (!value.trim()) {
          return "X Marksheet cannot be blank";
        } else {
          return "";
        }

      case "xiimarksheet":
        if (!value.trim()) {
          return "XII Marsksheet cannot be blank";
        } else {
          return "";
        }
    }
  };
  console.log(details,'dddddddddddddddddddddd');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validation(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validateError = {};
    Object.keys(details).forEach((name) => {
      const error = validation(name, details[name]);
      if (error && error.length > 0) {
        validateError[name] = error;
      }
    });

    console.log(validateError, "---------------------------------------");
    if (Object.keys(validateError).length > 0) {
      console.log("error");
      setErrors(validateError);
    } else {
      if(routeParams.id){
        setDetails((prev) => ({ ...prev, ...details }));
        console.log(details,'detailsfinalafter');
        dataUpdate(details,routeParams.id)
        navigate("/viewdata");
      }else{
        console.log('outside iddd');
        setDetails((prev) => ({ ...prev, ...details }));
        dataInsert(details)
        navigate("/viewdata");
      }
    }
  };

  return (
    <div className='mt-[30px]'>
             <h1 className='text-center font-[bolder]'nt>
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
          Documents &nbsp;&nbsp;  [Step-4 of 4]
          </span>
        </h1>

      <form onSubmit={handleSubmit}>
        <InputComponent
          type={"file"}
          labelfor={"profilephoto"}
          labelname={"Upload Photo"}
          // value={form.profilephoto}
          name={"profilephoto"}
          placeholder={"Upload your profile Photo"}
          change={handleChange}
          errname={errors?.profilephoto}
          errname_disp={errors.profilephoto}
        />
        <InputComponent
          type={"file"}
          labelfor={"xmarksheet"}
          labelname={"X Marksheet"}
          // value={form.xmarksheet}
          name={"xmarksheet"}
          placeholder={"Upload your X Marksheet"}
          change={handleChange}
          errname={errors?.xmarksheet}
          errname_disp={errors.xmarksheet}
        />
        <InputComponent
          type={"file"}
          labelfor={"xiimarksheet"}
          labelname={" XII Marksheet"}
          // value={form.xiimarksheet}
          name={"xiimarksheet"}
          placeholder={"Upload your XII marksheet"}
          change={handleChange}
          errname={errors?.xiimarksheet}
          errname_disp={errors.xiimarksheet}
        />
        <div className="container flex justify-around mt-4 mb-8">
          <Buttons
            name={"Back"}
            className={
              "bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out"
            }
            click={prevStep}
          />
          <Buttons
            className={
              "bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out"
            }
            type={"submit"}
            name={"submit"}
          />
          {/* <button className="bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out">
                Submit
            </button> */}
        </div>
      </form>
    </div>
  );
};

export default Documents;
