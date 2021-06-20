import React from 'react'
import {useSelector} from "react-redux";

import {warehousesSelector} from "../../selectors";

import './Warehouses.scss'

const Warehouses = () => {
    const warehouses = useSelector(warehousesSelector)

    return (
        <div className='warehouses'>
            {warehouses.map((warehouse, index) =>
                <div
                    className={`warehouses__warehouse ${index%2 == 0 && 'backgroundColor'}` }
                    key={warehouse.id}
                >
                    {warehouse.item}
                </div>
            )}
        </div>
    )
}

export default Warehouses