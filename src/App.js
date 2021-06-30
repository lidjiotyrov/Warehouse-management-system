import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Warehouses from "./components/Warehouses/Warehouses";
import Production from "./components/Production/Production";
import Navbar from "./components/Navbar/Navbar";
import RootModal from "./components/common/Modal";

import './App.scss'
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
      <div className='app'>
        <div className='app__container'>
          <Navbar/>
          <div className='app__container__content'>
            <Route path='/warehouses' render={() => <Warehouses/>}/>
            <Route path='/production' render={() => <Production/>}/>
          </div>
        </div>
      </div>
      <RootModal/>
    </BrowserRouter>

  );
}

export default App;
