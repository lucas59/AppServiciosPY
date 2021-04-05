const initialState = {
    stores: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_SERVICES":
            return { ...state, services: action.payload }
        case "SET_STORE_SHOW":
            return { ...state, store: action.payload }

        default:
            return state
    }
}