import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Dialog,
  Portal,
  Text,
  IconButton,
  List,
  ActivityIndicator,
} from 'react-native-paper';
import SubmitDialog from './SubmitDialog';
import CustomButton from './common/button/Button';
import PropTypes from 'prop-types';

const LeftIcon = props => {
  return (
    <List.Icon
      {...props}
      icon={'check'}
      color={'#3C5FDD'}
      style={styles.iconStyle}
    />
  );
};
const ConfirmationDialog = ({
  dialogVisible,
  closeDialog,
  handleConfirmation,
  documents,
  loading,
  concentText = 'Share my documents with the provider for processing my application',
}) => {
  // Function to call the parent's function
  const sendCloseDialog = () => {
    closeDialog(false);
  };
  const openSubmitDialog = () => {
    if (handleConfirmation) {
      handleConfirmation();
    }
  };
  const closeSubmitDialog = () => {
    closeDialog(false);
  };

  return (
    <View>
      {/* Child component contains the FlatList */}
      {typeof dialogVisible !== 'boolean' ? (
        <SubmitDialog
          dialogVisible={dialogVisible}
          closeSubmit={closeSubmitDialog}
        />
      ) : (
        <Portal style={{padding: 0, backgroundColor: 'blue'}}>
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
              <Text variant="bodyMedium" style={styles.conformationText}>
                {concentText}
              </Text>
              <ScrollView style={{height: 220}}>
                {loading ? (
                  <ActivityIndicator animating={true} color="#3C5FDD" />
                ) : (
                  documents?.map(document => (
                    <List.Item
                      key={document.name}
                      title={document.name}
                      style={styles.listItem} // Apply styles here for the List.Item container
                      titleStyle={styles.titleStyle} // Custom font style for the title
                      left={props => LeftIcon(props)}
                    />
                  ))
                )}
              </ScrollView>
            </Dialog.Content>

            <Dialog.Actions style={styles.dialogAction}>
              {loading ? (
                <ActivityIndicator animating={true} color="#3C5FDD" />
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 10,
                  }}>
                  <CustomButton
                    label={'Deny'}
                    width={135}
                    height={45}
                    handleClick={sendCloseDialog}
                    mode="outlined"
                  />
                  <CustomButton
                    label={'Accept'}
                    width={135}
                    height={45}
                    handleClick={openSubmitDialog}
                  />
                </View>
              )}
            </Dialog.Actions>
          </Dialog>
        </Portal>
      )}
    </View>
  );
};
ConfirmationDialog.propTypes = {
  dialogVisible: PropTypes.bool, // Ensure that dialogVisible is a required boolean
  closeDialog: PropTypes.func.isRequired, // Ensure that closeDialog is a required function
};
const styles = StyleSheet.create({
  container: {backgroundColor: '#FFF'},
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
  conformationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.15,
    textAlign: 'left',
    color: '#41424B',
  },
  dialogContent: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
  },
  listItem: {
    height: 56,
  },
  titleStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  dialogAction: {
    width: '100%',
    justifyContent: 'center',
    paddingTop: 16,
    flexDirection: 'row',
  },
  View: {
    flexDirection: 'row',
  },
});
export default ConfirmationDialog;
