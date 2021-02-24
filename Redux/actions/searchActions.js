import { SET_SEARCHES } from "../Contains"

export const ADD_SEARCH = (search) => {
    return {
        type: SET_SEARCHES,
        payload: search
    }
}