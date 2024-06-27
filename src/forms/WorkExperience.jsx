import React, { Fragment, useState } from "react";
import InputComponent from "../components/inputComponent/InputComponent";
import "../design/form.css";
import Buttons from "../components/buttons/Buttons";
const WorkExperience = ({ nextStep, prevStep,details, setDetails  }) => {
  const [errors, setErrors] = useState([]); 

  const validation = (name, value) => {
    switch (name) {
      case "company_name":
        if (!value.trim()) {
          return "Company Name cannot be blank";
        } else {
          return "";
        }

      case "designation":
        if (!value.trim()) {
          return "Designation cannot be blank";
        } else {
          return "";
        }

      case "from":
        if (!value.trim()) {
          return "Company Start Date cannot be blank";
        }else if (!new RegExp(/[0-9][0-9][0-9][0-9]/).test(value.trim())) {
          return "Write Start Date in Proper format";
        }  else {
          return "";
        }

      case "to":
        if (!value.trim()) {
          return "Company End Date cannot be blank";
        }else if (!new RegExp(/[0-9][0-9][0-9][0-9]/).test(value.trim())) {
          return "Write End year in proper format";
        }  else {
          return "";
        }
    }
  };

  

  const handleChange = (e,i) => {
    const { name, value, type } = e.target;
    const onValuechange = [...details.workExperience];
    onValuechange[i] = {
      ...onValuechange[i],
      [name]: value,
    };
    setDetails((prev) => ({
      ...prev,
      workExperience: onValuechange,
    }));
    
    let newError = [...errors];
    const error = validation(name, value);

    if (!newError[i]) {
      newError[i] = {};
    }

    newError[i][name] = error;
    setErrors(newError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validateError = [];
    details.workExperience.forEach((obj, index) => {
      let objError = {};
      for (let key in obj) {
        const error = validation(key, obj[key]);
        objError[key] = error;
      }
      console.log("objError : ",objError)
      if (Object.values(objError).some((val)=> val !== "")) {
        validateError[index] = objError;
      }
    });


    if (validateError.length > 0) {
      console.log("error");
      setErrors(validateError);
    } else {
      setDetails((prev) => ({ ...prev, workExperience: details.workExperience }));
      nextStep();
      console.log(details,'efffffyyyyy');
      console.log("Form Valid");
    }

  };

  let addMore = () => {
    setDetails({
      ...details,
      workExperience:[
        ...details.workExperience,
        { company_name: "", designation: "", from: "", to: "" },
      ]
  });
  setErrors([...errors, {}]);
  };

  let removeField = (index) => {
    // console.log(i, "removed field");
    let newFormValues = details.workExperience.filter((_,i)=>i!==index);
    const updateErrors = errors.filter((_, i) => i !== index);
    // newFormValues.splice(i, 1);
    setDetails({
      ...details,
      workExperience:newFormValues
    });
    setErrors(updateErrors);

  };

  return (
    <div className='mt-[30px]'>
      <h1 className='text-center font-[bolder]'nt>
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
          Work Experience &nbsp;&nbsp;  [Step-3 of 4]
        </span>
      </h1>
      <form onSubmit={handleSubmit}>
        {details.workExperience.map((element, index) => (
          <div>
            <div className="grid grid-cols-2 gap-4 p-3">
              <InputComponent
                type={"text"}
                labelfor={"company_name"}
                labelname={"Company Name"}
                name={"company_name"}
                placeholder={"Enter Company Name"}
                change={(e)=>handleChange(e,index)}
                value={element .company_name}
                className={"w-full"}
                errname={errors[index]?.company_name}
                 errname_disp={errors[index]?.company_name}
                 maxlength={'100'}
              />
            
              <InputComponent
                type={"text"}
                labelfor={"designation"}
                labelname={"Designation"}
                name={"designation"}
                value={element.designation}
                placeholder={"Enter your Designation"}
                change={(e)=>handleChange(e,index)}
                className={"w-full"}
                errname={errors[index]?.designation}
                 errname_disp={errors[index]?.designation}
                 maxlength={'60'}
              />
          
            </div>
            <div className="grid grid-cols-2 gap-4 p-3">
              <InputComponent
                type={"text"}
                labelfor={"from"}
                labelname={"From"}
                name={"from"}
                value={element.from}
                placeholder={"YYYY"}
                change={(e)=>handleChange(e,index)}
                className={"w-full"}
                errname={errors[index]?.from}
                 errname_disp={errors[index]?.from}
                 maxlength={'4'}
              />

              <InputComponent
                type={"text"}
                labelfor={"to"}
                labelname={"To"}
                name={"to"}
                value={element.to}
                placeholder={"YYYY"}
                change={(e)=>handleChange(e,index)}
                className={"w-full"}
                errname={errors[index]?.to}
                 errname_disp={errors[index]?.to}
                 maxlength={'4'}
              />
           
            </div>

            {index ? (
              <button
                type="button"
                className="button remove bg-black text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out"
                onClick={() => removeField(index)}
              >
                Remove
              </button>
            ) : null}
            <br />
            <hr />
            <br />
          </div>
        ))}
        <hr />
        <button
          className="button add   bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out"
          type="button"
          onClick={() => addMore()}
        >
          Add More
        </button>

        <div className="container flex justify-around mt-4 mb-8">
          <Buttons
            name={"Back"}
            className={
              "bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out"
            }
            click={prevStep}
          />
          <Buttons
            name={"Next"}
            className={
              "bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out"
            }
            type={"submit"}
          />
        </div>
      </form>
    </div>
  );
};
export default WorkExperience;
