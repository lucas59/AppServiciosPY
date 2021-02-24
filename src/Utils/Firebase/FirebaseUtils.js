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