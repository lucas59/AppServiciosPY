import * as firebase from 'firebase';

export const uploadImage = (path) => {
    return new Promise(async (res, rej) => {
        console.log('Upload image');
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
    })
}   