import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { Image } from 'react-native'
import { Button } from 'react-native'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { SearchBar, Button as ButtonRE, Icon } from 'react-native-elements'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import MapView from 'react-native-maps'
import { add } from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { SET_DATA_SIGNUP } from '../../../../../Redux/actions/authActions'
import { CHANGE_ADDRESS, CHANGE_REGION, CHANGE_SEARCH_REGION, CHANGE_SHOW_CONFIRM_MAP } from '../../../../../Redux/actions/signupActions'
import { GeocodeAddress, GeocodePosition } from '../../../../Utils/Location/Location'
import ModalConfirmMap from './ModalConfirmMap'

function StepMap(props) {
    const [region, setRegion] = useState(null);
    const signup = useSelector(state => state.auth.signup.data)
    const [heigthMap, setHeigthMap] = useState(0)
    const search = useSelector(state => state.signup.searchRegion)

    const pointHeigth = parseInt(heigthMap, 10) / 2 - 50;
    const [init, setInit] = useState(false);
    const [loading, setloading] = useState(false);
    const [initialAddress, setinitialAddress] = useState(null);
    const dispatch = useDispatch();


    const delayDebounceFn = () => {
        setloading(true);
        let ref = searchTerm + ", " + initialAddress.country;
        console.log(ref);
        GeocodePosition(ref).then((positions) => {
            setloading(false);
            setRegion(positions[0])
        })
            .catch((err) => {
                console.log(err);
            })
        // Send Axios request here

    };

    const handlelocation = (region) => {
        console.log("REGION: ", region);
        setRegion(region);
        GeocodeAddress(region).then(address => { //find my location
            dispatch(CHANGE_REGION(region));
            const streetNumber = address[0].name.split(" ").pop();
            address[0].streetNumber = streetNumber;
            
            dispatch(CHANGE_ADDRESS(address[0]));
            dispatch(CHANGE_SEARCH_REGION(address[0].name))
        })
            .catch(err => {
                console.log(err);
            })
    }


    const findMyLocation = () => {
        navigator.geolocation.getCurrentPosition((location) => {
            location.coords.longitudeDelta = 0.0010;
            location.coords.latitudeDelta = 0.0010;
            setRegion(location.coords);
        }, err => {
            console.log(err);
        });
    }

    const goToNext = () => {
        let newData = signup;

        let position = {
            latitude: region.latitude,
            longitude: region.longitude
        }

        newData.position = position;

        dispatch(SET_DATA_SIGNUP(newData));
        props.wizard.current.next()
    }

    const changeSearchTerm = (text) => {
        dispatch(CHANGE_SEARCH_REGION(text))
    }



    useEffect(() => {
        if (!init) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                let region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.000,
                    longitudeDelta: 0.0020
                }

                GeocodeAddress(region).then((address) => {
                    console.log("Init", address);
                    dispatch(CHANGE_ADDRESS(address[0]));
                })

                setRegion(region);
                setInit(true);
            })
        }
    }, [])

    const onPreConfirm = () => {
        dispatch(CHANGE_SHOW_CONFIRM_MAP(true))
    }

    return (
        <View style={styles.container}>
            <SearchBar
                round
                lightTheme={true}
                placeholder="Busqueda"
                value={search}
                searchIcon={null}
                style={{ textAlign: 'center', marginTop: 10 }}
                leftIcon={null}
                onChangeText={(text) => changeSearchTerm(text)}
                onBlur={delayDebounceFn}
                showLoading={loading}
                round={true}
                containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, height: 20 }}
                inputContainerStyle={{ backgroundColor: 'white' }}
                autoCompleteType="street-address"
            />

            {/*address.length > 0 && (
                <FlatList maxToRenderPerBatch={3} initialNumToRender="3" style={styles.listLocations} data={address} renderItem={({ item, index }) => {
                    if (index < 3) {
                        return (
                            <TouchableOpacity onPress={()=>onSubmitItem(item)} style={styles.item}>
                                <Text>{item.name}, {item.city} {item.country}</Text>
                            </TouchableOpacity>
                        )
                    }
                }} />
            )*/}

            <MapView
                minDelta={0.002}
                minZoomLevel={3}
                initialRegion={{ latitude: -32.317472, longitude: -58.080229, latitudeDelta: 0.002, longitudeDelta: 0.002 }}
                onLayout={(e) => {
                    const { height } = e.nativeEvent.layout;
                    setHeigthMap(height)
                }}

                region={region}
                showsUserLocation={true}
                style={styles.map}
                onRegionChangeComplete={(newRegion) => {
                    if (region) {
                        handlelocation(newRegion);
                    }
                }}
            >


                <Image
                    style={{
                        width: 40,
                        height: 40,
                        position: "absolute",
                        top: pointHeigth,
                        resizeMode: 'stretch'
                    }}
                    source={require("../../../../../assets/icons/location.png")}

                />

            </MapView>
            <View style={{
                position: 'absolute',
                top: 0,
                flexDirection: 'row',
                width: '100%',
                height: "30%",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                paddingHorizontal: 20
            }}>

                <TouchableOpacity onPress={findMyLocation}>
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: 'stretch'
                        }}
                        source={require("../../../../../assets/icons/mylocation.png")} />
                </TouchableOpacity>
            </View>

            <View style={styles.options}>
                <Button onPress={() => props.wizard.current.prev()} title="Atras" />
                <ButtonRE onPress={onPreConfirm} buttonStyle={styles.buttonPrimary} title="Colocar" />
            </View>


            <ModalConfirmMap goToNext={goToNext} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 30
    },
    bar: {
        borderWidth: 1
    },
    map: {
        width: Dimensions.get('window').width,
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    options: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        zIndex: 1000
    },
    buttonPrimary: {
        backgroundColor: '#20DA79',
        borderRadius: 100,
        paddingHorizontal: 20
    },
    listLocations: {
        marginVertical: 5,
        zIndex: 1000,
        position: 'absolute',
        width: "100%",
        top: 80,
        backgroundColor: 'white',
        paddingVertical: 10
    },
    gps: {
        width: 30,
        height: 30,
        resizeMode: "cover"
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        justifyContent: 'center',
        alignItems: 'center',
        height: 30
    }
})

export default StepMap
