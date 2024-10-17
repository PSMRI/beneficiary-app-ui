import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Dialog, Portal, Text, IconButton} from 'react-native-paper';
import Dropdown from './common/inputs/Dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
const FilterDialog = ({inputs, onFilter}) => {
  const [visible, setVisible] = React.useState(false);
  const [values, setValues] = React.useState({});
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  React.useEffect(() => {
    const inputsValues = inputs.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    setValues(inputsValues);
  }, [inputs]);

  const getValue = (item, value) => {
    setValues({...values, [item.key]: value});
  };

  if (!Array.isArray(inputs) || inputs?.length == 0) {
    return '';
  }

  return (
    <View>
      <TouchableOpacity onPress={showDialog} style={styles.buttonContainer}>
        <View style={styles.view}>
          <Text style={styles.text}>Filter</Text>
          {/* <MaterialCommunityIcons
            name="arrow-drop-down"
            size={15}
            color={'#4D4639'}
            style={styles.icon}
          /> */}
          <Icon
            name="arrow-drop-down" // Custom icon based on focus state
            size={18}
            color={'#4D4639'}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={styles.container}>
          <View style={styles.dialogHeader}>
            <View>
              <Text style={styles.applicationText}>Filters</Text>
            </View>
            <IconButton icon="close" onPress={hideDialog} />
          </View>
          <Dialog.Content>
            {inputs?.map(item => {
              return (
                <React.Fragment key={item.label}>
                  <Dropdown
                    DropdownLabel={item?.label}
                    Data={item?.data}
                    value={values[item?.key]}
                    getValue={text => getValue(item, text)}
                    isOther={true}
                  />
                </React.Fragment>
              );
            })}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              onPress={() => {
                onFilter(values);
                hideDialog();
              }}
              style={styles.actionButton}>
              Apply Filter
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: '#FFFFFF'},
  buttonContainer: {
    marginRight: 12,
  },
  dialogHeader: {
    height: 60,
    paddingHorizontal: 8,
    paddingLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingTop: 15,
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
    marginVertical: 16,
  },
  dialogButton: {
    marginTop: 18,
    marginRight: 10,
  },
  actionButton: {
    width: '100%',
    gap: 8,
  },
  view: {
    height: 32,
    width: 85,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4D4639',
    flexDirection: 'row',
    paddingTop: 4,
    marginTop: 17,
    marginRight: 2,
  },
  text: {
    fontSize: 14,
    marginLeft: 15,
    color: '#4D4639',
    fontFamily: 'Poppins-Medium',
  },
  icon: {
    marginTop: 2,
    marginLeft: 5,
  },
});
export default FilterDialog;
