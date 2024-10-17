import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import authRoutes from './routes/authRoutes';
const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  const [routes, setRoutes] = React.useState([]);

  React.useEffect(() => {
    setRoutes([...authRoutes] as typeof routes);
  }, []);

  const getTabBarIcon = ({
    route,
    color,
  }: {
    route: {name: string};
    color: string;
  }): JSX.Element => {
    let iconName: string | undefined;

    switch (route?.name) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Search':
        iconName = 'feature-search';
        break;
      case 'My Application':
        iconName = 'clipboard-text';
        break;
      default:
        break;
    }

    return iconName ? (
      <MaterialCommunityIcons name={iconName} color={color} size={24} />
    ) : (
      <></>
    );
  };

  if (!routes?.length) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: prop => getTabBarIcon({...prop, route}),
        tabBarActiveTintColor: '#3C5FDD',
        tabBarInactiveTintColor: '#7A7A7A',
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.barStyle,
        headerShown: false,
        unmountOnBlur: true,
      })}>
      {routes?.map((route: (typeof authRoutes)[number]) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{tabBarLabel: route.name}}
        />
      ))}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
    height: 60,
  },
  tabBarLabelStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
  },
});
