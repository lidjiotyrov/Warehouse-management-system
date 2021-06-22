import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Warehouses from "./components/Warehouses/Warehouses";
import Production from "./components/Production/Production";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import RootModal from "./components/common/Modal";
import UnallocatedProducts from "./components/Unallocated-products/Unallocated-products";

import './App.scss'


const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <div className='app__container'>
          <Navbar/>
          <div className='app__container__content'>
            <Route path='/warehouses' render={() => <Warehouses/>}/>
            <Route path='/production' render={() => <Production/>}/>
            <Route path='/unallocated' render={() => <UnallocatedProducts/>}/>
          </div>
        </div>
      </div>
      <RootModal/>
    </BrowserRouter>

  );
}

export default App;
