import React, {useEffect, useState} from "react";
import {
  Form,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

import {productionSelector, warehousesSelector} from "../../../selectors";

import './WarehousesModal.scss'
import ButtonComponent from "../../Shared/Button/ButtonComponent";
import {addProductInWarehouse} from "../../../redux/actions/actions-warehouses";
import {deleteProduction} from "../../../redux/actions/actions-production";


const WarehouseModal = (props) => {
  const dispatch = useDispatch()
  const warehouse = useSelector(warehousesSelector).find(warehouse => warehouse.item === props.warehouse.item)
  const production = useSelector(productionSelector)
  const [addProd, setAddProd] = useState([])

  const setCount = (product) => {
    setAddProd(addProd.map(prod =>
      prod.productName === product.productName && prod.amount < prod.maxCount
        ? {...prod, amount: prod.amount + 1}
        : prod
    ))
  }

  const onAdd = () => {
    addProd.map(product => dispatch(addProductInWarehouse(product)))
    addProd.map(product => dispatch(deleteProduction({...product, name: product.productName})))
  }

  useEffect(() => {
    const arr = []
    production.forEach((prod, key) => (prod.unallocated > 0
      && arr.push({
        id: key,
        warehouseName: warehouse.item,
        productName: prod.item,
        amount: 0,
        maxCount: prod.unallocated
      })
    ))
    setAddProd(arr)
  }, [production])

  return (
    <div className='warehouses-modal'>
      <div className="warehouses-modal__wrapper">
        <Form
          className='warehouses-modal__wrapper__form'
          autoComplete="off"
        >
          <h4 className="warehouses-modal__wrapper__form__area-label">
            Information
          </h4>
          <div className="warehouses-modal__row">
            {warehouse.item}
            {warehouse.production.map(product =>
              <div key={product.id}>
                <div>Наименование {product.productName}</div>
                <div>Количество {product.amount}</div>
              </div>
            )}
          </div>
        </Form>

        <Form
          className='warehouses-modal__wrapper__form'
          autoComplete="off"
        >
          <h4 className="warehouses-modal__wrapper__form__area-label">
            Добавить товары:
          </h4>
          <div className='form__add'>
            <div>
              {addProd.map(prod =>
                <div key={prod.id} className='form__add__prod'>
                  <div>
                    <span>
                      {prod.productName}
                    </span>
                    <span>
                      &#160;{prod.amount}/
                    </span>
                    <span>
                      {prod.maxCount}
                    </span>
                  </div>
                  <div>
                    <span onClick={() => setCount(prod)} className='form__add__prod__count'>
                      +
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ButtonComponent onClick={onAdd} text='Добавить'/>
        </Form>

        <Form
          className='warehouses-modal__wrapper__form'
          autoComplete="off"
        >
          <h4 className="warehouses-modal__wrapper__form__area-label">
            Удалить:
          </h4>
          <div className="warehouses-modal__row">
          </div>
        </Form>
      </div>
    </div>
  )
}

export default WarehouseModal