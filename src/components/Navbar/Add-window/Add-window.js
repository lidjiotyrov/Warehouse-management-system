import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {warehousesSelector} from "../../../selectors";
import CloseIconComponent from "../../Shared/closeIconComponent/CloseIconComponent";
import {addProduct} from "../../../redux/actions/actions-production";

import './Add-window.scss'
import AddIconComponent from "../../Shared/addIconComponent/AddIconComponent";
import {addProductInWarehouse} from "../../../redux/actions/actions-warehouses";


const AddWindow = ({onClose}) => {
  const [product, setProduct] = useState({
    item: '',
    inWarehouse: 0,
    unallocated: 0,
  })
  console.log('@@@ product ->', product)

  const [forWarehouse, setForWarehouse] = useState([
    {
      id: 0,
      warehouseName: '',
      product: product.item,
      amount: 0
    }
  ])
  useEffect(() => {
    setForWarehouse(forWarehouse.map(form => (
      {...form, product: product.item})
    ))

  }, [product.item])
  console.log('@@@ forWarehouse ->', forWarehouse)

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

  const handleChangeForWarehouseValue = (e, id, key) => {
    const value = e.target.value
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
        product: product.item,
        amount: 0
      }
    ])
  }


  const onAddProduct = () => {
    dispatch(addProduct(product))
    dispatch(addProductInWarehouse(forWarehouse))
  }

  return (
    <div className='add-window'>
      <div className='add-window__container'>
        <div className='add-window__container__form'>
          <h6 className='form__title'>Название:</h6>
          <input
            className='add-window__container__form__input'
            onChange={(e) => handleChangeNameValue(e)}
            type='text'
          />
          <h6>Количество:</h6>
          <input
            className='add-window__container__form__input'
            onChange={(e) => handleChangeAmountValue(e)}
            type='number'
            min='0'
          />
          <h6>На склад:</h6>
          <AddIconComponent onAdd={onAddInputForWarehouse}/>
          <div className='add-window__container__form__warehouse'>
            {forWarehouse.map(form =>
              <div key={form.id}>
                <select onChange={(e) => handleChangeForWarehouseValue(e, form.id, 'warehouseName')}>
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
                  className='add-window__container__form__warehouse__input'
                  type="number"
                  min='0'
                  max={product.unallocated}
                  onChange={(e) => handleChangeForWarehouseValue(e, form.id, 'amount')}
                />
              </div>
            )}
          </div>
          <div className='add-window__container__form__add-btn'>
            <span onClick={() => onAddProduct()}>
              Добавить
            </span>
          </div>
        </div>
        <CloseIconComponent onClose={onClose}/>
      </div>
    </div>
  )
}

export default AddWindow