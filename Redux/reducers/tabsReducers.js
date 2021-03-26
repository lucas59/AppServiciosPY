import { SET_TAB } from "../Contains"

const initialState = {
    tab: 'stores'
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TAB:
            return { ...state, tab: action.payload }
        default:
            return state
    }
}