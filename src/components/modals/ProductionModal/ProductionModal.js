import React, {useState} from "react";
import {
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import {useDispatch} from "react-redux";

import './ProductionModal.scss'
import AddIconComponent from "../../Shared/addIconComponent/AddIconComponent";
import {addProductInWarehouse} from "../../../redux/actions/actions-warehouses";
import ButtonComponent from "../../Shared/Button/ButtonComponent";


const ProductModal = ({product}) => {
  const dispatch = useDispatch()
  const [editProduct, setEditProduct] = useState({
    ...product
  })
  console.log('@@@ editProduct ->', editProduct)
  const [forWarehouse, setForWarehouse] = useState([
    {
      id: 0,
      _id: product._id,
      warehouseName: '',
      productName: editProduct.item,
      amount: 0
    },
  ])
  console.log('@@@ forWarehouse ->', forWarehouse)

  const onChangeNameProduct = (e) => {
    const value = e.target.value
    setEditProduct({...editProduct, item: value})
  }

  const onAddWarehouse = () => {
    setForWarehouse([...forWarehouse, {
      id: forWarehouse.length,
      warehouseName: '',
      product: editProduct.item,
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
    dispatch(addProductInWarehouse(forWarehouse))
  }

  return (
    <div className='production-modal'>
      <div className="production-modal__form-area">
        <Form
          className='production-modal__form-area__form'
          autoComplete="off"
        >
          <h5>
            Information:
          </h5>
          <div className="production-modal__row">
            <div>
              <FormLabel>Наименование:</FormLabel>
              <FormControl
                type='text'
                value={product.item}
                onChange={(e) => onChangeNameProduct(e)}
              />
            </div>
            <div>
              <FormLabel>На складах:</FormLabel>
              {product.inWarehouse}
            </div>
            <div>
              <FormLabel>Не распределенно:</FormLabel>
              {product.unallocated}
            </div>
          </div>
        </Form>
        <Form
          className='production-modal__form-area__form'
          autoComplete='off'
        >
          <div className='production-modal__form-area__form__title'>
            <h5>
              Добавить
            </h5>
            <AddIconComponent onAdd={onAddWarehouse}/>
          </div>
          <div className='production-modal__form-area__form__distribution'>
            {forWarehouse.map( (form) =>
              <div key={form.id}>
                <input
                  value={form.warehouseName}
                  type='text'
                  onChange={(e) => (e)}
                />
                <input
                  value={form.amount}
                  type='number'
                  min='0'
                  max={editProduct.unallocated}
                  onChange={(e) => (e)}
                />
              </div>
            )}
          </div>
        </Form>
        <Form
          className='production-modal__form-area__form'
          autoComplete='off'
        >
          <div className='production-modal__form-area__form__title'>
            <h5>
              Распределить
            </h5>
            <AddIconComponent onAdd={onAddWarehouse}/>
          </div>
          <div className='production-modal__form-area__form__distribution'>
            {forWarehouse.map( (form) =>
              <div key={form.id}>
                <input
                  value={form.warehouseName}
                  type='text'
                  onChange={(e) => onChangeWarehouseName(e, form.id)}
                />
                <input
                  value={form.amount}
                  type='number'
                  min='0'
                  max={editProduct.unallocated}
                  onChange={(e) => onAmount(e, form.id)}
                />
              </div>
            )}
          </div>
        </Form>
      </div>
      <ButtonComponent onClick={onSave} text='Сохранить'/>
    </div>
  )
}

export default ProductModal
