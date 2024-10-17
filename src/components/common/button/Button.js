import * as React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types'; // Import PropTypes

const CustomButton = ({
  testId,
  label = 'Click me',
  mode = 'contained',
  width = 'maxWidth',
  borderRadius = 30,
  handleClick,
  marginTop = 0,
  padding = 0,
  borderColor = '#3C5FDD',
  marginBottom = 0,
  style,
  disabled,
}) => (
  <View style={{...styles?.view, ...style}}>
    <Button
      disabled={disabled}
      mode={mode}
      onPress={handleClick}
      testID={testId}
      style={{
        width,
        borderRadius,
        marginTop,
        padding,
        borderColor,
        marginBottom,
      }}>
      <Text style={styles.text}>{label}</Text>
    </Button>
  </View>
);

CustomButton.propTypes = {
  testId: PropTypes.string,
  label: PropTypes.string,
  mode: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.number,
  handleClick: PropTypes.func,
  marginTop: PropTypes.number,
  padding: PropTypes.number,
  borderColor: PropTypes.string,
  marginBottom: PropTypes.number,
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    height: 50,
    textAlign: 'center',
  },
});

export default CustomButton;
