import { Input, Item, Label, Icon } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native';
/**
 * to be wrapped with redux-form Field component
 */
export default function MyTextInput(props) {
  const { meta, name, secureTextEntry, ...inputProps } = props;
  return (
    <View style={StylesInput.containerInput}>
      <View style={{ flex: 1, width: '100%' }}>
        <Item floatingLabel success={(!props.error && props.touched) && true} error={(props.error && props.touched) ? true : false}>
          <Label>{props.label}</Label>
          <Input
            {...inputProps}
            defaultValue={props.defaultValue}
            secureTextEntry={props.secureTextEntry}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText}
            value={props.value}
            textContentType={props.type}
            onBlur={props.onBlur}
            autoCompleteType={props.autoCompleteType}
            autoCapitalize={props.autoCapitalize}
          />
          {(!props.error && props.touched) && <Icon name='checkmark-circle' />}
        </Item>
        {props.error && props.touched ? <Text style={StylesInput.errorMessage}>{props.error}</Text> : null}
      </View>
    </View>
  );
}

const StylesInput = StyleSheet.create({
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginVertical: 15
  },
  label: {
    fontSize: 12,
  },
  input: {
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: '#ccc',
    color: 'black',
    height: 35,
  },
  messageError: {
    color: "red"
  },
  errorMessage: {
    color: 'red',
    fontSize: 12
  }
})