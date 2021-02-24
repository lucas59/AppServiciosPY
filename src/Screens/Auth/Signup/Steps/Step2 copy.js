import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DATA_SIGNUP } from '../../../../../Redux/actions/authActions';
import { SET_STEP } from '../../../../../Redux/actions/signupActions';
import ClientForm from '../Forms/ClientForm';
import StoreForm from '../Forms/StoreForm';

function Step2(props) {
    const dispatch = useDispatch();
    const signupState = useSelector(state => state.auth.signup.data);
    const onSubmit = (values) => {
        let newData = values;
        newData.type = signupState.type;
        
        dispatch(SET_DATA_SIGNUP(newData));
        if (signupState.type === "personal") {
            dispatch(SET_STEP(3))
            props.wizard.current.next();
        } else {
            props.wizard.current.next();
        }
    }
    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
            {
                signupState.type === "personal" ? (
                    <ClientForm wizard={props.wizard} onSubmit={onSubmit} />
                ) : (
                        <StoreForm wizard={props.wizard} onSubmit={onSubmit} />
                    )
            }
        </KeyboardAwareScrollView>
    )
}

export default Step2;