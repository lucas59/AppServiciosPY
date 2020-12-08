export const set_token = (token) => {
    return {
        type: 'SET_TOKEN',
        payload: token
    }
}

export const get_token = () => {
    return { type: 'SET_TOKEN' }
}

export const set_user = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}