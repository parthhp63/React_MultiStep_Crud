import React, { useState } from "react";
import InputComponent from "../components/inputComponent/InputComponent";
import RadioButton from "../components/radioButton/RadioButton";
import Buttons from "../components/buttons/Buttons";
import "/home/parth-patil/multistep-wizard-form/src/design/form.css"
const BasicDetails = ({ nextStep, details, setDetails }) => {
  const handleGenderChange = (selectedGender) => {
    console.log('selectedGender',selectedGender);
    setDetails((prev)=>({...prev,gender:selectedGender}))    
  };
  const genderOptions = ["Male", "Female"];
  const [errors, setErrors] = useState({});
  const validation = (name, value) => {
    switch (name) {
      case "fname":
        if (!value.trim()) {
          return "First Name cannot be blank";
        } else {
          return "";
        }
      case "lname":
        if (!value.trim()) {
          return "Last Name cannot be blank";
        } else {
          return "";
        }
      case "rollno":
        if (!value.trim()) {
          return "Roll No cannot be blank";
        } else {
          return "";
        }
      case "phone":
        if (!value.trim()) {
          return "Contact Details cannot be blank  ";
        }
         else if (!new RegExp( /^\d{10}$/).test(details.phone.trim())) {
          console.log("Phone error");
          return "Phone No should be atleast 10 digit nd in Proper Way ";
        } 
        else {
          return "";

        }

      case "dob":
        if (!value) {
          return "Date Of Birth cannot be blank";
        } else{
          const date= new Date().toLocaleDateString();
          const curr_date= new Date(value).toLocaleDateString();
           if(date<curr_date){
            return "DOB cannot be greater than today"
          }
          else {
            console.log('value ddd',value);
            console.log(new Date(),'kkkkk');
            return "";
          }
        }
       

      case "email":
        if (!value.trim()) {
          return "Email is Required";
        } else if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(details.email.trim())
        ) {
          return "Invalid email";
        } else {
          return "";
        }

      case "address":
        if (!value.trim()) {
          return "Address cannot be blank";
        } else {
          return "";
        }

        case "gender":
          if (!value) {
            return "gender cannot be blank";
          }

          else {
            return "";
          }

          case "pincode":
            if(!value){
              return "Pincode cannot be blank"
            }
            else if (!new RegExp(/[0-9][0-9][0-9][0-9][0-9][0-9]/).test(value.trim())) {
              return "Write pin code in proper format";
            } else{
              return ""
            }

      default: {
        return "";
      }
    }
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      setErrors(validateError);
    } else {
      setDetails((prev) => ({ ...prev, ...details }));
      nextStep();
    }
  };

  return (
    <div>
      <div className='mt-[30px]'>
        <h1 className='text-center font-[bolder]'>
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
            Basic Details &nbsp;&nbsp;  [Step-1 of 4]
          </span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 p-3">
            <InputComponent
              className={"w-full"}
              type={"text"}
              value={details.fname}
              labelname={"First Name"}
              name={"fname"}
              labelfor={"fname"}
              placeholder={"Enter your first name"}
              change={handleChange}
              errname={errors?.fname}
              errname_disp={errors.fname}
              maxlength={'25'}
            />
            <InputComponent
              className={"w-full"}
              type={"text"}
              value={details.lname}
              labelname={"Last Name"}
              name={"lname"}
              labelfor={"lname"}
              placeholder={"Enter your last name"}
              change={handleChange}
              errname={errors?.lanme}
              errname_disp={errors.lname}
              maxlength={'25'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 p-3">
            <InputComponent
              className={"w-full"}
              value={details.rollno }
              type={"text"}
              labelfor={"roll no"}
              labelname={"Roll No"}
              placeholder={"Enter your Roll no"}
              name={"rollno"}
              change={handleChange}
              errname={errors?.rollno}
              errname_disp={errors.rollno}
              maxlength={'25'}
            />

            <InputComponent
              className={"w-full"}
              type={"number"}
              // value={details.phone}
              name={"phone"}
              labelfor={"phone"}
              labelname={"Contact Details"}
              placeholder={"enter your contact details"}
              change={handleChange}
              errname={errors?.phone}
              errname_disp={errors.phone}
              maxlength={'10'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 p-3">
            <InputComponent
              className={"w-full"}
              type={"date"}
              name={"dob"}
              max={new Date()}
              value={details.dob}
              labelfor={"dob"}

              labelname={"Date Of Birth (DD-MM-YYYY)"}
              change={handleChange}
              errname={errors?.dob}
              errname_disp={errors.dob}
            />
            <div>
              <p> Gender</p>
              <RadioButton
                options={genderOptions}
                selectedOption={details.gender}
                name={"gender"}
                onOptionChange={handleGenderChange}
                change={handleChange}
                value={details.gender}
                errname={errors?.gender}
                errname_disp={errors.gender}
              />
            </div>
            <label for="address">Address</label>
            <br />
            <textarea
              value={details.address}
              className='border-[1px] border-[solid] border-[black] min-w-[200%]'
              name="address"
              rows={3}
              cols={50}
              onChange={handleChange}
            />
            
           
          </div>
          <div className=" gap-4 p-3">
            {errors?.address && <p className='text-red-600 text-xs py-1'>{errors.address}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4 p-3">
            <InputComponent
              className={"w-full"}
              type={"email"}
              name={"email"}
              value={details.email}
              labelfor={"email"}
              labelname={"email"}
              placeholder={"enter your email"}
              change={handleChange}
              errname={errors?.email}
              errname_disp={errors.email}
            />

<InputComponent
              className={"w-full"}
              type={"number"}
              value={details.pincode}
              name={"pincode"}
              labelfor={"pincode"}
              labelname={"Pincode"}
              placeholder={"enter your Pincode"}
              change={handleChange}
              errname={errors?.pincode}
              errname_disp={errors.pincode}
              maxlength={'6'}
            />
          </div>

          <div className="container flex justify-around mt-4 mb-8">
            <Buttons
              name={"Next"}
              type={"submit"}
              className={
                "bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-600 hover:text-white transition duration-200 ease-in-out"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default BasicDetails;