import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import HeadingText from '../../components/common/layout/HeadingText';
import CustomButton from '../../components/common/button/Button';
import {useNavigation} from '@react-navigation/native';
import CustomTextInput from '../../components/common/TextInput/TextInput';
import Password from '../../components/common/TextInput/Password';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {registerUser} from '../../service/auth';
import {ActivityIndicator} from 'react-native-paper';
import Layout from '../../components/common/layout/Layout';
const Register = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.navigate('Login');
  };
  const [firstName, setFirstName] = useState('');
  const [mobile, setMobile] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    // Clear error after 3 seconds
    const clearError = () => {
      setTimeout(() => {
        setError('');
      }, 4000); // 3 seconds timeout
    };

    if (!firstName || !lastName || !password || !confirmPassword) {
      setError('Enter all fields');
      clearError();
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords not match');
      clearError();
      return;
    }
    try {
      setLoading(true); // Show loading indicator
      const response = await registerUser({
        first_name: firstName,
        last_name: lastName,
        phone_number: mobile,
        password: password,
      });
      setLoading(false); // Hide loading indicator after response
      console.log(response);
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      setError(error.message);
      clearError();
    }
  };
  return (
    <Layout
      _heading={{
        heading: 'Sign Up with E-Wallet',
        handleBack,
      }}
      isMenu={false}>
      <View style={{backgroundColor: '#FFFFFF', height: '100%'}}>
        <View>
          <CustomTextInput
            label={'Enter First Name'}
            value={firstName}
            onChangeText={setFirstName}
          />
          <CustomTextInput
            label={'Enter Last Name'}
            value={lastName}
            onChangeText={setLastName}
          />
          <CustomTextInput
            label={'Enter Mobile No'}
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Password
            label="Password"
            value={password}
            onChangeText={setPassword}
            marginTop={15}
          />
          <Password
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
            <CustomButton
              label="Sign Up"
              width="90%"
              handleClick={handleLogin}
            />
          )}
        </View>
        <Text style={styles.signUpText}>Already Have An Account?</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{alignSelf: 'center'}}>
          <Text style={styles.signUpButton}>Sign In</Text>
        </Pressable>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    height: 30,
    backgroundColor: '#FFFFFF',
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
    marginTop: 10,
  },
  signUpButton: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#3C5FDD',
  },
});

export default Register;
