import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import {productionSelector} from "../../selectors";
import {showProductionModal} from "../../redux/actions/common";

import './Production.scss'


const Production = () => {
    const production = useSelector(productionSelector)
    const dispatch = useDispatch()

    const onShowProductionModal = (product) => {
        dispatch(showProductionModal(product))
    }

    return (
        <div className='production'>
            {production.map((product, index) =>
                <div
                    className={`production__product ${index%2 === 0 && 'backgroundColor'}`}
                    key={product.id}
                    onClick={() => onShowProductionModal(product)}
                >
                    {product.item} {product.amount}
                </div>
            )}
        </div>
    )
}

export default Production