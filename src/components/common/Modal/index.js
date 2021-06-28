import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {modalSelector} from "../../../selectors";
import ProductModal from "../../modals/ProductionModal/ProductionModal";
import WarehouseModal from "../../modals/WarehousesModal/WarehousesModal";
import {hideModals} from "../../../redux/actions/common";
import CloseIconComponent from "../../Shared/closeIconComponent/CloseIconComponent";
import {MODALS_TYPES} from "../../../constans/constans";

import "./index.scss"



const MODAL_COMPONENTS = {
  [MODALS_TYPES.VIEW_PRODUCT]: ProductModal,
  [MODALS_TYPES.VIEW_WAREHOUSE]: WarehouseModal,
}

const RootModal = (props) => {
  const dispatch = useDispatch()
  const modalStateFromStore = useSelector(modalSelector)
  const [modalState, setModalState] = useState({
    modalType: null,
    modalProps: {
      label: '',
      title: '',
      warehouse: {},
      product: {},
    },
  })

  const onHideModal = () => {
    dispatch(hideModals())
  }

  useEffect(() => {
    setModalState(modalStateFromStore)
  }, [modalStateFromStore])

  if (!modalState.modalType) {
    return null
  }

  const SpecificModal = MODAL_COMPONENTS[modalState.modalType];

  return (
    <div className='modal-wrapper'>
      <div className="modal">
        <div className="modal__header">
          <div className='modal__header__container'>
            <h4 className="modal__header__container__label">{modalState.modalProps.label}</h4>
            <h2 className="modal__header__container__title">{modalState.modalProps.title}</h2>
            <div className="modal__close-button">
              <CloseIconComponent onClose={onHideModal}/>
            </div>
          </div>

        </div>
        <div className="modal__body">
          <SpecificModal product={modalState.modalProps.product} warehouse={modalState.modalProps.warehouse}/>
        </div>
      </div>
    </div>
  )
}

export default RootModal;
