import React from 'react'

import './ButtonComponent.scss'

const ButtonComponent = ({text, onClick}) => {
  return (
    <div className='add-btn'>
      <span onClick={() => onClick()}>
        {text}
      </span>
    </div>
  )
}

export default ButtonComponent
