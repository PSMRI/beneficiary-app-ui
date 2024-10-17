import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-paper';
import {
  extractEligibilityValues,
  formatDateString,
} from '../../utils/JsHelper/helper';

const BenefitCard = ({item, navigation}) => {
  const dateStr = item?.item?.time?.range?.end;
  const formattedDate = formatDateString(dateStr);
  // const mandatoryDocuments = extractMandatoryDocuments(item?.item?.tags[2]);
  const eligibility = extractEligibilityValues(item?.item?.tags[0].list);

  return (
    <View style={styles.card}>
      <View style={styles.topRightView}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {item?.title}
        </Text>
        <Text numberOfLines={2} style={styles.subTitle}>
          {item?.description}
        </Text>
        {/* <Text numberOfLines={2} style={styles.benefitAmount}>
        <Icon source={'currency-inr'} size={16} />
        {item?.benefitAmount}
      </Text> */}
        <View style={styles.benefitAmount}>
          <Icon source={'currency-inr'} size={16} color="#484848" />
          <Text style={{fontSize: 12, marginLeft: 12}}>
            {item?.item?.price?.value}
          </Text>
        </View>
        {/* Simple Chip */}
        <View style={styles.chipContainer}>
          {eligibility?.map(val => {
            return (
              <Text key={val} style={styles.chipColor}>
                {val}
              </Text>
            );
          })}
        </View>
        <Text style={styles.description}>{item?.description}</Text>
        <TouchableOpacity
          style={styles.viewDetailsRow}
          onPress={() =>
            navigation.navigate('BenefitDetails', {id: item?.item_id})
          }>
          <Text style={styles.detailText}>View Details</Text>
          <Ionicons name="arrow-forward-outline" size={18} color="#0037B9" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
BenefitCard.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    benefitAmount: PropTypes.string.isRequired,
    eligible: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    address: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  applicationContainer: {
    padding: 8,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 35,
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
  topRightView: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#0B7B69',
    borderTopEndRadius: 10,
    borderBottomStartRadius: 5,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    minWidth: 125,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: 0.32,
    color: '#101828',
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.32,
    color: '#484848',
    paddingRight: 20,
    fontFamily: 'Poppins-Regular',
  },
  benefitAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 'auto',
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 9,
  },
  chip: {
    backgroundColor: 'white',
  },
  chipColor: {
    color: '#3C5FDD',
    fontSize: 11,
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 1,
    height: 19,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
    fontFamily: 'Poppins-Regular',
  },
  currencyIcon: {
    fontSize: 18,
    color: '#484848',
  },
  viewDetailsCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'row',
  },
  detailText: {
    color: '#0037B9',
    fontSize: 14,
    marginRight: 8,
    fontFamily: 'Poppins-Medium',
  },
  viewDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  viewDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 12,
    color: '#484848',
    fontFamily: 'Poppins-Regular',
  },
});
export default BenefitCard;
