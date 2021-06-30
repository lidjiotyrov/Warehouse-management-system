import React from "react";
import {ReactComponent as AddIcon} from "../../../static/images/icons/addIcon.svg";

import './AddIconComponent.scss'


const AddIconComponent = ({onAdd}) => (
  <div className='add-icon'>
    <AddIcon onClick={onAdd}/>
  </div>
)

export default AddIconComponent