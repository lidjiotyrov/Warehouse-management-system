import React from "react";
import {
  Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";

import './WarehousesModal.scss'



const WarehouseModal = ({warehouse}) => {
  const dispatch = useDispatch()

  return (
    <div className='warehouses-modal'>
      <div className="warehouses-modal__form-area">
        <Form
          className='warehouses-modal__form-area__form'
          autoComplete="off"
        >
          <h4 className="warehouses-modal__form-area__form__area-label">
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
      </div>
    </div>
  )
}

export default WarehouseModal