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

<p align="center">
  <img src="/documentation/images/Dashboard_component.jpg" width=25% height=25%>
</p>
