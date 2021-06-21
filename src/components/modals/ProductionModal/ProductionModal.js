import React from "react";
import {
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import './ProductionModal.scss'



const ProductModal = () => {
  const dispatch = useDispatch()

  return (
    <div className='production-modal'>
      <div className="production-modal__form-area">
        <Form
          className='production-modal__form-area__form'
          autoComplete="off"
        >
          <h4 className="">
            Information
          </h4>
          <div className="production-modal__row">
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ProductModal
