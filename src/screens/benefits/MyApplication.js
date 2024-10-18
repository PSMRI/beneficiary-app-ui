import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Layout from '../../components/common/layout/Layout';
import {useNavigation} from '@react-navigation/native';
import {getApplicationDetails} from '../../service/auth';
import TextInputWithLabel from '../../components/common/TextInput/TextInputWithLabel';
const myApplicationData = [
  {id: 1, label: 'Full Name', value: 'first_name'},
  {id: 2, label: 'Last Name', value: 'last_name'},
  {id: 3, label: 'Gender', value: 'gender'},
  {id: 4, label: 'Age', value: 'age'},
  {id: 5, label: 'Samagra Id', value: 'samagra_id'},
  {id: 6, label: 'Class', value: 'current_class'},
  {id: 7, label: 'Adhaar Card', value: 'aadhar'},
  {id: 8, label: 'Marks', value: 'previous_year_marks'},
  {id: 9, label: 'Caste', value: 'caste'},
  {id: 10, label: 'School Name', value: 'current_school_name'},
];
const MyApplication = ({route}) => {
  const {id} = route.params;
  const navigation = useNavigation();
  const [userData, setUserData] = useState();
  const [benefit_name, setBenefit_name] = useState();
  const handleBack = () => {
    navigation.navigate('BenefitApplication');
  };

  const init = async () => {
    try {
      const result = await getApplicationDetails(id);
      setUserData({
        ...(result?.application_data || {}),
        ...(result?.application_data?.user || {}),
        ...(result?.application_data?.userInfo || {}),
      });
      setBenefit_name(result?.external_application_id);
    } catch (error) {
      console.error('Error fetching application details:', error);
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      _heading={{
        heading: 'My Applications',
        subHeading: `Application ID ${benefit_name}`,
        handleBack,
      }}
      isScrollable>
      <View style={styles.applicationRow}>
        <Text style={styles.leftText}>Status</Text>
        <Text style={styles.rightText}>Submitted</Text>
      </View>
      <ScrollView contentContainerStyle={styles.applicationContainer}>
        {myApplicationData?.map(field => {
          return (
            <TextInputWithLabel
              key={field.id}
              {...field}
              value={userData?.[field.value]}
            />
          );
        })}
      </ScrollView>
    </Layout>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  amountText: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily: 'Poppins-Regular',
  },
  stateText: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Poppins-Regular',
  },
  arrowText: {
    fontSize: 20,
    color: '#007BFF',
    fontFamily: 'Poppins-Regular',
  },
  applicationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#DEE4F9',
    height: 52,
  },
  leftText: {
    fontSize: 14,
    color: '#1F1B13',
    fontFamily: 'Poppins-Medium',
  },
  rightText: {
    fontSize: 10,
    color: '#EDA145',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  applicationContainer: {
    padding: 8,
    paddingBottom: 40,
  },
  inputBlock: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#1A1B21',
    fontFamily: 'Poppins-Medium',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
  },
  input: {
    flex: 1,
    fontSize: 12,
    padding: 8,
    fontFamily: 'Poppins-Regular',
    color: '#1A1B21',
  },
  disabledInput: {
    backgroundColor: '#F0F0F0',
    color: '#888',
  },
  applicationIcon: {
    marginLeft: 8,
  },
  status: {
    backgroundColor: '#DEE4F9',
  },
});
export default MyApplication;
