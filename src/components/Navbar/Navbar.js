import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import AddWindow from "./Add-window/Add-window";

import './Navbar.scss'


const items = [
  { name: 'Складские помещения', value: 'warehouses' },
  { name: 'Товары', value: 'production' },
]

const Navbar = () => {
  const history = useHistory()
  const [isHiddenAddWin, setIsHiddenAddWin] = useState(false)
  const [type, setType] = useState('')

  const openPage = (page) => history.push(`/${page}`)

  const toggleAddWin = (type) => {
    setIsHiddenAddWin(!isHiddenAddWin)
    setType(type)
  }

  return (
    <div className='navbar'>
      <div className='navbar__container'>
        <div className='navbar__container__title'>
          Justice
        </div>
        {items.map((item, index) =>
          <div key={index} className='navbar__container__content'>
            <div className='navbar__container__content__item' onClick={() => openPage(item.value)}>
              {item.name}
            </div>
          </div>
        )}
        <div className='navbar__container__content'>
          <div className='navbar__container__content__item' onClick={() => toggleAddWin('production')}>
            Добавить товар
          </div>
        </div>
        <div className='navbar__container__content'>
          <div className='navbar__container__content__item' onClick={() => toggleAddWin('warehouses')}>
            Добавить склад
          </div>
        </div>
      </div>
      {isHiddenAddWin && <AddWindow onClose={toggleAddWin} setIsHiddenAddWin={setIsHiddenAddWin} type={type}/>}
    </div>
  )
}


export default Navbar