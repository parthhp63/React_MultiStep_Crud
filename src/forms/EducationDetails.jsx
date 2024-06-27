import React, { useState } from "react";
import InputComponent from "../components/inputComponent/InputComponent";
import Buttons from "../components/buttons/Buttons";
import "../design/form.css";
const EducationDetails = ({ nextStep, prevStep, details, setDetails }) => {

  const [errors, setErrors] = useState([]);
  const validation = (name, value) => {
    switch (name) {
      case "university_name":
        if (!value.trim()) {
          return "Write University Name";
        } else {
          return "";
        }
      case "passing_year":
        if (!value.trim()) {
          return "Write the Passing Year ";
        } else if (!new RegExp(/[1-9][0-9][0-9][0-9]/).test(value.trim())) {
          return "Write passing year in proper format";
        } else {
          return "";
        }

      case "percentage":
        if (!value.trim()) {
          return "Write Percentage";
        } else if (!new RegExp(/[0-9][0-9]/).test(value.trim())) {
          return "Write percentage in proper format";
        } else {
          return "";
        }
    }
  };
  const handleChange = (e, i) => {
    const { name, value, type } = e.target;
    const onValuechange = [...details.educationDetails];
    onValuechange[i] = {
      ...onValuechange[i],
      [name]: value,
    };

    setDetails((prev) => ({
      ...prev,
      educationDetails: onValuechange,
    }));
    // console.log(onValuechange);
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
    details.educationDetails.forEach((obj, index) => {
      let objError = {};
      for (let key in obj) {
        const error = validation(key, obj[key]);
        objError[key] = error;
      }
      console.log("objError : ",objError)
      if (Object.values(objError).some((val)=> val !== "")) {
        // validationErrors[index] = beneficiaryError;
        validateError[index] = objError;
      }
    });


    if (validateError.length > 0) {
      console.log("error");
      setErrors(validateError);
    } else {
      setDetails((prev) => ({ ...prev, educationDetails: details.educationDetails }));
      nextStep();
      console.log("Form Valid");
    }
  };
  let addMore = () => {
    setDetails({
      ...details,
      educationDetails:[
        ...details.educationDetails,
        { university_name: "", passing_year: "", percentage: "" },
      ]
    });
    setErrors([...errors, {}]);
  };
  let removeField = (index) => {
    const newFormValues = details.educationDetails.filter((_,i)=>i!==index);
    const updateErrors = errors.filter((_, i) => i !== index);
    setDetails({
      ...details,
      educationDetails:newFormValues
    });
    setErrors(updateErrors);
  };
  return (
    <div className='mt-[30px]'>
      <h1 className='text-center font-[bolder]'nt>
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
          Education Details &nbsp;&nbsp;  [Step-2 of 4]
        </span>
      </h1>
      <form onSubmit={handleSubmit}>
      {console.log(details.educationDetails,'ggggggggg')}
        {details.educationDetails.map((element, index) => (
          <div>
            {console.log(details.educationDetails,'hhhhhhh')}
            <div className="grid grid-cols-3 gap-4 p-3">
              <InputComponent
                type={"text"}
                labelfor={"university_name"}
                labelname={"University Name"}
                name={"university_name"}
                placeholder={"Enter your University name"}
                change={(e) => handleChange(e, index)}
                value={element.university_name}
                errname={errors[index]?.university_name}
                errname_disp={errors[index]?.university_name}
              />
              <InputComponent
                type={"text"}
                labelfor={"passing_year"}
                labelname={"Passing Year"}
                name={"passing_year"}
                placeholder={"Enter your Passing Year"}
                change={(e) => handleChange(e, index)}
                value={element.passing_year}
                errname={errors[index]?.passing_year}
                errname_disp={errors[index]?.passing_year}
                maxlength={'4'}
                
              />
              <InputComponent
                type={"float"}
                labelfor={"percentage"}
                labelname={"Percentage"}
                name={"percentage"}
                value={element.percentage }
                placeholder={"Enter your Percentage"}
                change={(e) => handleChange(e, index)}
                errname={errors[index]?.percentage}
                errname_disp={errors[index]?.percentage}
                maxlength={''}
              />
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
              <br />
            </div>
            <hr />
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

export default EducationDetails;