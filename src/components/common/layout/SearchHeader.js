import {StyleSheet, View} from 'react-native';
import React from 'react';
import FilterDialog from '../../FilterDialog';
import Searchbar from '../inputs/Searchbar';

const SearchHeader = ({onSearch}) => {
  return (
    <View style={styles.view}>
      <Searchbar style={styles.searchBar} onSearch={onSearch} />
      <FilterDialog style={styles.filter} />
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 5,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flex: 7,
  },
  filter: {
    flex: 3,
  },
});
export default SearchHeader;
