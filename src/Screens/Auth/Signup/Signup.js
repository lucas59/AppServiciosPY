import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Wizard from 'react-native-wizard';

import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

export default function Signup() {
    const wizard = useRef(null);
    const [isFirstStep, setIsFirstStep] = useState();
    const [isLastStep, setIsLastStep] = useState();
    const [currentStep, setCurrentStep] = useState(0)
    const stepList = [
        {
            content: <Step1 wizard={wizard} />,
        },
        {
            content: <Step2 wizard={wizard} />
        },
        {
            content: <Step3 wizard={wizard} />
        },
    ]

    return (
            <Wizard
                ref={wizard}
                activeStep={0}
                contentContainerStyle={styles.container}
                steps={stepList}
                isFirstStep={val => setIsFirstStep(val)}
                isLastStep={val => setIsLastStep(val)}
                onNext={() => {
                    console.log("Next Step Called")
                }}
                onPrev={() => {
                    console.log("Previous Step Called")
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
        justifyContent: 'center',
    }
})
