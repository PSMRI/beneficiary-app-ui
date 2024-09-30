import * as React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
const CustomButton = ({
  testId,
  label = 'Click me',
  mode = 'contained',
  height = 50,
  width = 'maxWidth',
  borderRadius = 30,
  handleClick,
  marginTop = 0,
  padding = 0,
  borderColor = '#3C5FDD',
}) => (
  <View style={styles.view}>
    <Button
      mode={mode}
      onPress={handleClick}
      testID={testId}
      style={{
        height,
        width,
        borderRadius,
        marginTop,
        padding,
        borderColor,
      }}>
      <Text style={styles.text}>{label}</Text>
    </Button>
  </View>
);
const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    margin:0,
    padding:0,
   height:50,
  },
});

export default CustomButton;
