import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header  from './components/header/Header';
import Home from './forms/Home';
import ViewData from './components/output/ViewData';
import { useState } from 'react';
import First from './components/home/First';
function App() {

  return (
    <div className='className=" md:w-4/5  mx-auto shadow-xl rounded-2xl pb-2 bg-white"'>
     <BrowserRouter>
      <Routes>
        <Route path='home' element={< First/>}  />
        <Route  path="/"  element={<Home />}  />
        <Route  path="/viewdata"  element={< ViewData />}  />
        <Route path='/data/:id' element={<Home />} />
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App;