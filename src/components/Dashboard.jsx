// This exercise has been commented by Aarni Pavlidi, if you have any questions or suggestions with the code,
// then please contact me by sending email at me@aarnipavlidi.fi <3

import React, { useState } from 'react';
import { Alert, Text, StyleSheet, View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';

import useCurrentUser from '../hooks/useCurrentUser';

import Home from './Home';
import UserSettings from './UserSettings';

import styling from '../styling';

const Dashboard = () => {

  const { currentUserData, loading } = useCurrentUser();

  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'settings', title: 'Settings', icon: 'cog' },
  ]);

  const renderScene = ({ route }) => {
  switch (route.key) {
    case 'home':
      return <Home />;
    case 'settings':
      return <UserSettings currentUserData={currentUserData} loading={loading} />;
    };
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: styling.colors.VistaWhite }}
    />
  );
};

export default Dashboard;