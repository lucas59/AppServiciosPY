const initialState = {
    userOptionsPanel: false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_OPTIONS_PANEL_SHOW":
            return { ...state, userOptionsPanel: action.payload }
        default:
            return state
    }
}