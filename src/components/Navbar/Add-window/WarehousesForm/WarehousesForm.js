import React, {Fragment, useState} from 'react'

import './WarehousesForm.scss'
import ButtonComponent from "../../../Shared/Button/ButtonComponent";
import {useDispatch} from "react-redux";
import {addWarehouse} from "../../../../redux/actions/actions-warehouses";


const WarehousesForm = ({setIsHiddenAddWin}) => {
 const [warehouse, setWarehouse] = useState({})
  const dispatch = useDispatch()
 
 const onChange = (key, e) => {
  const value = e.target.value
  setWarehouse({
   ...warehouse,
   [key]: value
  })
 }
 
 const onAddWarehouse = () => {
   dispatch(addWarehouse(warehouse))
   setIsHiddenAddWin(false)
 }

 return (
  <div className='form'>
   <h6>Наименование:</h6>
   <input onChange={(e) => onChange('item', e)}/>
   <h6>Адрес:</h6>
   <input onChange={(e) => onChange('address', e)}/>
   <h6>Тип:</h6>
   <input onChange={(e) => onChange('type', e)}/>
   <h6>Статус:</h6>
   <input onChange={(e) => onChange('status', e)}/>
    <ButtonComponent onClick={onAddWarehouse} text='Добавить'/>
  </div>
 )
}
export default WarehousesForm