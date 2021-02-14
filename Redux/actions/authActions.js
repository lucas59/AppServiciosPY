export const set_token = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}

export const get_token = () => {
    return { type: 'SET_TOKEN' }
}

export const SET_USER = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

/////--------------SIGNUP----------------------

export const SET_TYPE_SIGNUP = (type) => {
    return {
        type: 'SET_TYPE_SIGNUP',
        payload: type
    }
}
export const SET_DATA_SIGNUP = (data) => {
    return {
        type: 'SET_DATA_SIGNUP',
        payload: data
    }
}

export const SET_IMAGE_SIGNUP = (url) => {
    return {
        type: 'SET_IMAGE_SIGNUP',
        payload: url
    }
}
