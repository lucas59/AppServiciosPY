import Axios from "axios"
import { CHECK_USER, LOGIN, SIGNUP, USER_ME } from "../Utils/Config"

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
        Axios.post(SIGNUP, data)
            .then((response) => {
                res(response)
            })
            .catch((err) => {
                req(err)
            })
    })
}

export function checkEmail(email) {
    return new Promise((res, req) => {
        Axios.post((CHECK_USER), {
            email: email,
        })
            .then((response) => {
                res(response)
            })
            .catch((err) => {
                req(err)
            })
    })
}


export function getSession(token) {
    return new Promise((res, req) => {
        Axios.post((USER_ME), {
            token: token,
        })
            .then((response) => {
                res(response)
            })
            .catch((err) => {
                req(err)
            })
    })
}