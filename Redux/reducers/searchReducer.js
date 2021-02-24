import { SET_SEARCHES } from "../Contains"
const initialState = { searches: [] }

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCHES:
            return { ...state, searches: action.payload }
        default:
            return state
    }
}