import React, {useEffect, useState} from "react";
import {
  Form,
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {toast} from 'react-toastify';

import {productionSelector, warehousesSelector} from "../../../selectors";
import ButtonComponent from "../../Shared/Button/ButtonComponent";
import {
  addProductInWarehouse,
  deleteProductInWarehouse,
  deleteWarehouse,
  moveProduct
} from "../../../redux/actions/actions-warehouses";
import {addProduct, deleteProduction, moveProductOfWarehouse} from "../../../redux/actions/actions-production";
import {hideModals} from "../../../redux/actions/common";

import './WarehousesModal.scss'


const WarehouseModal = (props) => {
  const dispatch = useDispatch()
  const warehouse = useSelector(warehousesSelector).find(warehouse => warehouse.item === props.warehouse.item)
  const warehouses = useSelector(warehousesSelector)
  const production = useSelector(productionSelector)
  const [addProd, setAddProd] = useState([])
  const [deleteProd, setDeleteProd] = useState([])
  const [moveProd, setMoveProd] = useState({
    warehouseName: warehouse?.item,
    newWarehouseName: '',
    productName: '',
    amount: 0,
  })

  const setCount = (product) => {
    setAddProd(addProd.map(prod =>
      prod.productName === product.productName && prod.amount < prod.maxCount
        ? {...prod, amount: prod.amount + 1}
        : prod
    ))
  }

  const onChaneAmount = (product, e) => {
    const value = Number(e.target.value)
    setAddProd(addProd.map(prod =>
      prod.productName === product.productName && value <= prod.maxCount
        ? {...prod, amount: value}
        : prod
    ))
  }

  const onChaneCount = (product, e) => {
    const value = Number(e.target.value)
    setDeleteProd(deleteProd.map(prod =>
      prod.productName === product.productName && value <= prod.amount
        ? {...prod, count: value}
        : prod
    ))
  }

  const onChangeMoveProduct = (value, key) => {
    if (key === 'amount') {
      setMoveProd({
        ...moveProd,
        amount: value <= warehouse.production.find(prod => prod.productName === moveProd.productName).amount ? value : 0
      })
      return
    }

    setMoveProd({
      ...moveProd,
      [key]: value
    })
  }

  const setDelCount = (product) => {
    setDeleteProd(deleteProd.map(prod =>
      prod.productName === product.productName && prod.count < prod.amount
        ? {...prod, count: prod.count + 1}
        : prod
    ))
  }

  const onAdd = () => {
    if (addProd.find(prod => prod.amount > 0)) {
      addProd.map(product => dispatch(addProductInWarehouse(product)))
      addProd.map(product => dispatch(deleteProduction({...product, name: product.productName,})))
      toast.success('?????????? ????????????????')
    } else {
      toast.error('?????????????????? ????????')
    }
  }

  const onDelete = () => {
    if (deleteProd.find(prod => prod.count > 0)) {
      const isCompletely = deleteProd.filter(prod =>
        warehouse.production.find(product => product.productName === prod.productName).amount - prod.count <= 0
      )
      isCompletely.map(prod => prod.count > 0 && dispatch(deleteProductInWarehouse({
        productName: prod.productName,
        warehouseName: warehouse.item
      })))
      deleteProd.map(prod => prod.count > 0 && dispatch(deleteProductInWarehouse(prod)))
      deleteProd.map(prod => prod.count > 0 && dispatch(addProduct({item: prod.productName, unallocated: prod.count, move: 'move'})))
      toast.success('?????????? ????????????')
    } else {
      toast.error('?????????????????? ????????')
    }
  }

  const onMove = () => {
    const isChecked = warehouse.production.find(prod => prod.productName === moveProd.productName)?.amount - moveProd.amount <= 0

    if (isChecked) {
      dispatch(moveProduct({...moveProd, key: 'key'}))
      toast.success('?????????? ??????????????????')
      return
    }

    if (moveProd.amount > 0) {
      dispatch(moveProduct(moveProd))
      toast.success('?????????? ??????????????????')
    } else {
      toast.error('?????????????????? ????????')
    }
  }

  const onDeleteWarehouse = () => {
    dispatch(deleteWarehouse(warehouse.item))
    warehouse.production.map(prod => dispatch(moveProductOfWarehouse(prod)))
    toast.success('?????????? ????????????')
    dispatch(hideModals())
  }

  useEffect(() => {
    const addProds = []
    production.forEach((prod, key) => (prod.unallocated > 0
      && addProds.push({
        id: key,
        warehouseName: warehouse?.item,
        productName: prod.item,
        amount: 0,
        maxCount: prod.unallocated
      })
    ))
    setAddProd(addProds)

    const deleteProds = []
    warehouse?.production.forEach((prod, key) => (
      deleteProds.push({
        id: key,
        warehouseName: warehouse?.item,
        productName: prod.productName,
        amount: prod.amount,
        count: 0
      })
    ))
    setDeleteProd(deleteProds)
  }, [production, warehouse])

  return (
    <div className='warehouses-modal'>
      <div className="warehouses-modal__wrapper">
        <Form
          className='warehouses-modal__wrapper__form'
          autoComplete="off"
          id='info-form'
        >
          <h4 className="warehouses-modal__wrapper__form__area-label">
            ???????????????????? {warehouse?.item}
          </h4>
          <div className="form-info form">
            {warehouse?.production.map(product =>
              <div key={product.id}>
                <div className='form-info__name'>
                  <h6>????????????????????????:</h6>
                  <div>{product.productName}</div>
                </div>
                <div className='form-info__amount'>
                  <h6>????????????????????:</h6>
                  <div>{product.amount}</div>
                </div>
              </div>
            )}
          </div>
        </Form>

        <Form
          className='warehouses-modal__wrapper__form'
          autoComplete="off"
          id='add-form'
        >
          <h4 className="warehouses-modal__wrapper__form__area-label">
            ???????????????? ????????????:
          </h4>
          <div className='form__add form'>
            <div>
              {addProd.map(prod =>
                <div key={prod.id} className='form__add__prod'>
                  <div>
                    <span>
                      {prod.productName}
                    </span>
                    <input
                      className='form__add__prod__input'
                      value={prod.amount}
                      onChange={e => onChaneAmount(prod, e)}/>
                    <span>
                      /{prod.maxCount}
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
          <ButtonComponent onClick={onAdd} text='????????????????'/>
        </Form>

        <Form
          className='warehouses-modal__wrapper__form'
          autoComplete="off"
          id='delete-form'
        >
          <h4 className="warehouses-modal__wrapper__form__area-label">
            ?????????????? ????????????:
          </h4>
          <div className='form-delete form'>
            <div>
              {deleteProd.map(prod =>
                <div key={prod.id} className='form-delete__prod'>
                  <div>
                    <span>
                      {prod.productName}
                    </span>
                    <input
                      className='form__add__prod__input'
                      value={prod.count}
                      onChange={e => onChaneCount(prod, e)}/>
                    <span>
                      /{prod.amount}
                    </span>
                  </div>
                  <div>
                    <span onClick={() => setDelCount(prod)} className='form__add__prod__count'>
                      +
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ButtonComponent onClick={onDelete} text='??????????????'/>
        </Form>

        <Form
          className='warehouses-modal__wrapper__form'
          autoComplete="off"
          id='move-form'
        >
          <h4 className="warehouses-modal__wrapper__form__area-label">
            ?????????????????????? ??????????:
          </h4>
          <div className="form-move form">
            <select
              className='form-move__select'
              onChange={e => onChangeMoveProduct(e.target.value, 'newWarehouseName')}
            >
              <option value="">?????????????? ??????????</option>
              {warehouses.map(warehouse =>
                warehouse.item !== props.warehouse.item &&
                <option value={warehouse.item} key={warehouse.id}>
                  {warehouse.item}
                </option>
              )}
            </select>
            <h6>???????????????? ????????????:</h6>
            <input
              className='form-move__input'
              onChange={e => onChangeMoveProduct(e.target.value, 'productName')}
            />
            <h6>???????????????????? ????????????:</h6>
            <input
              className='form-move__input'
              value={moveProd.amount}
              disabled={!moveProd.productName}
              onChange={e => onChangeMoveProduct(+e.target.value, 'amount')}
            />
          </div>
          <ButtonComponent onClick={onMove} text='??????????????????????'/>
        </Form>
        <div className='deleteWarehouse' id='deleteWarehouse'>
          <ButtonComponent onClick={onDeleteWarehouse} text='?????????????? ??????????'/>
        </div>

      </div>
    </div>
  )
}

export default WarehouseModal