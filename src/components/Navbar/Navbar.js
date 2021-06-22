import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import AddWindow from "./Add-window/Add-window";

import './Navbar.scss'


const items = [
  { name: 'Складские помещения', value: 'warehouses' },
  { name: 'Товары', value: 'production' },
  { name: 'Нераспределенные товары', value: 'unallocated' },
]

const Navbar = () => {
  const history = useHistory()
  const [isHiddenAddWin, setIsHiddenAddWin] = useState(false)

  const openPage = (page) => history.push(`/${page}`)

  const toggleAddWin = () => {
    setIsHiddenAddWin(!isHiddenAddWin)
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
          <div className='navbar__container__content__item' onClick={toggleAddWin}>
            Добавить товар
          </div>
        </div>
        <div className='navbar__container__content'>
          <div className='navbar__container__content__item' onClick={toggleAddWin}>
            Добавить склад
          </div>
        </div>
      </div>
      {isHiddenAddWin && <AddWindow onClose={toggleAddWin}/>}
    </div>
  )
}


export default Navbar