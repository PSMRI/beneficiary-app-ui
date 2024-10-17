import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {List, IconButton} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

const statusIcon = status => {
  return (
    <View style={styles.statusContainer}>
      <IconButton
        icon={status === 'Disbursal Complete' ? 'circle' : 'alert'}
        size={9}
        iconColor={status === 'Disbursal Complete' ? '#0B7B69' : 'white'}
      />
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );
};
statusIcon.propTypes = {
  status: PropTypes.string.isRequired,
};

const ApplicationList = ({applicationList}) => {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <List.Section>
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <IconButton
              icon={'check-circle'}
              size={20}
              style={styles.icon}
              iconColor={'#EDA145'}
            />
            <Text style={styles.subheaderText}>Submitted</Text>
          </View>
          <View style={styles.divider} />
          {applicationList?.map(app => (
            <List.Item
              key={app.benefit_id}
              title={app.application_name}
              titleStyle={{fontFamily: 'Poppins-Regular', fontSize: 14}}
              style={styles.listItem}
              onPress={() => {
                navigation.navigate('MyApplication', {
                  id: app?.internal_application_id,
                });
              }}
            />
          ))}
        </View>
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: '#DDDDDD',
    marginBottom: 10,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  subheaderText: {
    fontSize: 16,
    color: '#1F1B13',
    flex: 1,
    fontFamily: 'Poppins-Regular',
  },
  divider: {
    padding: 0,
    margin: 0,
    backgroundColor: '#DDDDDD',
    width: '100%',
    marginBottom: 5,
    height: 1,
  },
  listItem: {
    height: 53,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 10,
    color: '#0B7B69',
  },
});

export default ApplicationList;
