import React from 'react'
import { useHistory } from 'react-router-dom';

import './Navbar.scss'


const Navbar = () => {
    const history = useHistory()

    const openPage = (page) => history.push(`/${page}`)

    return (
        <div className='navbar'>
            <div className='navbar__container'>
                <div className='navbar__container__content'>
                    <div className='navbar__container__content__item' onClick={() => openPage('warehouses')}>Складские помещения</div>
                </div>
                <div className='navbar__container__content'>
                    <div className='navbar__container__content__item' onClick={() => openPage('production')}>Товары</div>
                </div>
                <div className='navbar__container__content'>
                    <div className='navbar__container__content__item' onClick={() => openPage('unallocated')}>Нераспределенные товары</div>
                </div>
                <div className='navbar__container__content'>
                    <div className='navbar__container__content__item' onClick={() => openPage('production')}>Добавить товар</div>
                </div>
            </div>
        </div>
    )
}


export default Navbar