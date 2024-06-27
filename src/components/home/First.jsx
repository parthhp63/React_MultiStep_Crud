import React from "react";
import { useNavigate } from "react-router-dom";

const First=()=>{
  const navigate = useNavigate();

return(
  <>
     <div>
     <h1 style={{ textAlign: "center", fontWeight: "bolder", fontSize:"20px",  marginTop:"40px"}}>
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
          Welcome to the Home Page of Form Via Local Storage Crud Choose any of the below option to perform
          </span>
        </h1>
        
        <center>
        <button style={{ marginTop: "30px" , marginBottom: "30px",  marginRight:'80px' }} onClick={()=> navigate(`/viewdata`)}    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >
            To see Data
        </button>

        <button onClick={()=> navigate(`/`)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >
            To Fill Data
        </button>
        </center>
        </div>
        </>
)
}
export default First;