import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button as ButtonRN } from 'react-native'
import MyTextInput from './MyTextInput';
import { StyleGenerals } from '../../../../Utils/Styles/StylesGenerals';
import { Button } from 'react-native-elements';
import { StylesButtons } from '../../../../Utils/Styles/StylesButtons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { SET_IMAGE_SIGNUP } from '../../../../../Redux/actions/authActions';
import { useFormik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import { Dimensions } from 'react-native';

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
  if (!values.phone) {
    errors.phone = "Requerido"
  }
  return errors;
}

function StoreForm(props) {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories)
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      web: '',
      description: '',
      category: ''
    },
    onSubmit: values => props.onSubmit(values),
    validate
  });


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
    });

    setImage(result.uri);
    dispatch(SET_IMAGE_SIGNUP(result.uri));
  }
  
  return (
    <View style={StyleGenerals.container}>
      <View style={styles.header}>
        {image ?
          <Image source={{ uri: image }} style={styles.image} />
          :
          <Image style={styles.logo} source={require("../../../../../assets/icons/locals.png")} />
        }
        <Text>Datos de comercio</Text>
        <ButtonRN title="Elegir mí foto" onPress={() => pickImage()} />
      </View>

      <View style={styles.form}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', width: Dimensions.get('window').width }}>
          <MyTextInput
            placeholder="Nombre"
            onChangeText={formik.handleChange('name')}
            value={formik.values.name}
            error={formik.errors.name}
            onBlur={formik.handleBlur('name')}
            touched={formik.touched.name}
            type={'name'}
            autoCompleteType={'name'}
          />

          <MyTextInput
            placeholder="Correo*"
            onChangeText={formik.handleChange('email')}
            value={formik.values.email}
            type={"emailAddress"}
            error={formik.errors.email}
            onBlur={formik.handleBlur('email')}
            touched={formik.touched.email}
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

          <MyTextInput
            placeholder="Web"
            onChangeText={formik.handleChange('web')}
            value={formik.values.web}
            error={formik.errors.web}
            onBlur={formik.handleBlur('web')}
            touched={formik.touched.web}
            type={"URL"}
            autoCompleteType={'URL'}
            type={"URL"}
            autoCapitalize={'none'}
          />

          <MyTextInput
            placeholder="Descripción"
            onChangeText={formik.handleChange('description')}
            value={formik.values.description}
            error={formik.errors.description}
            onBlur={formik.handleBlur('description')}
            touched={formik.touched.description}
          />

          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Categoría" }}
            onValueChange={formik.handleChange('category')}
            items={categories}
            
          />
        </ScrollView>
      </View>
      <View style={styles.options}>
        <ButtonRN title="Volver" onPress={() => console.log(props.wizard.current.prev())}></ButtonRN>
        <Button buttonStyle={StylesButtons.buttonSuccess} title="Siguiente" onPress={formik.handleSubmit} />
      </View>
    </View>
  );
}


export default StoreForm;



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
    justifyContent: "center",
    alignItems: 'center'
  },
  options: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  next: {
    width: 300
  },
  header: {
    justifyContent: 'center',
    flex: 2,
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
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '90%',
    marginRight: 'auto',
    marginLeft: 'auto',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon,
  },
  inputAndroid: {
    width: '90%',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});