import Axios from "axios"
import { LOGIN } from "../Utils/Config"

export function login(data) {
    return new Promise((res, req) => {
        Axios.post(LOGIN, data)
            .then((response) => {
                res(response)
            })
            .catch((err) => {
                req(err)
            })
    })
}

export function signup(data) {
    return new Promise((res, req) => {
        Axios.post((LOGIN), {
            user: user,
            password: password
        })
    })
}