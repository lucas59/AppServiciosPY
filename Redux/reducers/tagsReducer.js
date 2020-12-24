const initialState = {
    tagSelected: null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_TAG_SHOW":
            return { ...state, tagSelected: action.payload }
        default:
            return state
    }
}