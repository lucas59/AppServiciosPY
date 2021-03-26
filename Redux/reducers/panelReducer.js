import { ALTERN_PANEL } from "../Contains"
const initialState = {
    visible: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ALTERN_PANEL:
            return { ...state, open: action.payload }
        default:
            return state
    }
}