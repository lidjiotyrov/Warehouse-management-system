import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';

import AddIconComponent from "../../../Shared/addIconComponent/AddIconComponent";
import ButtonComponent from "../../../Shared/Button/ButtonComponent";
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
    // eslint-disable-next-line
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
    if (product.item && product.unallocated > 0) {
      const body = {...product, inWarehouse: amount, unallocated: product.unallocated - amount}
      dispatch(addProduct(body))
      if (forWarehouse.length > 0) {
        forWarehouse.map(product => dispatch(addProductInWarehouse(product)))
      }
      toast.success('Товар добавлен')
      setIsHiddenAddWin(false)
    } else {
      toast.error('Заполните поля')
    }

  }

 return (
  <div className='form-prod'>
    <h6 className='form-prod__title'>Название:</h6>
    <input
      className='form-prod__input'
      onChange={(e) => handleChangeNameValue(e)}
    />
    <h6>Количество:</h6>
    <input
      className='form-prod__input'
      onChange={(e) => handleChangeAmountValue(e)}
    />
    <h6>На склад:</h6>
    <AddIconComponent onAdd={onAddInputForWarehouse}/>
    <div className='form-prod__warehouse'>
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
            className='form-prod__warehouse__input'
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