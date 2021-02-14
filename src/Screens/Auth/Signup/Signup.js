import axios from 'axios';
import React, { useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import Wizard from 'react-native-wizard';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { signupPersonal, signupStore } from '../../../Api/AuthApi';
import { uploadImage } from '../../../Api/FirebaseApi';

import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2 copy";
import StepPassword from "./Steps/Step3";
import StepMap from './Steps/StepMap';
import { Alert } from 'react-native';
import { CHANGE_CREATING_ACCOUNT } from '../../../../Redux/actions/signupActions';

export default function Signup({ navigation }) {
    const wizard = useRef(null);
    const dispatch = useDispatch();
    const [isFirstStep, setIsFirstStep] = useState();
    const [isLastStep, setIsLastStep] = useState();
    const [currentStep, setCurrentStep] = useState(0);

    const signup = useSelector(state => state.auth.signup);
    const address = useSelector(state => state.signup.address)

    const activeStep = useSelector(state => state.signup.activeStep);


    const onSubmit = async (values) => {
        dispatch(CHANGE_CREATING_ACCOUNT(true))
        var newData = signup.data;
        newData.image = signup.image;
        newData.password = values.password;
        newData.location = address;


        if (signup.data.type === 'store') {

            if (signup.data.image) {
                uploadImage(signup.data.image).then((filename) => {
                    newData.image = filename;

                    signupStore(newData)
                        .then((response) => {
                            dispatch(CHANGE_CREATING_ACCOUNT(false))
                            Alert.alert("Success");
                             navigation.replace('Login');
                        })
                        .catch(err => {
                            console.log(err);
                            // props.navigation.navigate('Main')
                        })

                })
                    .catch((err) => {
                        dispatch(CHANGE_CREATING_ACCOUNT(false))
                        console.log("ERROR");
                        Alert.alert("Error: ", err,);
                    })
            } else {
                signupStore(newData)
                    .then((response) => {
                        dispatch(CHANGE_CREATING_ACCOUNT(true))
                        Alert.alert("Success");

                        // navigation.navigate('Main');
                    })
                    .catch(err => {
                        console.log(err);
                        // props.navigation.navigate('Main')
                    })
            }

        } else {
            let formData = new FormData();

            signupPersonal(signup)
                .then((response) => {
                    console.log(response);
                    alert("Usuario")
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }




    const stepList = [
        {
            content: <Step1 navigation={navigation} wizard={wizard} />,
        },
        {
            content: <Step2 wizard={wizard} />
        },
        {
            content: <StepMap wizard={wizard} />
        },
        {
            content: <StepPassword onSubmit={onSubmit} navigation={navigation} wizard={wizard} />
        },
    ]

    return (
        <Wizard
            ref={wizard}
            activeStep={activeStep}
            contentContainerStyle={styles.container}
            steps={stepList}
            isFirstStep={val => setIsFirstStep(val)}
            isLastStep={val => setIsLastStep(val)}
            onNext={() => {
                console.log("Next Step Called");
            }}
            onPrev={() => {
                console.log("Previous Step Called");
            }}
            currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                setCurrentStep(currentStep)
            }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
