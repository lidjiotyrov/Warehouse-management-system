import {HIDE_MODAL, MODALS_TYPES, SHOW_MODAL} from "../../constans/constans"

export const hideModals = () => {
  return {type: HIDE_MODAL}
}


const showModal = (modalType, modalProps) => {
  return {
    type: SHOW_MODAL,
    payload: {
      modalType,
      modalProps,
    }
  }
}

export const showProductionModal = (production) => {
  return showModal(MODALS_TYPES.VIEW_PRODUCT, {label: 'Justice', title: 'Production', production})
}

export const showWarehouseModal = (warehouse) => {
  return showModal(MODALS_TYPES.VIEW_WAREHOUSE, {label: 'Justice', title: 'Warehouse', warehouse})
}