import React, {useState} from "react";
import {
  Form,
  FormLabel,
} from "react-bootstrap";
import {useDispatch} from "react-redux";

import AddIconComponent from "../../Shared/addIconComponent/AddIconComponent";
import {addProductInWarehouse} from "../../../redux/actions/actions-warehouses";
import ButtonComponent from "../../Shared/Button/ButtonComponent";

import './ProductionModal.scss'


const ProductModal = ({product}) => {
  const dispatch = useDispatch()

  const [editProduct, setEditProduct] = useState({
    ...product
  })
  const [forWarehouse, setForWarehouse] = useState([
    {
      id: 0,
      warehouseName: '',
      productName: product.item,
      amount: 0
    },
  ])

  const onChangeAmountProduct = (e) => {
    const value = Number(e.target.value)
    setEditProduct({...editProduct, unallocated: value})
  }

  const onAddWarehouse = () => {
    setForWarehouse([...forWarehouse, {
      id: forWarehouse.length,
      warehouseName: '',
      productName: product.item,
      amount: 0
    }])
  }

  const onChangeWarehouseName = (e, id) => {
    const value = e.target.value
    setForWarehouse(forWarehouse.map(form => form.id === id ? {...form, warehouseName: value} : form))
  }

  const onAmount = (e, id) => {
    const value = Number(e.target.value)
    setForWarehouse(forWarehouse.map(form => form.id === id ? {...form, amount: value} : form))
  }

  const onSave = () => {
    forWarehouse.map(product => dispatch(addProductInWarehouse(product)))
  }

  return (
    <div className='production-modal'>
      <div className="production-modal__wrapper">

        <Form
          className='production-modal__wrapper__form'
          autoComplete="off"
        >
          <h5>
            Information:
          </h5>
          <div className="production-modal__row">
            <div>
              <FormLabel>Наименование: </FormLabel>
              {product.item}
            </div>
            <div>
              <FormLabel>На складах: </FormLabel>
              {product.inWarehouse}
            </div>
            <div>
              <FormLabel>Не распределенно: </FormLabel>
              {product.unallocated}
            </div>
          </div>
        </Form>

        <Form
          className='production-modal__wrapper__form'
          autoComplete='off'
        >
          <div className='production-modal__wrapper__form__title'>
            <h5>
              Добавить:
            </h5>
          </div>
          <div className='production-modal__wrapper__form__addition'>
            <input type="text" onChange={(e) => onChangeAmountProduct(e)}/>
          </div>
        </Form>

        <Form
          className='production-modal__wrapper__form form__distribution'
          autoComplete='off'
        >
          <div className='production-modal__wrapper__form__title'>
            <AddIconComponent onAdd={onAddWarehouse}/>
            <h5>
              Распределить
            </h5>
          </div>
          <div className='production-modal__wrapper__form__distribution'>
            <div className='production-modal__wrapper__form__distribution__container'>
              {forWarehouse.map((form) =>
                <div key={form.id} >
                  <input
                    className='production-modal__wrapper__form__distribution__container__input'
                    value={form.warehouseName}
                    type='text'
                    onChange={(e) => onChangeWarehouseName(e, form.id)}
                  />
                  <input
                    className='production-modal__wrapper__form__distribution__container__input-amount'
                    value={form.amount}
                    onChange={(e) => onAmount(e, form.id)}
                  />
                </div>
              )}
            </div>

          </div>
          <ButtonComponent onClick={onSave} text='Распределить'/>
        </Form>

      </div>
    </div>
  )
}

export default ProductModal
