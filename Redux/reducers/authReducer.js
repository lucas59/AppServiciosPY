export default (state = {}, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.payload }
        case "GET_TOKEN":
            return { ...state.token }

        case "SET_USER": {
            return { ...state, user: action.payload }
        }
        default:
            return state
    }
}