import React, {useState, useMemo} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text} from 'react-native-paper';

const DropdownComponent = ({
  DropdownLabel = 'Select',
  placeholderLabel = 'Select',
  Data,
  helperText = '',
  helperData = false,
  error = false,
  height = 56,
  isRenderLabel = true,
  borderRadius = 4,
  fontSize = 16,
  width,
  iconSize = 20,
  marginLeft = 0,
  borderColor = '#767680',
  padding = 12,
  value,
  getValue,
  isOther = false,
}) => {
  // useState
  const [localValue, setLocalValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  React.useEffect(() => {
    const found = Data.find(item => item.value === value);
    if (!found) {
      const foundOther = Data.find(item => item.value === 'other');
      if (foundOther) {
        setLocalValue('other');
      } else {
        setLocalValue(null);
      }
      setOtherValue(value);
    } else {
      setLocalValue(value); // Set the value from props to the state
    }
  }, [value, Data]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: '#FFFFFF',
          padding,
        },
        dropdown: {
          height,
          borderColor,
          borderWidth: 1,
          borderRadius,
          paddingHorizontal: 8,
          width: width,
        },
        FocusedDropdown: {
          height,
          borderColor: '#3C5FDD',
          borderWidth: 1,
          borderRadius,
          paddingHorizontal: 8,
          width: width,
        },
        label: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          left: 22,
          top: 8,
          zIndex: 999,
          paddingHorizontal: 8,
          fontSize: 12,
          color: '#45464F',
          fontFamily: 'Poppins-Regular',
          lineHeight: 16,
          letterSpacing: 0.4,
        },
        placeholderStyle: {
          fontSize,
          color: '#1A1B21',
          fontFamily: 'Poppins-Regular',
          fontWeight: '400',
          lineHeight: 24,
          letterSpacing: 0.5,
          marginLeft,
        },
        selectedTextStyle: {
          fontSize,
        },
        iconStyle: {
          width: iconSize,
          height: iconSize,
        },
        focusedLabel: {
          color: '#3C5FDD',
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          left: 22,
          top: 8,
          zIndex: 999,
          paddingHorizontal: 8,
          fontSize: 12,
          fontFamily: 'Poppins-Regular',
          lineHeight: 16,
          letterSpacing: 0.4,
        },
        helperText: {
          marginTop: 6,
          fontSize: 12,
          color: '#45464F',
          fontFamily: 'Poppins-Regular',
          marginLeft: 10,
        },
        errorText: {
          color: 'red',
        },
        itemTextStyle: {
          color: '#1A1B21',
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
        },
        containerStyle: {height: 'auto', overflow: 'scroll'},
        inputContainer: {
          height: height,
          borderColor,
          borderWidth: 1,
          borderRadius,
          paddingHorizontal: 8,
          width: width,
          marginTop: 12,
        },
      }),
    [
      height,
      borderRadius,
      fontSize,
      width,
      iconSize,
      marginLeft,
      borderColor,
      padding,
    ],
  );

  const renderLabel = () => {
    return (
      <Text style={isFocus ? styles.focusedLabel : styles.label}>
        {DropdownLabel}
      </Text>
    );
  };

  const renderInput = () => {
    return (
      <TextInput
        style={styles.inputContainer}
        placeholder={placeholderLabel}
        value={otherValue}
        onChangeText={text => setOtherValue(text)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {isRenderLabel && renderLabel()}
      <Dropdown
        style={isFocus ? styles.FocusedDropdown : styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.placeholderStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        data={Data || []}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholderLabel}
        containerStyle={styles.containerStyle}
        value={localValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setLocalValue(item?.value);
          if (getValue) {
            getValue(
              item?.value?.toLowerCase() === 'other' ? otherValue : item?.value,
            );
          }
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <Icon
            name={isFocus ? 'arrow-drop-up' : 'arrow-drop-down'}
            size={iconSize}
            color={isFocus ? 'blue' : '#45464F'}
          />
        )}
      />
      {localValue?.toLowerCase() === 'other' && isOther && renderInput()}
      {helperData && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

DropdownComponent.propTypes = {
  DropdownLabel: PropTypes.string,
  placeholderLabel: PropTypes.string,
  Data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    }),
  ),
  helperText: PropTypes.string,
  helperData: PropTypes.bool,
  error: PropTypes.bool,
  isOther: PropTypes.bool,
};

export default DropdownComponent;
