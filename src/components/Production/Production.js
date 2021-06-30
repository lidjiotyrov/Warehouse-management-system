import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {productionSelector} from "../../selectors";
import {showProductionModal} from "../../redux/actions/common";

import './Production.scss'


const columns = [
  'Продукт',
  'На складах',
  'Не распределенные',
  'Всего',
]

const Production = () => {
  const production = useSelector(productionSelector)
  const dispatch = useDispatch()

  useEffect(() =>{

  }, [production])

  const onShowProductionModal = (product) => {
    dispatch(showProductionModal(product))
  }

  return (
    <div className='production'>
      <div className='production__columns'>
        {columns.map((column, index) =>
          <div
            className='production__columns__column'
            key={index}
          >
            {column}
          </div>
        )}
      </div>
      {production.map((product, index) =>
        <div
          className={`production__product ${index % 2 === 0 && 'backgroundColor'}`}
          key={product.id}
          onClick={() => onShowProductionModal(product)}
        >
          <span>
            {product.item}
          </span>
          <span>
            {product.inWarehouse}
          </span>
          <span>
            {product.unallocated}
          </span>
          <span>
            {product.inWarehouse + product.unallocated}
          </span>
        </div>
      )}
    </div>
  )
}

export default Production