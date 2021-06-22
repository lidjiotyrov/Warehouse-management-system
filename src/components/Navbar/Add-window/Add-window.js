import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {warehousesSelector} from "../../../selectors";
import {ReactComponent as CloseIcon} from "../../../static/images/icons/closeIcon.svg";

import './Add-window.scss'
import CloseIconComponent from "../../Shared/closeIconComponent/CloseIconComponent";
import {addProduct} from "../../../redux/actions/actionsProduction";


const AddWindow = ({onClose}) => {
  const [product, setProduct] = useState({
    item: '',
    inWarehouse: 0,
    unallocated: 0,
  })

  const [forWarehouse, setForWarehouse] = useState({
    warehouseName: '',
    product: '',
    amount: 0
  })

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

  const handleChangeSelectValue = (e) => {
    const value = e.target.value
    setForWarehouse({...forWarehouse, warehouseName: value})
  }

  const handleChangeAmountForWarehouseValue = (e) => {
    const value = Number(e.target.value)

    setForWarehouse({...forWarehouse, amount: value})
    setProduct({...product, inWarehouse: value, unallocated: product.unallocated - value})
  }

  const onAddProduct = () => {
    dispatch(addProduct(product))
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
          <div className='add-window__container__form__warehouse'>
            <select onChange={(e) => handleChangeSelectValue(e)}>
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
              onChange={(e) => handleChangeAmountForWarehouseValue(e)}
            />
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