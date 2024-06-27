import React, { useState, useEffect } from "react";
import InputComponent from "../inputComponent/InputComponent";
import { useNavigate } from "react-router-dom";

import useLocalData from "../../customhooks/useLocalData";
const ViewData = () => {
  const navigate = useNavigate();
  // const [data, setData] = useState([]);
  const { getData,deleteItem,data } = useLocalData("data");

  console.log(data);
  
  const onDelete = async(id)=>{
    deleteItem(id)
    // navigate("/viewdata")
  }

    // useEffect(() => {
      
    // }, [navigate]);
    if (data!==null) {
      return (
        <>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    First Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                   Last Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Roll No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View 
                  </th>
                </tr>
              </thead>
              {data.map((user) => (
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.fname}
                    </th>
                    <td className="px-6 py-4">{user.lname}</td>
                    <td className="px-6 py-4">{user.rollno}</td>
                    <td className="px-6 py-4">{user.id}</td>
    
                    <td className="px-6 py-4">
                      {/* {onClick={()=> navigate(`userdata/${user.id}`)}} */}
                            <button onClick={() => {onDelete(user.id)}}>Delete </button>
                          </td>
                    <td className="px-6 py-4">
                            <button onClick={()=> navigate(`/data/${user.id}`)} >View More </button>
                          </td>
                  </tr> 
                </tbody>
              ))}
            </table>

       
          </div>
          <div style={{margin:'30px'}}>
            <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=> navigate(`/`)}>To create form click here</button>
            </div>
        </>
      );
      
    }
    else{
      return(
        <>
                <h1 className='text-center font-[bolder]'nt>
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
          Currently there is no data avialable first create form to se it
          </span>
        </h1>
        <center>
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"  onClick={()=> navigate(`/`)}>To create form click here</button></center>
        </>
      )
    }
    
};
export default ViewData;
