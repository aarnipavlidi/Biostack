// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react'; // Import "react" library's content for this component usage.
import { useHistory } from 'react-router-native'; // Import following functions from "react-router-native" library's content for this component usage.
import { Alert, Pressable, Text, StyleSheet, View, Image } from 'react-native'; // Import following components from "react-native" library for this component usage.
import { Appbar, Button, RadioButton } from 'react-native-paper'; // Import following components from "react-native-paper" library for this component usage.
import DropDownPicker from 'react-native-dropdown-picker';

import useCreateNewProduct from '../../hooks/useCreateNewProduct'; // Import "useCreateNewProduct" hook from "useCreateNewProduct.js" file for this component usage.
import FormikTextInput from '../FormikTextInput'; // Import "FormikTextInput" component from "FormikTextInput.jsx" for this component usage.
import { Field, Formik } from 'formik'; // Import "Formik" component from "formik" libary's content for this component usage.
import * as yup from 'yup'; // Import everything as "yup" from "yup" libary's content for this component usage.

import styling from '../../styling'; // Import "styling" variable from "styling.js" for this component usage.

const newItemContainer = StyleSheet.create({
  mainContainer: {
    backgroundColor: styling.colors.VistaWhite,
    flexGrow: 1,
  },
  appBarContainer: {
    backgroundColor: styling.colors.Asphalt,
  },
  appBarContent: {
    color: styling.colors.VistaWhite,
    fontFamily: 'PermanentMarker_400Regular',
  },
});

// Define "dropdownContainer" variable, which will be used for styling
// "dropdown" element, which has diffent "item types" to choose from.
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

const productSizeContainer = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBackground: {
    backgroundColor: styling.colors.Asphalt,
    borderRadius: 25 / 2
  },
  titleContent: {
    color: styling.colors.VistaWhite,
    padding: 8,
  },
  valueBox: {
    flexDirection: 'row',
  },
  valueOption: {
    alignItems: 'center'
  },
});

// Define "buttonContainer" variable, which will be used for styling
// buttons "container" after input fields.
const buttonContainer = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    width: '90%'
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
  productPrice: yup
    .string()
    .min(1, 'Price has to be minimum of 1 character.')
    .required('Price for your item is required.'),
});


const NewProductForm = ({ currentItemType, currentItemSize, onSubmit, loading }) => {

  // Define "preventSubmit" variable, which will be equal to either "false" or
  // "true" value. Variable idea is to prevent the user press "Create an item"
  // button, if the user has not chosen "item type" or "size" option. So once
  // user has chosen both options, then "preventSubmit" will be equal to "false" value,
  // which means button will be "pressable" to the user.
  const preventSubmit = currentItemType && currentItemSize ? false : true;

  // Define "buttonText" variable, which will execute everything inside of {...},
  // and return text into button => based on if user has selected both payment
  // and delivery option or not. If user (by default) has not chosen any option
  // values, then function will return "Choose shipping & payment" text and
  // otherwise will return "Buy an item" text.
  const buttonText = () => {
    if (currentItemType && currentItemSize) {
      return (
        <Text style={{ color: styling.colors.VistaWhite }}>Create an item</Text>
      )
    } else {
      return (
        <Text style={{ color: styling.colors.VistaWhite }}>Choose item type & size</Text>
      )
    };
  };

  // Component will render everything inside of (...) back to the user.
  return (
    <View>
      <FormikTextInput name="productTitle" placeholder="Please enter title for your item." />
      <FormikTextInput name="productDescription" placeholder="Please enter description for your item." />
      <FormikTextInput name="productPrice" placeholder="Please enter price for your item." />
      <View style={buttonContainer.container}>
        <Button style={buttonContainer.button} color={styling.colors.Asphalt} disabled={preventSubmit} loading={loading} mode="contained" onPress={onSubmit}>
          {buttonText()}
        </Button>
      </View>
    </View>
  );
};

// Define "NewProduct" component, which will execute everything inside of {...}, component handles
// all the logic when user wants to add new item to the app. User types required input fields with
// given values and those values we can get from "values" variable, so we are able to make mutation
// via function called => "submitNewProduct(...)" with given parameter values.
const NewProduct = ({ currentUserData }) => {

  const [open, setOpen] = useState(false); // Define variable "open" into state, which gets value "false" as default.
  const [value, setValue] = useState(null); // Define variable "value" into state, which gets value "null" as default.
  // Define variable "items" into state, which gets inside of array different set
  // of values. These values are being used on a dropdown, where user can choose
  // which "type" matches the best of the item user wants to sell on the app.
  const [items, setItems] = useState([
    {label: 'T-shirt', value: 't-shirt', icon: () => <Image source={require('../../../assets/icons/clothes/t-24x24-455076.png')} />},
    {label: 'Sweater', value: 'sweater', icon: () => <Image source={require('../../../assets/icons/clothes/sweater-24x24-455072.png')} />},
    {label: 'Hoodie', value: 'hoodie', icon: () => <Image source={require('../../../assets/icons/clothes/hoodie-24x24-455064.png')} />},
    {label: 'Jacket', value: 'jacket', icon: () => <Image source={require('../../../assets/icons/clothes/jacket-24x24-455063.png')} />},
    {label: 'Hat', value: 'hat', icon: () => <Image source={require('../../../assets/icons/clothes/hat-24x24-455060.png')} />},
  ]);

  const [currentSize, setCurrentSize] = useState(null); // Define variable "currentSize" into state, which gets value "null" as default.

  const [submitNewProduct, { loading }] = useCreateNewProduct(); // Define "submitNewProduct" variable from => "useCreateNewProduct(...)" hook.
  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define variable "onSubmit", which will execute everything inside of {...},
  // when function is being referenced. When user is trying to add new product
  // to the app, function will try execute mutation via "submitNewProduct(...)"
  // function and if adding new item failed (error) then we will let the user
  // know about it via "Alert" component and render "error" variable message.
  const onSubmit = async (values) => {

    const { productTitle, productDescription, productPrice } = values; // Define variables inside of {...}, which are equal to "values" variable.

    const owner = currentUserData._id; // Define variable "owner", which is equal to "currentUserData._id" variable.
    const productGroupName = value; // Define variable "productGroupName", which is equal to "value" variable.
    const productSize = currentSize; // Define variable "productSize", which is equal to "currentSize" variable.

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

  // Component will render everything inside of (...) back to the user.
  return (
    <View style={newItemContainer.mainContainer}>
      <Appbar.Header statusBarHeight={0} style={newItemContainer.appBarContainer}>
        <Appbar.Content titleStyle={newItemContainer.appBarContent} title="Sell your clothes here" />
        <Appbar.Action icon="cards-heart" />
      </Appbar.Header>
      <View style={dropdownContainer.container}>
        <DropDownPicker
          showBadgeDot={true}
          placeholder='Product Type'
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
      <View style={productSizeContainer.container}>
        <View style={productSizeContainer.titleBox}>
          <View style={productSizeContainer.titleBackground}>
            <Text style={productSizeContainer.titleContent}>Product Size</Text>
          </View>
        </View>
        <View>
          <View style={productSizeContainer.valueBox}>
            <View style={productSizeContainer.valueOption}>
              <View>
                <Text>XS</Text>
              </View>
              <View>
                <RadioButton
                  value="XS"
                  color={styling.colors.Asphalt}
                  status={currentSize === 'XS' ? 'checked' : 'unchecked'}
                  onPress={() => setCurrentSize('XS')}
                />
              </View>
            </View>
            <View style={productSizeContainer.valueOption}>
              <View>
                <Text>S</Text>
              </View>
              <View>
                <RadioButton
                  value="S"
                  color={styling.colors.Asphalt}
                  status={currentSize === 'S' ? 'checked' : 'unchecked'}
                  onPress={() => setCurrentSize('S')}
                />
              </View>
            </View>
            <View style={productSizeContainer.valueOption}>
              <View>
                <Text>M</Text>
              </View>
              <View>
                <RadioButton
                  value="M"
                  color={styling.colors.Asphalt}
                  status={currentSize === 'M' ? 'checked' : 'unchecked'}
                  onPress={() => setCurrentSize('M')}
                />
              </View>
            </View>
            <View style={productSizeContainer.valueOption}>
              <View>
                <Text>L</Text>
              </View>
              <View>
                <RadioButton
                  value="L"
                  color={styling.colors.Asphalt}
                  status={currentSize === 'L' ? 'checked' : 'unchecked'}
                  onPress={() => setCurrentSize('L')}
                />
              </View>
            </View>
            <View style={productSizeContainer.valueOption}>
              <View>
                <Text>XL</Text>
              </View>
              <View>
                <RadioButton
                  value="XL"
                  color={styling.colors.Asphalt}
                  status={currentSize === 'XL' ? 'checked' : 'unchecked'}
                  onPress={() => setCurrentSize('XL')}
                />
              </View>
            </View>
            <View style={productSizeContainer.valueOption}>
              <View>
                <Text>XXL</Text>
              </View>
              <View>
                <RadioButton
                  value="XXL"
                  color={styling.colors.Asphalt}
                  status={currentSize === 'XXL' ? 'checked' : 'unchecked'}
                  onPress={() => setCurrentSize('XXL')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={createProductFormValidationSchema}>
        {({ handleSubmit }) => <NewProductForm currentItemType={value} currentItemSize={currentSize} onSubmit={handleSubmit} loading={loading} />}
      </Formik>
    </View>
  );
};

// Export "NewProduct" component, so other components like "App.js" are able to use this hooks's content.
export default NewProduct;
