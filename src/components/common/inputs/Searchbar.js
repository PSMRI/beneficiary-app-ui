import * as React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {IconButton} from 'react-native-paper';

const Searchbar = ({onSearch, value}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  return (
    <View style={styles.Searchcontainer}>
      <View style={styles.searchWrapper}>
        {/* Search Icon on the left */}
        <IconButton
          icon="magnify" // Equivalent to 'search' in Material Icons
          size={24}
          color="#45464F"
          style={styles.iconButton}
          onPress={() => {
            onSearch(searchQuery);
          }}
        />
        {/* TextInput for search bar */}
        <TextInput
          placeholder="Search By Name"
          placeholderTextColor={styles.placeholderTextColor.color}
          style={styles.searchbar}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Searchcontainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginLeft: 2,
  },
  searchWrapper: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#E9E7EF',
    paddingHorizontal: 10,
    borderRadius: 28,
  },
  searchbar: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholderTextColor: {
    color: '#45464F',
  },
});

export default Searchbar;
