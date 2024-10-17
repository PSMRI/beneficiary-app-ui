import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Button from '../../components/common/button/Button';
import Dropdown from '../../components/common/inputs/Dropdown';
import {useNavigation} from '@react-navigation/native';
const Splash = () => {
  // Dynamic list for language selection; expand as needed
  const languageOptions = [{label: 'English', value: '1'}];
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);
  const handleLogin = () => {
    if (selectedLanguage) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../asset/fastPass.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Select Preferred Language</Text>
        <Dropdown
          DropdownLabel="Select Language"
          Data={languageOptions}
          helperText={'You can change this later'}
          helperData={true}
          getValue={setSelectedLanguage}
        />
        <Button
          label="Sign In / Sign Up "
          padding={2}
          width="92%"
          handleClick={handleLogin}
          accessibilityLabel="Sign In or Sign Up With DigiLocker"
          disabled={!selectedLanguage}
        />
        <View style={{height: 220}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#121943',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: '#121943',
    height: '40%',
    justifyContent: 'flex-end',
  },
  logo: {
    marginBottom: 90,
    width: 240,
    height: 78,
  },
  inputContainer: {
    height: '60%',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 40,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    color: '#4D4639',
    marginBottom: 20,
    fontFamily: 'Poppins-Medium',
    marginLeft: 16,
  },
});

export default Splash;
