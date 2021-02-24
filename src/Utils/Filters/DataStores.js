export const searchTermInStores = (term, stores) => {
    return new Promise((res, resj) => {
        let returnArray = [];

        for (let index = 0; index < stores.length; index++) {
            const store = stores[index];

            if (store.name.toLowerCase().includes(term.toLowerCase()) || store.description.toLowerCase().includes(term.toLowerCase()) || store.user.email.toLowerCase().includes(term.toLowerCase())) {
                returnArray.push(store);
            }
            if (index === stores.length - 1) {
                res(returnArray)
            }
        }

    })
}