
import './App.css';

import React,{useState} from 'react'
import Navbar from './components/Navbar';
import Newss from './components/Newss';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter, 
  Routes,
  Route,

} from "react-router-dom"; 

const App =()=> {
  
  const[progress,setProgress]=useState(0)
    
    return (
      <div>
        <BrowserRouter>

          <Navbar ></Navbar>
          <LoadingBar
            color='#f11946'
            progress={progress}

          />
          
          <Routes>

            <Route exact path="/" element={<Newss setProgress={setProgress} key="general" country="in" pageSize={8} category="general" />}></Route>
            <Route exact path="/business" element={<Newss setProgress={setProgress} key="business" country="in" pageSize={8} category="business" />}></Route>
            <Route exact path="/entertainment" element={<Newss setProgress={setProgress} key="entertainment" country="in" pageSize={8} category="entertainment" />}></Route>
            <Route exact path="/general" element={<Newss setProgress={setProgress} key="general" country="in" pageSize={8} category="general" />}></Route>
            <Route exact path="/health" element={<Newss setProgress={setProgress} key="health" country="in" pageSize={8} category="health" />}></Route>
            <Route exact path="/science" element={<Newss setProgress={setProgress} key="science" country="in" pageSize={8} category="science" />}></Route>
            <Route exact path="/sports" element={<Newss setProgress={setProgress} key="sports" country="in" pageSize={8} category="sports" />}></Route>
            <Route exact path="/technology" element={<Newss setProgress={setProgress} key="technology" country="in" pageSize={8} category="technology" />}></Route>

          </Routes></BrowserRouter>

      </div>
    )
  }
export default App;
