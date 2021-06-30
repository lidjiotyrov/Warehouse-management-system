import React, {useState} from "react";
import {
  Form,
  FormLabel,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

import AddIconComponent from "../../Shared/addIconComponent/AddIconComponent";
import {addProductInWarehouse, deleteProductInWarehouse} from "../../../redux/actions/actions-warehouses";
import ButtonComponent from "../../Shared/Button/ButtonComponent";
import {addProduct, deleteProduction, editProduction} from "../../../redux/actions/actions-production";
import {productionSelector} from "../../../selectors";
import {hideModals} from "../../../redux/actions/common";

import './ProductionModal.scss'



const ProductModal = ({product}) => {
  const dispatch = useDispatch()
  const prod = useSelector(productionSelector).find((prod) => prod.item === product.item)

  const [editProduct, setEditProduct] = useState({
    ...prod,
    unallocated: 0,
  })
  const [forWarehouse, setForWarehouse] = useState([
    {
      id: 0,
      warehouseName: '',
      productName: prod?.item,
      amount: 0,
    },
  ])
  const [deleteCount, setDeleteCount] = useState(0)

  const onChangeAmountProduct = (e) => {
    const value = Number(e.target.value)
    setEditProduct({...editProduct, unallocated: value})
  }

  const onAddWarehouse = () => {
    setForWarehouse([...forWarehouse, {
      id: forWarehouse.length,
      warehouseName: '',
      productName: prod?.item,
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

  const onAdd = () => {
    if (editProduct.unallocated > 0) {
      dispatch(addProduct(editProduct))
      toast.success('Товар добавлен')
    } else {
      toast.error('Заполните форму правильно')
    }
  }

  const onDelete = () => {
    if(deleteCount > 0){
      dispatch(deleteProduction({ name:prod.item, amount: deleteCount}))
      toast.success('Товар удален')
    } else {
      toast.error('Заполните форму правильно')
    }

  }

  const onDeleteCompletely = () => {
    dispatch((deleteProductInWarehouse(prod.item)))
    dispatch(deleteProduction(prod.item, 'completely'))
    toast.success('Товар удален')
    dispatch(hideModals())
  }

  const onSave = () => {
    forWarehouse.map(product => dispatch(addProductInWarehouse(product)))
    forWarehouse.map(product => dispatch(editProduction(product)))
  }

  return (
    <div className='production-modal'>
      <div className="production-modal__wrapper">

        <Form
          className='production-modal__wrapper__form'
          autoComplete="off"
          id='info-form'
        >
          <h5>
            Information:
          </h5>
          <div className="production-modal__row">
            <div>
              <FormLabel>Наименование: </FormLabel>
              {prod?.item}
            </div>
            <div>
              <FormLabel>На складах: </FormLabel>
              {prod?.inWarehouse}
            </div>
            <div>
              <FormLabel>Не распределенно: </FormLabel>
              {prod?.unallocated}
            </div>
          </div>
        </Form>

        <Form
          className='production-modal__wrapper__form'
          autoComplete='off'
          id='add-form'
        >
          <div className='production-modal__wrapper__form__title'>
            <h5>
              Добавить:
            </h5>
          </div>
          <div className='production-modal__wrapper__form__addition'>
            <input className='production-modal__wrapper__form__addition__input' type="text" onChange={(e) => onChangeAmountProduct(e)}/>
          </div>
          <ButtonComponent onClick={onAdd} text='Принять'/>
        </Form>

        <Form
          className='production-modal__wrapper__form form__distribution'
          autoComplete='off'
          id='distribution-form'
        >
          <div className='production-modal__wrapper__form__title'>
            <AddIconComponent onAdd={onAddWarehouse}/>
            <h5>
              На склад:
            </h5>
          </div>
          <div className='production-modal__wrapper__form__distribution'>
            <div className='production-modal__wrapper__form__distribution__container'>
              {forWarehouse.map((form) =>
                <div className='production-modal__wrapper__form__distribution__container__inputs' key={form.id}>
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

        <Form
          className='production-modal__wrapper__form'
          autoComplete='off'
          id='delete-form'
        >
          <div className='production-modal__wrapper__form__title'>
            <h5>
              Удалить:
            </h5>
          </div>
          <div className='production-modal__wrapper__form__addition'>
            <input className='production-modal__wrapper__form__addition__input' type="text" onChange={(e) => setDeleteCount(+e.target.value)}/>
          </div>
          <ButtonComponent onClick={onDelete} text='Принять'/>
        </Form>
        <div id='delete-btn'>
          <ButtonComponent onClick={onDeleteCompletely} text='Удалить товар' />
        </div>
      </div>
    </div>
  )
}

export default ProductModal
