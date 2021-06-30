import React from "react";

import CloseIconComponent from "../../Shared/closeIconComponent/CloseIconComponent";
import ProductionForm from "./ProductionForm/ProductionForm";
import WarehousesForm from "./WarehousesForm/WarehousesForm";

import './Add-window.scss';


const AddWindow = ({onClose, setIsHiddenAddWin, type}) => {


  return (
    <div className='add-window'>
      <div className='add-window__container'>
        <div className='add-window__container__form'>
          {type === 'production' && <ProductionForm setIsHiddenAddWin={setIsHiddenAddWin}/>}
          {type === 'warehouses' && <WarehousesForm setIsHiddenAddWin={setIsHiddenAddWin}/>}
        </div>
        <CloseIconComponent onClose={onClose}/>
      </div>
    </div>
  )
}

export default AddWindow