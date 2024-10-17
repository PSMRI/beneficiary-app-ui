import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import ApplicationList from '../../components/ApplicationList';
import SearchHeader from '../../components/common/layout/SearchHeader';
import {useNavigation} from '@react-navigation/native';
import Layout from '../../components/common/layout/Layout';
import {getTokenData} from '../../service/ayncStorage';
import {getApplicationList, getUser} from '../../service/auth';
const BenefitApplication = () => {
  const navigation = useNavigation();
  const [applicationList, setApplicationList] = useState();

  const init = async SearchText => {
    try {
      const {sub} = await getTokenData(); // Assuming sub is the user identifier
      const result = await getUser(sub);
      console.log('User Data', result?.user?.user_id);
      const user_id = result?.user?.user_id;
      const data = await getApplicationList(SearchText, user_id);
      console.log(data, 'data');
      setApplicationList(data);
    } catch (error) {
      console.error('Error fetching application list:', error);
    }
  };
  useEffect(() => {
    init();
  }, []);
  console.log(applicationList, 'application list');
  return (
    <Layout
      _heading={{
        heading: 'My Applications',
        subHeading: 'Track your application progress',
      }}
      afterHeader={<SearchHeader onSearch={init} />}>
      <ScrollView>
        <ApplicationList applicationList={applicationList} />
      </ScrollView>
    </Layout>
  );
};
const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
});
export default BenefitApplication;
