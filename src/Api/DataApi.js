import Axios from "axios"
import { STORES } from "../Utils/Config"

export function getStores() {
    return new Promise((res, req) => {
        Axios.get(STORES, {
            withCredentials: true,
        })
            .then((response) => res(response))
            .catch((err) => req(err))
    })
}