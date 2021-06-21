import React from "react";
import {
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";



const WarehouseModal = () => {
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
          </div>
        </Form>
      </div>
    </div>
  )
}

export default WarehouseModal