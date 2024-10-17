import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import {View, Text, StyleSheet, Pressable} from 'react-native';
import HeadingText from '../../components/common/layout/HeadingText';
import CustomButton from '../../components/common/button/Button';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/common/TextInput/TextInput';
import Password from '../../components/common/TextInput/Password';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDocumentsList, getUser, loginUser} from '../../service/auth';
import {ActivityIndicator} from 'react-native-paper';
import {getTokenData, saveToken} from '../../service/ayncStorage';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import {AuthContext} from '../../utils/context/checkToken';

const Login = ({onLoginSuccess}) => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Splash');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const {userData, documents, updateUserData} = useContext(AuthContext);
  const handleLogin = async () => {
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
      const {sub} = await getTokenData(); // Assuming sub is the user identifier
      const result = await getUser(sub);
      const data = await getDocumentsList();
      updateUserData(result, data.data);
    } catch (error) {
      console.error('Error fetching user data or documents:', error);
    }
  };

  return (
    <View style={{backgroundColor: '#FAFAFA', height: '100%'}}>
      <HeadingText handleBack={handleBack} />
      <Text style={styles.text}>Sign In to your account !</Text>
      <View>
        <CustomTextInput
          label={'Enter username/mobile no'}
          value={username}
          onChangeText={setUsername}
          margin={25}
        />
        <Password
          label="Password"
          value={password}
          onChangeText={setPassword}
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
      <Text style={styles.signUpText}>Do not have an Account?</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('Register');
        }}
        style={{alignSelf: 'center'}}>
        <Text style={styles.signUpButton}>Sign Up</Text>
      </Pressable>
      <ConfirmationDialog
        dialogVisible={dialogVisible}
        closeDialog={setDialogVisible}
        handleConfirmation={onLoginSuccess}
        documents={documents}
      />
    </View>
  );
};

// Prop validation
Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

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
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  signUpButton: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#3C5FDD',
    textAlign: 'center',
  },
});

export default Login;
