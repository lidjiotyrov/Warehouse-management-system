import React from 'react'

import './Header.scss'


const Header = () => {

    return (
        <div className='header'>
            <div className='header__left'>Jusctice</div>
            <div className='header__right'>
              <div><span>Продукт</span></div>
              <div><span>На складах</span></div>
              <div><span>Нерасспределенные</span></div>
            </div>
        </div>
    )
}

export default Header