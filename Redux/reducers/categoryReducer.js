import { SET_CATEGORIES } from "../Contains"
import categories from '../../src/Utils/Constans/Categories.json';
const initialState = {
    categories: categories,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return { ...state, categories: action.payload }
        default:
            return state
    }
}