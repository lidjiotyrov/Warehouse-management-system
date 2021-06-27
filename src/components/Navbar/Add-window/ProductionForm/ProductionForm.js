import React, {useEffect, useState} from 'react'
import AddIconComponent from "../../../Shared/addIconComponent/AddIconComponent";
import ButtonComponent from "../../../Shared/Button/ButtonComponent";
import {useDispatch, useSelector} from "react-redux";
import {warehousesSelector} from "../../../../selectors";
import {addProduct} from "../../../../redux/actions/actions-production";
import {addProductInWarehouse} from "../../../../redux/actions/actions-warehouses";

import './ProductionForm.scss'

const ProductionForm = ({setIsHiddenAddWin}) => {
  const [product, setProduct] = useState({
    item: '',
    inWarehouse: 0,
    unallocated: 0,
  })

  const [forWarehouse, setForWarehouse] = useState([])
  useEffect(() => {
    if(forWarehouse.length > 0) {
      setForWarehouse(forWarehouse.map(form => (
        {...form, product: product.item})
      ))
    }
  }, [product.item])

  const warehouses = useSelector(warehousesSelector)
  const dispatch = useDispatch()

  const handleChangeNameValue = (e) => {
    const value = e.target.value
    setProduct({...product, item: value})

  }
  const handleChangeAmountValue = (e) => {
    const value = Number(e.target.value)

    setProduct({...product, unallocated: value})
  }

  const handleChangeForWarehouseValue = (value, id, key) => {

    setForWarehouse(forWarehouse.map(form =>
      form.id === id ? {...form, [key]: value} : form
    ))
  }

  const onAddInputForWarehouse = () => {
    setForWarehouse([
      ...forWarehouse,
      {
        id: forWarehouse.length,
        warehouseName: '',
        productName: product.item,
        amount: 0
      }
    ])
  }


  const onAddProduct = () => {
    let amount = 0
    forWarehouse.forEach((form) => amount = amount + form.amount)
    const body = {...product, inWarehouse: amount, unallocated: product.unallocated - amount}
    dispatch(addProduct(body))
    if (forWarehouse.length > 0) {
      forWarehouse.map(product => dispatch(addProductInWarehouse(product)))
    }
    setIsHiddenAddWin(false)
  }

 return (
  <div className='form'>
    <h6 className='form__title'>Название:</h6>
    <input
      className='form__input'
      onChange={(e) => handleChangeNameValue(e)}
      type='text'
    />
    <h6>Количество:</h6>
    <input
      className='form__input'
      onChange={(e) => handleChangeAmountValue(e)}
      type='number'
      min='0'
    />
    <h6>На склад:</h6>
    <AddIconComponent onAdd={onAddInputForWarehouse}/>
    <div className='form__warehouse'>
      {forWarehouse.map(form =>
        <div key={form.id}>
          <select onChange={(e) => handleChangeForWarehouseValue(e.target.value, form.id, 'warehouseName')}>
            <option value=''>Выбрать склад</option>
            {warehouses.map(warehouse =>
              <option
                key={warehouse.id}
                value={warehouse.item}
              >
                {warehouse.item}
              </option>
            )}
          </select>
          <input
            className='form__warehouse__input'
            type="number"
            min='0'
            max={product.unallocated}
            onChange={(e) => handleChangeForWarehouseValue(Number(e.target.value), form.id, 'amount')}
          />
        </div>
      )}
    </div>
    <ButtonComponent onClick={onAddProduct} text='Добавить'/>
  </div>
 )
}
export default ProductionForm