import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import {ReactComponent as CloseIcon} from '../../static/images/icons/closeIcon.svg'

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

  const onOpenAddWin = () => {
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
          <div className='navbar__container__content__item' onClick={onOpenAddWin}>
            Добавить товар
          </div>
        </div>
      </div>
      {isHiddenAddWin &&
      <div className='navbar__add-window'>
        <div className='navbar__add-window__container'>
          <div className='navbar__add-window__container__form'>
            <div>Название:</div>
            <input type="text"/>
          </div>
          <div className='navbar__add-window__container__close-icon'>
            <CloseIcon onClick={onOpenAddWin}/>
          </div>
        </div>
      </div>
      }
    </div>
  )
}


export default Navbar