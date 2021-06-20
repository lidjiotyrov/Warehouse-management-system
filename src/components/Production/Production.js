import React from 'react'
import {useSelector} from "react-redux";
import {productionSelector} from "../../selectors";

import './Production.scss'


const Production = () => {
    const production = useSelector(productionSelector)

    return (
        <div className='production'>
            {production.map((product, index) =>
                <div
                    className={`production__product ${index%2 == 0 && 'backgroundColor'}`}
                    key={product.id}
                >
                    {product.item} {product.amount}
                </div>
            )}
        </div>
    )
}

export default Production