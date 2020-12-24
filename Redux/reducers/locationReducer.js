export default (state = {}, action) => {
    switch (action.type) {
        case "SET_REGION":
            return { ...state, region: action.payload }
        default:
            return state
    }
}