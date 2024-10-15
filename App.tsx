import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import {AuthScreenStackScreen} from './src/navigation/AppNavigator';
import BottomNavigation from './src/navigation/BottomNavigation';
import {AuthContext, AuthProvider} from './src/utils/context/checkToken';

const AppContent = () => {
  const {isLoggedIn, checkToken, setIsLoggedIn} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomNavigation />
      ) : (
        <AuthScreenStackScreen onLoginSuccess={checkToken} />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
