import React from "react"
import {useDispatch, useSelector} from "react-redux";

import {warehousesSelector} from "../../selectors";

import './Warehouses.scss'
import {showWarehouseModal} from "../../redux/actions/common";

const columns = [
  'Склад',
  'Адрес',
  'Тип',
  'Статус',
]

const Warehouses = () => {
    const warehouses = useSelector(warehousesSelector)
  const dispatch = useDispatch()

  const onShowWarehouseModal = (warehouse) => {
      dispatch(showWarehouseModal(warehouse))
  }

    return (
        <div className='warehouses'>
            <div className='warehouses__columns'>
                {columns.map((column, index) =>
                  <div
                    className='warehouses__columns__column'
                    key={index}
                  >
                      {column}
                  </div>
                )}
            </div>

            {warehouses.map((warehouse, index) =>
                <div
                    className={`warehouses__warehouse ${index%2 === 0 && 'backgroundColor'}` }
                    key={warehouse.id}
                    onClick={() => onShowWarehouseModal(warehouse)}
                >
                  <span>
                    {warehouse.item}
                  </span>
                  <span>
                    {warehouse.address}
                  </span>
                  <span>
                    {warehouse.type}
                  </span>
                  <span>
                    {warehouse.status}
                  </span>
                </div>
            )}
        </div>
    )
}

export default Warehouses