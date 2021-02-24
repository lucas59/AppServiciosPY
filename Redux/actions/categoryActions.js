import { SET_CATEGORIES } from "../Contains"

export const set_categories = (categories) => {
    return {
        type: SET_CATEGORIES,
        payload: categories
    }
}
