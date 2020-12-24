import Axios from "axios"
import { STORES, TAGS } from "../Utils/Config"

export function getStores() {
    return new Promise((res, req) => {
        Axios.get(STORES, {
            withCredentials: true,
        })
            .then((response) => res(response))
            .catch((err) => req(err))
    })
}

export function getTags() {
    return new Promise((res, req) => {
        Axios.get(TAGS, {
            withCredentials: true
        })
            .then((response) => res(response))
            .catch(err => req(err))
    })
}