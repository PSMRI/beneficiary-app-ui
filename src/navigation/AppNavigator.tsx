/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/Profile';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import Splash from '../screens/auth/Splash';
import Application from '../screens/benefits/Application';
import List from '../screens/benefits/List';
import MyApplication from '../screens/benefits/MyApplication';
import BenefitDetails from '../screens/benefits/ViewDetails';
const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="BenefitsListing" component={List} />
    </HomeStack.Navigator>
  );
}
const BenefitsListingStack = createNativeStackNavigator();

export function BenefitsListingStackScreen() {
  return (
    <BenefitsListingStack.Navigator screenOptions={{headerShown: false}}>
      <BenefitsListingStack.Screen name="BenefitsListing" component={List} />
      <BenefitsListingStack.Screen
        name="BenefitDetails"
        component={BenefitDetails}
      />
    </BenefitsListingStack.Navigator>
  );
}

const BenefitApplicationStack = createNativeStackNavigator();

export function BenefitApplicationStackScreen() {
  return (
    <BenefitsListingStack.Navigator screenOptions={{headerShown: false}}>
      <BenefitApplicationStack.Screen
        name="BenefitApplication"
        component={Application}
      />
      <BenefitApplicationStack.Screen
        name="MyApplication"
        component={MyApplication}
      />
    </BenefitsListingStack.Navigator>
  );
}
const AuthScreenStack = createNativeStackNavigator();

export function AuthScreenStackScreen() {
  return (
    <AuthScreenStack.Navigator screenOptions={{headerShown: false}}>
      <AuthScreenStack.Screen name="Splash" component={Splash} />
      <AuthScreenStack.Screen name="Login">
        {props => <Login {...props} />}
      </AuthScreenStack.Screen>
      <AuthScreenStack.Screen name="Register" component={Register} />
    </AuthScreenStack.Navigator>
  );
}
