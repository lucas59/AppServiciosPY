const initialState = {
    tagSelected: { id: 0, title: 'Todos', icon: "globe" },
    tags: [{ id: 0, title: 'Todos', icon: "globe" }]
}
export default (state = initialState, action) => {
    switch (action.type) {
        case "SET_TAG_SHOW":
            return { ...state, tagSelected: action.payload }
        case "SET_TAGS":
            return { ...state, tags: initialState.tags.concat(action.payload) }
        default:
            return state
    }
}