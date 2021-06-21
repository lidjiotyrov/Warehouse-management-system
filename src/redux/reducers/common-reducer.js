import {HIDE_MODAL, SHOW_MODAL} from "../../constans/constans";

const initState = {
  modal: {
    modalType: null,
    modalProps: {
      label: '',
      title: '',
      warehouse: {},
      product: {},
    }
  }
}

const commonReducer = (state=initState, action) => {
    switch (action.type) {
      case SHOW_MODAL:
        return {
          ...state,
          modal: {
            modalType: action.payload.modalType,
            modalProps: action.payload.modalProps
          }
        }
      case HIDE_MODAL:
        return {
          ...state,
          modal: {
            modalType: null,
            modalProps: {}
          }
        }
        default:
            return state
    }

}

export default commonReducer