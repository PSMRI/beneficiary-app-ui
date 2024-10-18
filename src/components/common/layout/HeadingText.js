import * as React from 'react';
import {Avatar, Text} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
const LeftContent = ({label}) => (
  <Avatar.Text label={label} size={40} style={style.avatar} />
);
const BackIcon = ({onPress, iconSize = 24}) => {
  return (
    <TouchableOpacity style={style.iconButton} onPress={onPress}>
      <Icon name={'arrow-back'} size={iconSize} color={'#433E3F'} />
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  avatar: {
    marginRight: 12,
    marginTop: 7,
  },
  iconButton: {
    marginRight: 11,
    padding: 0,
  },
});
const HeadingText = ({benificiary, heading, subHeading, handleBack, label}) => {
  const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: benificiary ? 0 : 1,
      borderBottomColor: '#DDDDDD',
      paddingVertical: 20,
    },
    title: {
      fontFamily: 'Poppins-Regular',
      fontSize: 22,
      fontWeight: '400',
      lineHeight: 28,
      textAlign: 'left',
      color: '#4D4639',
    },
    subtitle: {
      fontFamily: 'Poppins-Regular',
      fontSize: 11,
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 0.5,
      textAlign: 'left',
      paddingTop: 9,
      color: '#4D4639',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 0,
    },
    avatar: {
      marginRight: 12,
      marginTop: 7,
    },
    iconButton: {
      marginRight: 11,
      padding: 0,
    },
    subtitleWithM: {
      fontFamily: 'Poppins-Regular',
      fontSize: 11,
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 0.5,
      textAlign: 'left',
      color: '#4D4639',
      marginLeft: 52,
      paddingTop: 1,
    },
  });
  return (
    <View style={styles.titleContainer}>
      {(handleBack || heading || subHeading) && (
        <View>
          {(handleBack || heading) && (
            <View style={styles.header}>
              {benificiary && <LeftContent label={label} />}
              {handleBack && <BackIcon onPress={handleBack} />}
              {heading && <Text style={styles.title}>{heading}</Text>}
            </View>
          )}
          {benificiary && subHeading ? (
            <Text style={styles.subtitleWithM}>{subHeading}</Text>
          ) : (
            subHeading && <Text style={styles.subtitle}>{subHeading}</Text>
          )}
        </View>
      )}
    </View>
  );
};

HeadingText.propTypes = {
  benificiary: PropTypes.bool,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  handleBack: PropTypes.func,
  label: PropTypes.string,
};
BackIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconSize: PropTypes.number,
};

export default HeadingText;
