import React from 'react';
import {FlatList, ScrollView, View, Text, StyleSheet} from 'react-native';
import {details} from '../Constatnt/Constant';
import CustomButton from '../Component/CustomButton';
import ConfirmationDialog from './ConfirmationDialog';
const DetailScreen = () => {
  const [visibleDialog, setVisibleDialog] = React.useState(false);
  const openCOnfirmDialog = () => {
    setVisibleDialog(true);
  };
  const closeCOnfirmDialog = () => {
    setVisibleDialog(false);
  };
  const renderItem = ({item}) => (
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {details?.map((item, idx) => {
        return (
          <View key={{idx}} style={styles.sidePadding}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.amount}>
              <Text style={styles.amountHeading}>₹</Text> {item?.amount}
            </Text>
            <Text style={styles.descriptionHeading}>Details</Text>
            <Text style={styles.description}>Details{item?.desc}</Text>
            <Text numberOfLines={8} style={styles.description}>
              {item.desc1}
            </Text>
            <Text style={styles.descriptionHeading}>
              Objectives of the Pre-matric Scholarship-ST:
            </Text>
            <FlatList
              data={item.objective}
              renderItem={renderItem}
              keyExtractor={item => item}
              style={styles}
            />
            <Text style={styles.descriptionHeading}>Key Points:</Text>
            <FlatList
              data={item.keyPoints}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
            <Text style={styles.descriptionHeading}>Mandatory Documents:</Text>
            <FlatList
              data={item.document}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
            <CustomButton
              label="Proceed To Apply"
              marginTop={18}
              height={40}
              width={'95%'}
              handleClick={() => openCOnfirmDialog()}
            />
            <ConfirmationDialog
              dialogVisible={visibleDialog}
              closeDialog={closeCOnfirmDialog}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sidePadding: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    color: '#433E3F',
    fontFamily: 'Poppins-Medium',
  },
  subtitle: {
    fontSize: 14,
    color: '#484848',
    marginTop: 1,
    fontFamily: 'Poppins-Regular',
    paddingBottom: 12,
  },
  amount: {
    fontSize: 12,
    color: '#484848',
    margintop: 8,
    fontFamily: 'Poppins-Regular',
    marginBottom: 12,
  },
  amountHeading: {fontSize: 18, fontFamily: 'Poppins-Regular'},
  description: {
    fontSize: 14,
    color: '#433E3F',
    marginVertical: 8,
    lineHeight: 20,
    letterSpacing: 0.25,
    fontFamily: 'Poppins-Regular',
  },
  descriptionHeading: {
    fontSize: 16,
    color: '#433E3F',
    marginVertical: 8,
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  listItem: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  bullet: {
    fontSize: 20,
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: '#433E3F',
  },
  headerline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default DetailScreen;
