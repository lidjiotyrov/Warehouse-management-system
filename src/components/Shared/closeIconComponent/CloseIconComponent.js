import React from "react";
import {ReactComponent as CloseIcon} from "../../../static/images/icons/closeIcon.svg";

import './CloseIconComponent.scss'


const CloseIconComponent = ({onClose}) => (
  <div className='close-icon'>
    <CloseIcon onClick={onClose}/>
  </div>
)

export default CloseIconComponent