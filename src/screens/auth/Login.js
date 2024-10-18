import React, {useContext, useState, useRef} from 'react';
import {View, Text, StyleSheet, Pressable, Keyboard} from 'react-native';
import HeadingText from '../../components/common/layout/HeadingText';
import CustomButton from '../../components/common/button/Button';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/common/TextInput/TextInput';
import Password from '../../components/common/TextInput/Password';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getDocumentsList,
  getUser,
  loginUser,
  sendConsent,
} from '../../service/auth';
import {ActivityIndicator} from 'react-native-paper';
import {getTokenData, saveToken} from '../../service/ayncStorage';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import {AuthContext} from '../../utils/context/checkToken';
import Navbar from '../../components/common/layout/Navbar';

const Login = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Splash');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const {checkToken, documents, updateUserData, userData} =
    useContext(AuthContext);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    // Clear error after 3 seconds
    const clearError = () => {
      setTimeout(() => {
        setError('');
      }, 3000);
    };

    if (!username) {
      setError('Enter Username ');
      clearError();
      return;
    }

    if (!password) {
      setError('Password cannot be empty');
      clearError();
      return;
    }

    try {
      setLoading(true); // Show loading indicator
      const response = await loginUser({phone_number: username, password});
      setLoading(false); // Hide loading indicator after response
      saveToken(response.data.access_token, response.data.refresh_token);
      init();
      setDialogVisible(true);
    } catch (error) {
      setLoading(false); // Hide loading indicator
      if (error.message === 'INVALID_USERNAME_PASSWORD_MESSAGE') {
        setError('Invalid username or password');
      } else {
        setError(error.message);
      }
      clearError();
    }
  };

  const init = async () => {
    try {
      setLoading(true);
      const {sub} = await getTokenData(); // Assuming sub is the user identifier
      const result = await getUser(sub);
      const data = await getDocumentsList();
      updateUserData(result?.user, data.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching user data or documents:', error.message);
      setLoading(false);
    }
  };

  const handleCofirmation = async () => {
    try {
      await sendConsent(userData?.user_id);
      checkToken();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{backgroundColor: '#FFFFFF', height: '100%'}}>
      <Navbar isMenu={false} />
      <HeadingText
        {...{
          heading: 'Sign In with E-Wallet',
          handleBack,
        }}
      />
      <View>
        <CustomTextInput
          label={'UserName'}
          value={username}
          onChangeText={setUsername}
          marginBottom={25}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Password
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
        />
        {error && (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={20}
              color="#8C1823"
            />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        {loading ? (
          <ActivityIndicator animating={true} color="#3C5FDD" />
        ) : (
          <CustomButton label="Sign In" width="90%" handleClick={handleLogin} />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}>
        <Text style={styles.signUpText}>Don't Have An Account? </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.signUpButton}>Sign Up</Text>
        </Pressable>
      </View>
      <ConfirmationDialog
        loading={loading}
        dialogVisible={dialogVisible}
        closeDialog={setDialogVisible}
        handleConfirmation={handleCofirmation}
        documents={documents}
        concentText="Please provide your consent to share the following with Fast Pass"
      />
    </View>
  );
};

// Prop validation
Login.propTypes = {};

const styles = StyleSheet.create({
  text: {
    height: 30,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
    paddingLeft: 16,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: '#8C1823', // Error color
    textAlign: 'center',
    marginLeft: 5,
    fontFamily: 'Poppins-Regular',
    marginTop: 3,
  },
  signUpText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#4D4639',
    textAlign: 'center',
  },
  signUpButton: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#3C5FDD',
    textAlign: 'center',
  },
});

export default Login;
