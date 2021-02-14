import * as Location from 'expo-location';

export const GeocodePosition = (address) => {
    return new Promise((res, rej) => {
        Location.enableNetworkProviderAsync()
        Location.geocodeAsync(address,{}).then((region) => {
            console.log(region);
            res(region)
        })
            .catch((err) => {
                console.log(err);
                rej(err)
            })
    })
}



export const GeocodeAddress = (location) => {
    return new Promise((res, rej) => {
        var NY = {
            latitude: location.latitude,
            longitude: location.longitude
        };
        Location.setGoogleApiKey('AIzaSyBA2QqK0Aw7B8rRwo4FOBJa6k7DdLvfQ-g');
        Location.reverseGeocodeAsync(NY, { useGoogleMaps: true }).then((value) => {
            res(value)
        })
            .catch(err => {
                console.log(err);
            })
    })
}
