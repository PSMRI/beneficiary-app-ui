import React, {useContext, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import DocumentList from '../components/DocumentList';
import CustomButton from '../components/common/button/Button';
import {useNavigation} from '@react-navigation/native';
import Layout from '../components/common/layout/Layout';
import {AuthContext} from '../utils/context/checkToken'; // Import AuthContext
import {ActivityIndicator} from 'react-native-paper';
import {getTokenData} from '../service/ayncStorage';
import {getDocumentsList, getUser} from '../service/auth';

const Profile = () => {
  const navigation = useNavigation();

  // Access userData, documents, and the updateUserData function from AuthContext
  const {userData, documents, updateUserData} = useContext(AuthContext);

  // Function to fetch user data and documents
  const init = async () => {
    try {
      const {sub} = await getTokenData(); // Assuming sub is the user identifier
      const result = await getUser(sub);
      const data = await getDocumentsList();
      updateUserData(result.user, data.data); // Update user data and document list in context
    } catch (error) {
      console.error('Error fetching user data or documents:', error);
    }
  };

  // Call init if userData or documents is not available
  useEffect(() => {
    if (!userData || !documents || documents.length === 0) {
      init();
    }
  }, [userData, documents]);

  const handleOnPress = () => {
    navigation.navigate('Search');
  };

  // Check if documents is not empty or undefined
  return documents && documents.length > 0 ? (
    <Layout
      _heading={{
        benificiary: true,
        heading: `${userData?.first_name} ${userData?.last_name}`,
        subHeading: 'Logged in with Digilocker',
        label: `${userData?.first_name?.[0]}${userData?.last_name?.[0]}`,
      }}>
      {/* Scrollable part of the screen */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DocumentList documents={documents} />
        <CustomButton
          testId={'click-explore-scholarship'}
          label="Explore Benefits"
          marginTop={18}
          height={40}
          width={'95%'}
          handleClick={handleOnPress}
        />
      </ScrollView>
    </Layout>
  ) : (
    <ActivityIndicator />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take full height of the screen
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {},
});

export default Profile;
