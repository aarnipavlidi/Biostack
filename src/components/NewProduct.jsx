// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { Alert, Pressable, Text, StyleSheet, View, Image } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import DropDownPicker from 'react-native-dropdown-picker';
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.

import useCreateNewProduct from '../hooks/useCreateNewProduct'; // Import "useCreateNewProduct" hook from "useCreateNewProduct.js" file for this component usage.
import FormikTextInput from './FormikTextInput'; // Import "FormikTextInput" component from "FormikTextInput.jsx" for this component usage.
import { Field, Formik } from 'formik'; // Import "Formik" component from "formik" libary's content for this component usage.
import * as yup from 'yup'; // Import everything as "yup" from "yup" libary's content for this component usage.

import styling from '../styling'; // Import "styling" variable from "styling.js" for this component usage.

const newItemContainer = StyleSheet.create({
  mainContainer: {
    backgroundColor: styling.colors.VistaWhite,
    flexGrow: 1,
  },
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
  },
  appBarContent: {
    color: styling.colors.VistaWhite
  }
});

const dropdownContainer = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  options: {
    width: '75%',
  }
});

// Define "buttonContainer" variable, which will be used for styling
// buttons "container" after input fields.
const buttonContainer = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContent: {
    flexGrow: 1,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    height: 40,
    backgroundColor: styling.colors.Asphalt,
    borderWidth: 3,
    borderColor: styling.colors.Asphalt,
  },
  buttonContentText: {
    marginTop: 5,
    textAlign: 'center',
    color: styling.colors.VistaWhite
  },
});

// Define "initialValues" variable, which will get inside of {...}
// objects values as default (''). Which means, if user wants to
// submit form without changing any input fields, these objects
// will get those default values and passed to database. But
// because we have validation setupped, that won't be possible! :)
const initialValues = {
  productTitle: '',
  productDescription: '',
  productSize: '',
  productPrice: '',
};

// Define "createProductFormValidationSchema" variable, which will execute
// validation via "yup" variable, when user wants to create new product to
// the app. If some of the input fields don't match with required condition,
// then function will return "error message" under of that current input field.
const createProductFormValidationSchema = yup.object().shape({
  productTitle: yup
    .string()
    .min(5, 'Title has to be minimum of 5 characters.')
    .required('Title for your item is required.'),
  productDescription: yup
    .string()
    .min(5, 'Description has to be minimum of 5 characters.')
    .required('Description for your item is required.'),
  productSize: yup
    .string()
    .uppercase()
    .matches(/(XS|S|M|L|XL|XXL)/, { message: 'We support unfortunately following sizes only: XS, S, M, L, XL and XXL.', excludeEmptyString: false })
    .max(3, 'Size can be only maximum of 3 characters.')
    .required('Size for your item is required.'),
  productPrice: yup
    .string()
    .min(1, 'Price has to be minimum of 1 character.')
    .required('Price for your item is required.'),
});

const NewProductForm = ({ onSubmit }) => {

  // Component will render everything inside of (...) back to the user.
  return (
    <View>
      <FormikTextInput name="productTitle" placeholder="Please enter title for your item." />
      <FormikTextInput name="productDescription" placeholder="Please enter description for your item." />
      <FormikTextInput name="productSize" placeholder="Please enter size for your item." />
      <FormikTextInput name="productPrice" placeholder="Please enter price for your item." />
      <View style={buttonContainer.container}>
        <Pressable style={buttonContainer.buttonContent} onPress={onSubmit}>
          <Text style={buttonContainer.buttonContentText}>Create an item</Text>
        </Pressable>
      </View>
    </View>
  );
};

const NewProduct = ({ currentUserData }) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'T-shirt', value: 't-shirt', icon: () => <Image source={require('../../assets/icons/clothes/t-24x24-455076.png')} />},
    {label: 'Sweater', value: 'sweater', icon: () => <Image source={require('../../assets/icons/clothes/sweater-24x24-455072.png')} />}
  ]);

  const [submitNewProduct] = useCreateNewProduct(); // Define "submitNewProduct" variable from => "useCreateNewProduct(...)" hook.
  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "goBackPreviousRoute" variable, which will execute everything inside
  // of {...}. When app will render this component, user can choose to go back
  // previous route where user was. If for example user came from "Home", then
  // this function will redirect user to => "/dashboard" path when referenced.
  const goBackPreviousRoute = () => {
    history.goBack();
  };

  const onSubmit = async (values) => {

    const { productTitle, productDescription, productSize, productPrice } = values;

    const owner = currentUserData._id;
    const productGroupName = value;

    try {
      const { data } = await submitNewProduct({ productTitle, productDescription, productSize, productPrice, productGroupName, owner })
      history.push("/dashboard"); // Redirect user to "/dashboard" after adding new product successfully.
    } catch (error) { // If there is a problem at "try" section, then "Alert" component will be rendered.
      Alert.alert(
        "Biostack",
        `${error}`,
        [
          {
            text: "BACK",
            style: "cancel"
          },
        ]
      );
    };
  };

  const handleMore = () => console.log("Show more settings from this component!");

  // Component will render everything inside of (...) back to the user.
  return (
    <View style={newItemContainer.mainContainer}>
      <Appbar.Header statusBarHeight={0} style={newItemContainer.appBarContainer}>
        <Appbar.BackAction onPress={goBackPreviousRoute} />
        <Appbar.Content titleStyle={newItemContainer.appBarContent} title="Add new item to the app" subtitle="Please fill all the required fields." subtitleStyle={newItemContainer.appBarContent} />
        <Appbar.Action icon="dots-vertical" onPress={handleMore} />
      </Appbar.Header>
      <View style={dropdownContainer.container}>
        <DropDownPicker
          showBadgeDot={true}
          placeholder='Please choose a product group first.'
          style={{ backgroundColor: styling.colors.VistaWhite }}
          containerStyle={dropdownContainer.options}
          dropDownContainerStyle={{ backgroundColor: styling.colors.VistaWhite }}
          value={value}
          items={items}
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={createProductFormValidationSchema}>
        {({ handleSubmit }) => <NewProductForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

// Export "NewProduct" component, so other components like "App.js" are able to use this hooks's content.
export default NewProduct;
