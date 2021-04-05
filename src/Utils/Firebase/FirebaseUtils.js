import * as firebase from 'firebase';

export const getDownloadUrl = (imageName) => {
    return new Promise((res, rej) => {
        var ref = firebase.storage().ref().child('images/' + imageName);
        ref.getDownloadURL()
            .then((urlDownload) => {
                res(urlDownload);
            })
            .catch((err) => {
                rej(err)
            })
    })
}

export const uploadImage = (path) => {
    return new Promise(async (res, rej) => {
        if (path) {
            const response = await fetch(path);
            const blob = await response.blob();
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            let filename = blob['_data'].name + '-' + uniqueSuffix + '.' + blob['_data'].type.split("/")[1];
            var ref = firebase.storage().ref().child('images/' + filename);
            ref.put(blob).then((val) => {
                console.log(val);
                res(filename)
            })
                .catch((err) => {
                    console.log(err);
                    rej()
                })
        } else { //si no existe retorno null
            res(null)
        }
    })
}