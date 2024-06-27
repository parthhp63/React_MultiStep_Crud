import { useState, useEffect } from "react";
const useLocalData=(key)=>{
  const [data,setData]=useState([]);
  var randomstring = require("randomstring");
  let  id=randomstring.generate(4);

  const getData=()=>{
     let userData = [];
    userData.push(JSON.parse(localStorage.getItem("data")));
    return(JSON.parse(localStorage.getItem("data")))
  }

  const deleteItem=(id)=>{
    let data = JSON.parse(localStorage.getItem(key)) || [];
    data = data.filter((user) => user.id !== id);
    localStorage.setItem(key, JSON.stringify(data));
    setData(data)
  }

  const getUser=(id)=>{
      let value = JSON.parse(localStorage.getItem(key)) || [];
      value = value.filter((value) => value.id === id);
      return value[0];
  
  }

  const dataUpdate=(details,id)=>{
      let data = JSON.parse(localStorage.getItem(key)) || [];
      data = data.filter((value) => value.id !== id);

      data.push(details);
      localStorage.setItem(key, JSON.stringify(data));  
  }

  const dataInsert=(details)=>{
    let data=JSON.parse(localStorage.getItem('data')) || [];
    details.id=id;
    data.push(details);
    localStorage.setItem('data',JSON.stringify(data));
  }
  useEffect(() => {
    setData(getData());
  }, []);


  return{data,dataInsert,getData,deleteItem,getUser,dataUpdate}
}
export default useLocalData;
