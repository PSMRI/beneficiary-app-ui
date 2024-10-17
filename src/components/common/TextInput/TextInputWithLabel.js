import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const TextInputWithLabel = ({label, isDisabled = true, value}) => {
  return (
    <View style={styles.inputBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input]}
          value={value === null || value === undefined ? '--' : value}
          editable={false}
          placeholder={label}
        />
        {/* <Icon
          name="checkmark-outline"
          size={24}
          color="#0B7B69"
          style={styles.applicationIcon}
        /> */}
        {value === undefined || value === ' ' ? null : (
          <View>
            <MaterialCommunityIcons name="check" color="#0B7B69" size={24} />
          </View>
        )}
      </View>
    </View>
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
    color: '#0B7B69',
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
export default TextInputWithLabel;
