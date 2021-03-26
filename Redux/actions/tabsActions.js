import { SET_TAB } from '../Contains'
export const CHANGE_TAB = (tab) => {
    return {
        type: SET_TAB,
        payload: tab
    }
}