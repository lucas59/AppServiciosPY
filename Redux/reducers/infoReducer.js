export default (state = {}, action) => {
    switch (action.type) {
        case "SET_STORE_SHOW":
            return { ...state, store: action.payload }
        default:
            return state
    }
}