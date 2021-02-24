import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { StylesInput } from '../../../../Utils/Styles/StylesInput';

/**
 * to be wrapped with redux-form Field component
 */
export default function MyTextInput(props) {
  const { meta, name, secureTextEntry, ...inputProps } = props;
  return (
    <View style={StylesInput.containerInput}>
      <TextInput
        {...inputProps}
        defaultValue={props.defaultValue}
        style={StylesInput.input}
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        textContentType={props.type}
        onBlur={props.onBlur}
        autoCompleteType={props.autoCompleteType}
        autoCapitalize={props.autoCapitalize}
      />
      {props.error && props.touched ? <Text style={StylesInput.errorMessage}>{props.error}</Text> : null}
    </View>
  );
}
