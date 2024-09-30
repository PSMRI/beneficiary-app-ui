import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';


  const CustomDropdown = ({DropdownLabel = 'Select',placeholderLabel = 'Select',Data,testId}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            {DropdownLabel}
          </Text>
        );
    };

    return (
      <View style={styles.container}>
        {/* {renderLabel()} */}
        <Dropdown
        testID={testId}
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={Data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          value={value}
          onChange={item => {
            setValue(item?.value);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  export default CustomDropdown;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
