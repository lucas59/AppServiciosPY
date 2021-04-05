import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button as ButtonRN } from 'react-native'
import MyTextInput from './MyTextInput';
import React, { useState } from 'react';
import { StyleGenerals } from '../../../../Utils/Styles/StylesGenerals';
import { Button } from 'react-native-elements';
import { StylesButtons } from '../../../../Utils/Styles/StylesButtons';
import { useFormik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import { Errors } from 'react-redux-form/native';

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Requerido"
  } else if (! /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)) {
    errors.email = "Correo invalido";
  }

  if (!values.name) {
    errors.name = "Requerido"
  }
  if (!values.surname) {
    errors.surname = "Requerido"
  }
  if (!values.phone) {
    errors.phone = "Requerido"
  }

  return errors;
}

function ClientForm(props) {
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      phone: ''
    },
    onSubmit: values => props.onSubmit(values),
    validate
  });

  return (
    <View style={StyleGenerals.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../../../../../assets/icons/user.png")} />
        <Text>Datos de usuario</Text>
      </View>

      <View style={styles.form}>
        <MyTextInput
          placeholder="Nombre"
          onChangeText={formik.handleChange('name')}
          value={formik.values.name}
          error={formik.errors.name}
          onBlur={formik.handleBlur('name')}
          touched={formik.touched.name}
          autoCompleteType={'name'}
          type={"name"}
        />

        <MyTextInput
          placeholder="Apellido*"
          onChangeText={formik.handleChange('surname')}
          value={formik.values.surname}
          error={formik.errors.surname}
          onBlur={formik.handleBlur('surname')}
          touched={formik.touched.surname}
          autoCompleteType={'name'}
          type={"name"}
        />

        <MyTextInput
          placeholder="Correo*"
          onChangeText={formik.handleChange('email')}
          value={formik.values.email}
          error={formik.errors.email}
          onBlur={formik.handleBlur('email')}
          touched={formik.touched.email}
          type={"emailAddress"}
          autoCompleteType={'email'}
        />

        <MyTextInput
          placeholder="Celular*"
          onChangeText={formik.handleChange('phone')}
          value={formik.values.phone}
          error={formik.errors.phone}
          onBlur={formik.handleBlur('phone')}
          touched={formik.touched.phone}
          autoCompleteType={'tel'}
          type={"telephoneNumber"}
        />
      </View>

      <View style={styles.options}>
        <ButtonRN title="Volver" onPress={() => props.wizard.current.prev()}></ButtonRN>
        <Button buttonStyle={StylesButtons.buttonSuccess} title="Siguiente" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
}


export default ClientForm;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 50,
    color: 'black',
    fontWeight: 'bold',
  },
  next: {
    width: 300,
    height: 50,
    borderRadius: 50,
  },
  form: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    flexDirection: 'column-reverse',
    flex: 1,
    justifyContent: 'center'
  },
  next: {
    width: 300
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginVertical: 5,
    borderRadius: 100
  },
  formInput: {
    width: 300,
    height: 50
  },
  firstInput: {
    width: 300,
    height: 60,
    borderWidth: 1
  }
})

