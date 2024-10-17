import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Dialog, Portal, Text, IconButton} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
const SubmitDialog = ({dialogVisible, closeSubmit}) => {
  // Function to call the parent's function
  const navigation = useNavigation();
  const sendCloseDialog = () => {
    closeSubmit(false);
    navigation.navigate('BenefitsListing');
  };
  return (
    <View>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={sendCloseDialog}
          style={styles.container}>
          <View style={styles.dialogHeader}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 40,
              }}>
              <Text style={styles.applicationText}>Share Information</Text>
              <IconButton icon="close" onPress={sendCloseDialog} />
            </View>
            <Text style={styles.statusText}>Confirmation</Text>
          </View>
          <Dialog.Content style={styles.dialogContent}>
            <Text style={styles.text}>
              Your application to the <Text> </Text>
              <Text style={styles.scholarshipNameText}>
                {dialogVisible?.name}
              </Text>
              <Text> </Text>
              Benefit has been submitted!
            </Text>
            <Text style={styles.applicationIdText}>
              Application ID: {dialogVisible?.orderId}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            {/* Applying styles to the Button */}
            <View style={styles.view}>
              <Button
                mode="contained"
                onPress={sendCloseDialog}
                style={styles.actionButton}>
                Okay
              </Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
SubmitDialog.propTypes = {
  dialogVisible: PropTypes.bool.isRequired, // Ensure that dialogVisible is a required boolean
  closeSubmit: PropTypes.func.isRequired, // Ensure that closeDialog is a required function
};
const styles = StyleSheet.create({
  container: {backgroundColor: '#FFFFFF'},
  dialogHeader: {
    height: 70,
    paddingHorizontal: 8,
    paddingLeft: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  applicationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.15,
    textAlign: 'left',
    color: '#41424B',
  },
  statusText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.25,
    textAlign: 'left',
    color: '#41424B',
  },
  dialogContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 10,
    gap: 20,
  },
  dialogAction: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 10,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
  },
  scholarshipNameText: {
    fontFamily: 'Poppins-Medium',
    color: '#3C5FDD',
  },
  applicationIdText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: 400,
  },
  view: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  actionButton: {
    width: 137,
    gap: 8,
    height: 40,
  },
});
export default SubmitDialog;
