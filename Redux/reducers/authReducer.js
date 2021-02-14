const initialState = {
    data: {
        type: 'store'
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload }
        case "GET_TOKEN":
            return { ...state.token }

        case "SET_USER": {
            return { ...state, user: action.payload }
        }
        case "SET_TYPE_SIGNUP": {
            return { ...state, signup: { ...state.signup, type: action.payload } }
        }
        case "SET_DATA_SIGNUP": {
            return { ...state, signup: { ...state.signup, data: action.payload } }
        }
        case "SET_IMAGE_SIGNUP": {
            return { ...state, signup: { ...state.signup, image: action.payload } }
        }
        default:
            return state
    }
}