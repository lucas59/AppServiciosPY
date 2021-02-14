import { SET_STEP_SIGNUP, SET_SHOW_CONFIRM_MAP, SET_REGION, SET_ADDRESS, SET_SEARCH_REGION, SET_CREATING_ACCOUNT } from "../Contains"

export const SET_STEP = (step) => {
    return {
        type: SET_STEP_SIGNUP,
        payload: step
    }
}

export const CHANGE_SHOW_CONFIRM_MAP = (value) => {
    return {
        type: SET_SHOW_CONFIRM_MAP,
        payload: value
    }
}
export const CHANGE_REGION = (region) => {
    return {
        type: SET_REGION,
        payload: region
    }
}
export const CHANGE_ADDRESS = (region) => {
    return {
        type: SET_ADDRESS,
        payload: region
    }
}
export const CHANGE_SEARCH_REGION = (search) => {
    return {
        type: SET_SEARCH_REGION,
        payload: search
    }
}

export const CHANGE_CREATING_ACCOUNT = (value) => {
    return {
        type: SET_CREATING_ACCOUNT,
        payload: value
    }
}
