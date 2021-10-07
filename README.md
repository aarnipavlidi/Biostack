# Biostack 0.9v


This project is part of "Full Stack open 2021" course, where final task is to create our own project from scratch.  This project is using React Native's framework. Also for the project I made backend ("Biostack-backend" repository), which is using combination of Node, Mongoose and GraphQL.


## What is Biostack?

Biostack's project idea was to connect my own studies (Bioeconomy engineering) and connect with things I have learned this year from **Full Stack Open 2021** course and make app with circular economy on mind. On the app users are able to sell or buy second hand clothes from other users. During the project I focused mainly on two different things: having clean and responsive design and making sure that user experience during app usage is smooth as possible.

With the hours I spend (around 175 hours in total) on the project, I am happy overall how project on this current version turned out to be. Having said that, I will most likely continue this project at some point near in the future, so be make sure bookmark this repository!

## What is included right now on the app?

You are able to login and register to the app, which will store the data into database (using Mongodb). User has also an option to "register faster" and use Facebook's option to login to the app. Once user is logged in, different view will be rendered, which has navigation on the bottom with different pages to be redirected.

User can add own items and check what other items are being sold from different users and buy the item from them. As of right now (version 0.9v) does not have a option to add own
images to the app, so current code will handle the images by generating random image to the user. Big thanks for **IKONO** @ https://ikono.fi/ for providing the images! <3

If user decides to buy some cloth from different user, then app will render component (Checkout) where user can decide which delivery or payment method user wants to choose from. Once those are decided and current product has been purchased, then user will be redirected and shown of confirmation of that order. Copy of that order will be also sent to the users current email, this feature was implemented by using **EmailJS** library, more information about it can be found @ https://www.emailjs.com/. It is free to use, but only downside of using that service is that only **200** emails in total can be sent from app to the user.

Users can also give rating to each other (to the buyer and seller of that product which has been traded) at component, which shows each transactions to the current logged user on the app. User can give rating between 1 or 3 and once rating has been given, user can not give rating again on that specific transaction anymore. App will notify about if user has already given rating and show that rating was given back to the user.

From purchasing and selling, what if user wants to delete current listed items from the app? We got that covered aswell, so user has an option to either delete each product manually or all of them same time. Also there is option for the user to edit either current email or name, which will then update values into database and render updated values back to the user.

## Different components and their layout

### Dashboard

<p align="center">
  <img src="/documentation/images/Dashboard_component.jpg" width=25% height=25%>
</p>

This component is the first component which will be rendered to the user once user has successfully logged in to the Biostack. This component shows all the current listed products from different users. User has an option to scroll down to see more options, which will force query to fetch more values from the database and show those new ones back to the user. With scrolling, there is also an option to search some specific product from the "Searchbar" component @ https://callstack.github.io/react-native-paper/searchbar.html.

Component is also using multiple "useSubscription()" hooks, and their purpose is "listen" if other users are buying, adding or deleting products from the app. This way we make sure that current logged user has always the newest data rendered. For example what if user would go on specific product via "Dashboard" component and that product would not exist anymore on database, app would most likely crash.

Example of one subscription, which listen if other user has added new product to the app. So if other user has added new product, then for other users their current active querys (CURRENT_LOGGED_USER and SHOW_ALL_PRODUCTS) will be refetched.


```javascript
  const client = useApolloClient();

  const productAddedCache = async (response) => {
    console.log(response);
    await client.refetchQueries({
      include: "active",
    });
  };

  useSubscription(PRODUCT_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const response = subscriptionData.data.productAdded
      productAddedCache(response)
    },
  });
```


Component is using "FlatList" component to render each product via using "ProductRenderAll" component. If user presses some specific product, then user will be redirected to the different view and "CurrentProduct" component will rendered back to the user. So as we can see from bottom code example, that we are able to redirect user into right product by using "item" variable, which has "_id" object included.



```javascript
const ProductRenderAll = ({ item }) => {

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  return (
    <Card style={productContainer.cardContainer}>
      <Pressable onPress={() => history.push(`/dashboard/${item._id}`)}>
```


### CurrentProduct

<p align="center">
	<img src="/documentation/images/CurrentProduct_component_one.jpg" width=25% height=25%>
	<img src="/documentation/images/CurrentProduct_component_two.jpg" width=25% height=25%>
</p

This component will be rendered, if user chooses to go on some specific product. User will see related data to current item (type, size and price) and also seller information that who is selling this current item on the app. Seller's name and rating (does not work at this moment) will be shown back and also avatar. By default avatar will show first letters of firstname and lastname, but if user has registered to the app via using facebook, then app will show it's facebook profile image on the avatar's place.


```javascript
const CurrentUserAvatar = ({ checkUserAvatar, currentUserName }) => {

  if (checkUserAvatar) {
    return (
      <Image style={{ width: 75, height: 75, borderRadius: 75 / 2 }} source={{ uri: checkUserAvatar }} />
    )
  } else {
    return (
      <TextAvatar backgroundColor={styling.colors.Asphalt} textColor={styling.colors.VistaWhite} size={75} type={'circle'}>
        {currentUserName}
      </TextAvatar>
    );
  };
};
```


On each product two different buttons on the bottom will always be shown, so if current logged user is the owner of that specific product, then "EDIT PRODUCT" and "DELETE PRODUCT" buttons will be rendered. Keep in mind that as of right now editing products has not been implemented, but deleting product works. If current logged user is not the owner, then app will render "CHECKOUT" and "BOOKMARK" (bookmarking feature not implemented) buttoks back to the user. Component called "ButtonOptions" handles this logic and here is the small snippet of that component:


```javascript
if (getCurrentProduct.owner._id === currentUserData._id) {
  return (
    <View style={buttonContainer.productButtonContainer}>
      <Pressable style={buttonContainer.productButton}>
        <Text style={buttonContainer.productButtonText}>EDIT PRODUCT</Text>
        <FontAwesome name="edit" size={18} color={styling.colors.VistaWhite} />
      </Pressable>
      <Pressable style={buttonContainer.productButton} onPress={confirmProductDelete}>
        <Text style={buttonContainer.productButtonText}>DELETE PRODUCT</Text>
        <MaterialCommunityIcons name="delete-outline" size={18} color={styling.colors.VistaWhite} />
      </Pressable>
    </View>
  );
} else {
  return (
    <View style={buttonContainer.productButtonContainer}>
      <Pressable style={buttonContainer.productButton} onPress={showModal}>
        <Text style={buttonContainer.productButtonText}>CHECKOUT</Text>
        <Fontisto name="shopping-basket-add" size={18} color={styling.colors.VistaWhite} />
      </Pressable>
      <Pressable style={buttonContainer.productButton}>
        <Text style={buttonContainer.productButtonText}>BOOKMARK</Text>
        <Ionicons name="bookmarks" size={18} color={styling.colors.VistaWhite} />
      </Pressable>
    </View>
  );
};
```


If user decides to buy current product from the app via pressing "CHECKOUT" button, then component "Checkout" (modal) will be rendered back to the user. So basically we are still on "CurrentProduct" route, but "Checkout" component has been rendered on top of earlier component. So idea was that, if user is uncertain of something or wants to go back to "Dashboard" to see other products, then user has just an option to close the modal and go back.

### Checkout

<p align="center">
	<img src="/documentation/images/Checkout_component_one.jpg" width=25% height=25%>
	<img src="/documentation/images/Checkout_component_two.jpg" width=25% height=25%>
</p

On the "Checkout" component, app will use "Modal" component from https://callstack.github.io/react-native-paper/modal.html, which has all the information related to the chosen product, which user wants to buy from the app. Once user has has chosen all the required options (for shipping and payment), app will show total price of that order and user is now able to buy the item via pressing "BUY AN ITEM" button. Here is the code of the logic, which handles the buying an item and redirecting the user if buying an item is successful:


```javascript
    // These 3x variables are being used/needed, so that app is able to send email
    // confirmation to the buyer if purchasing the item is successful.
    const emailService = Constants.manifest.extra.email_service_id;
    const emailTemplate = Constants.manifest.extra.email_template_id;
    const emailUser = Constants.manifest.extra.email_user_id;

    // When this function is being referenced, then we wil execute "try" section first,
    // if something goes wrong during this section then we will pass into "catch" section.
    try {
      // We will be using "useCreateNewTransaction(...)" hook, which has "submitNewTransaction(...)"
      // function. Once function has been executed, then data will be under "response" variable,
      // which lets us access the query data => "data.createTransaction".
      const response = await submitNewTransaction({ getOrderData });
      const confirmationData = response.data.createTransaction; // Define "confirmationData" variable, which is equal to "response.data.createTransaction".

      // Define "emailOrderConfirmation" variable, which will get access
      // inside of {...} different object values.
      const emailOrderConfirmation = {
        to_name: currentUserData.name,
        to_email: currentUserData.email,
        reply_to: "me@aarnipavlidi.fi",
        orderID: confirmationData._id,
        orderName: confirmationData.productTitle,
        orderSize: confirmationData.productSize,
        orderType: confirmationData.productType,
        orderImage: confirmationData.productImage,
        orderShipping: confirmationData.shippingMethod,
        orderPayment: confirmationData.paymentMethod,
        orderTotal: confirmationData.paymentTotal,
        sellerName: confirmationData.sellerName,
        contactEmail: confirmationData.sellerEmail,
      };
      // If earlier function (submitNewTransaction) is successful, then user will be redirected to the
      // different view and "OrderConfirmation" component will be rendered back to the user, which will
      // show data, which uses "confirmationData" via => "state: { detail: order_data_here }":
      history.push({
        pathname: '/dashboard/order-confirmation',
        state: { detail: confirmationData }
      });
      // Then app will make copy of that order confirmation and send confirmation to the users current
      // email, which will use those 3x different variables which we defined earlier.
      await emailjs.send(emailService, emailTemplate, emailOrderConfirmation, emailUser);
    } catch (error) { // If there are any problems during "try" section, then we will execute "catch" section.
      console.log(error) // Console.log the "error" variable data back to the terminal.
    };
  };
```

### OrderConfirmation

<p align="center">
	<img src="/documentation/images/OrderConfirmation_component.jpg" width=25% height=25%>
</p

This component will be rendered to the user, after purchasing the item is successful. Component will show all the data regarding that order, which gets the data from previous "history.push" function. Also 2x different buttons will be rendered back, 1) "BUY MORE" button which will redirect user back to home "Dashboard" component and 2) "CONTACT SELLER" button, which will redirect user to this orders own page => "CurrentTransaction" component. There user is able to give rating and contact the seller/buyer.


```javascript
  const location = useLocation(); // Define "location" variable, which will execute => "useLocation(...)" function.
  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  // Define "getOrderData" variable, which is equal to "location.state.detail". So after user
  // has purchased the product successfully, then that order data goes into "location.state.detail"
  // and user will be redirected to this component (OrderConfirmation), which will show that data back.
  const getOrderData = location.state.detail;
  const orderNumber = `#${getOrderData._id}`;


<View style={buttonContainer.productButtonContainer}>
	<Pressable style={buttonContainer.productButton} onPress={() => history.push('/dashboard')}>
		<Text style={buttonContainer.productButtonText}>BUY MORE</Text>
	</Pressable>
        <Pressable style={buttonContainer.productButton} onPress={() => history.push(`/dashboard/profile/transactions/${getOrderData._id}`)}>
        	<Text style={buttonContainer.productButtonText}>CONTACT SELLER</Text>
        </Pressable>
</View>
```

### CurrentTransaction

<p align="center">
  <img src="/documentation/images/CurrentTransaction_component_one.jpg" width=25% height=25%>
  <img src="/documentation/images/CurrentTransaction_component_two.jpg" width=25% height=25%>
  <img src="/documentation/images/CurrentTransaction_component_giving_rating.jpg" width=25% height=25%>
  <img src="/documentation/images/CurrentTransaction_component_rating_snackbar.jpg" width=25% height=25%>
  <img src="/documentation/images/CurrentTransaction_component_after_giving_rating.jpg" width=25% height=25%>
</p


Component "CurrentTransaction" will show current transaction based on the "id" value of that transaction. User is able to go specific transaction either from "OrderHistory" component, which shows all of users transactions on the app or after user has bought the item, which the button which lets user to redirect the user to current order. On our "Main" component has the router logic, which renders then this component "CurrentTransaction"


```javascript
<Route exact path="/dashboard/profile/transactions/:transactionID">
	{currentToken ? <CurrentTransaction currentUserData={currentUserData} loading={loading} showSnackBar={showSnackBar} /> : <Redirect to="/" />}
</Route>
```

```javascript
  // Define "useCurrentTransaction(...)" hook, then get access into "getCurrentTransaction"
  // and "loadingTransaction" variables. When user goes into specific transaction, app will
  // execute hook and show current data back into "getCurrentTransaction" variable. If the
  // data is loading, which means "loadingTransaction" is === "true", then component will
  // render back "loading spinner" untill data has been completely loaded.
  const { getCurrentTransaction, loadingTransaction } = useCurrentTransaction();

```

And the hook which this component is using, will be using "useParams()" function, so after user is pressing on specific transaction then the router will know that this "id" value is this, which lets execute query with right variable and render back the data to the user.


```javascript
// This project has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React from 'react'; // Import "react" library's content for this hooks usage.
import { useParams } from 'react-router-native'; // Import following components from "react-router-native" library's content for this component usage.
import { useQuery } from '@apollo/client'; // Import following functions from "@apollo/client" library for this hook usage.
import { SHOW_CURRENT_TRANSACTION } from '../graphql/queries'; // Import following queries from "queries.js" file for this hook usage.

const useCurrentTransaction = () => {

  const { transactionID } = useParams();

  const { loading, error, data } = useQuery(SHOW_CURRENT_TRANSACTION, {
    fetchPolicy: 'cache-and-network',
    variables: {
      getTransactionID: transactionID
    },
  });

  // Return variables inside of {...} to be used with this hook.
  return {
    getCurrentTransaction: data?.showCurrentTransaction,
    loadingTransaction: loading,
  };
};

// Export "useCurrentTransaction" hook, so other components like "App.js" are able to use this hooks's content.
export default useCurrentTransaction;
```


When user is at current transaction view, then user has an option to give rating to the user (to both product buyer and seller). User can give rating only once and from values between 1 or 3. Once rating has been given successfully to the user, then app will render "Snackbar" component, which will notify that rating has been given. After that if user comes back to that current transaction, then user won't be able to give rating again and app will render the rating which was given earlier.


```javascript
  // Define "useCurrentTransaction(...)" hook, then get access into "getCurrentTransaction"
  // and "loadingTransaction" variables. When user goes into specific transaction, app will
  // execute hook and show current data back into "getCurrentTransaction" variable. If the
  // data is loading, which means "loadingTransaction" is === "true", then component will
  // render back "loading spinner" untill data has been completely loaded.
  const { getCurrentTransaction, loadingTransaction } = useCurrentTransaction();

  // Define "useCreateNewRating()" hook, then get access into "submitNewRating" function
  // and "loadingRating" variable. When user wants to give rating to the current transaction
  // buyer/seller, then component will execute "submitNewRating" function. When executing
  // function, we will be using 3x different parameters, "getCurrentTransaction._id",
  // "currentRating.value" and "getCurrentTransaction.type".
  const [submitNewRating, { loadingRating }] = useCreateNewRating(); // Define "submitNewRating" variable from => "useCreateNewRating(...)" hook.

  // Define "currentRating" into state, which will get in default two (2) object values
  // => "status" === "false" and "value" == "null". If we want to change "currentRating"
  // state, we will be using "setCurrentRating" function.
  const [currentRating, setCurrentRating] = useState({ status: false, value: null });

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // Define "submitRating" variable which will execute everything inside of {...} when
  // being referenced. Function executes "submitNewRating" function with given parameter
  // values and once the function returns data, we will be using that data into rendering
  // "Snackbar" component via using "showSnackBar" function, which will notify user of
  // giving successful rating value to the products buyer/seller.
  const submitRating = async () => {
    try { // We will try execute first "try" section, if there are any problems then we will execute "catch" section.
      const { data } = await submitNewRating(getCurrentTransaction._id, currentRating.value, getCurrentTransaction.type);
      showSnackBar(data.giveRatingUser.response); // Execute "showSnackBar" function, with given parameter value.
    } catch (error) { // If there any problems during executing the function then we will do "catch" section.
      console.log(error.message) // Console.log "error.message" variable back to the terminal.
    };
  };

  // Define "confirmSubmitRating" function, which will execute everything inside of {...}, when being referenced.
  // So when user has chosen the given rating value (1, 2 or 3) and user pressed the "submit" button, then user
  // will asked to confirm of giving the rating. Once user has decided to confirm, then we will execute the
  // "submitRating" function and execute the "submitNewRating" function (hook).
  const confirmSubmitRating = () => {
    Alert.alert(
      "Biostack",
      `You are giving rating value of ${currentRating.value} to the user. Are you sure and want to proceed?`,
      [
        {
          text: "CANCEL",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => submitRating(),
        }
      ]
    )
  };
```	  

### OrderHistory

<p align="center">
  <img src="/documentation/images/OrderHistory_component.jpg" width=25% height=25%>
</p


This component shows to the user all of the transactions, which have been made by the user. Any purchases or selling clothes will be shown at this component. Component shows 4x different
things on each row, which are transaction date, product type, product size and the payment total of that transaction. Then user has an option to check more data on each transaction by
pressing the button ("chevron-right" icon) on the end. Pressing the button will redirect user on that pressed transaction and render "CurrentTransaction" component back.


```javascript
const UserOrders = ({ item }) => {

  const history = useHistory(); // Define "history" variable, which will execute => "useHistory(...)" function.

  return (
    <View>
      <DataTable.Row>
        <DataTable.Cell>{item.date}</DataTable.Cell>
        <DataTable.Cell numeric={true}>
          <ItemTypeCheck currentItemType={item.productType} />
          <ItemSizeCheck currentItemSize={item.productSize} />
        </DataTable.Cell>
        <DataTable.Cell style={{ justifyContent: 'center' }}>{item.type}</DataTable.Cell>
        <DataTable.Cell numeric={true}>{item.paymentTotal} €</DataTable.Cell>
        <DataTable.Cell style={{ justifyContent: 'center' }} onPress={() => history.push(`/dashboard/profile/transactions/${item._id}`)}>
          <Entypo name="chevron-right" size={20} color={styling.colors.Asphalt} />
        </DataTable.Cell>
      </DataTable.Row>
    </View>
  );
};
```
