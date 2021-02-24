import { SET_STEP_SIGNUP, SET_SHOW_CONFIRM_MAP, SET_REGION, SET_ADDRESS, SET_SEARCH_REGION, SET_CREATING_ACCOUNT } from "../Contains"

const initialState = {
    activeStep: 0,
    showConfirmMap: false,
    creatingAccount: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_STEP_SIGNUP:
            return { ...state, activeStep: action.payload }

        case SET_SHOW_CONFIRM_MAP:
            return { ...state, showConfirmMap: action.payload }

        case SET_SEARCH_REGION:
            return { ...state, searchRegion: action.payload }

        case SET_REGION:
            return { ...state, region: action.payload }

        case SET_ADDRESS:
            return { ...state, address: action.payload }


        case SET_CREATING_ACCOUNT:
            return { ...state, creatingAccount: action.payload }

        default:
            return state
    }
}