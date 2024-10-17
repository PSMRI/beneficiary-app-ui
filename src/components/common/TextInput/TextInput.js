import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const CustomTextInput = ({
  label,
  value,
  onChangeText,
  margin = 10,
  marginBottom = 0,
  ...rest
}) => {
  const styles = StyleSheet.create({
    input: {
      margin: margin,
      height: 56,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: '#FFFFFF',
      marginBottom: marginBottom,
    },
  });
  return (
    <TextInput
      label={label}
      mode="outlined"
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      {...rest}
    />
  );
};

// Prop validation
CustomTextInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  margin: PropTypes.number,
};

// Default props in case none are provided
CustomTextInput.defaultProps = {
  margin: 10, // Default margin if not provided
};

export default CustomTextInput;
