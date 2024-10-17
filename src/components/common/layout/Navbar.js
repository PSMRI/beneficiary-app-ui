import React, {useContext} from 'react';
import {Appbar, Menu} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Dropdown from '../inputs/Dropdown';
import {logoutUser} from '../../../service/auth';
import {getToken} from '../../../service/ayncStorage';
import {AuthContext} from '../../../utils/context/checkToken';

const Navbar = ({isMenu = true}) => {
  const {checkToken, removeContextData} = useContext(AuthContext);
  const navigation = useNavigation();
  const languageOptions = [{label: 'EN', value: '1'}];
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const navigateHome = () => {
    navigation.navigate('Home');
  };
  const handleLogout = async () => {
    const token = await getToken();
    if (token?.token && token?.refreshToken) {
      try {
        await logoutUser(token.token, token.refreshToken); // Call the logout function
        removeContextData();
        checkToken();
      } catch (error) {
        console.error('Logout failed:', error.massage);
      }
    } else {
      console.error('No tokens found, user is not logged in');
    }
  };
  return (
    <Appbar.Header style={styles.appBarTheme}>
      {isMenu && (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" onPress={openMenu} iconColor="#000000" />
          }>
          <Menu.Item onPress={navigateHome} title="Home" />
          <Menu.Item onPress={handleLogout} title="Logout" />
        </Menu>
      )}
      <Appbar.Content title="Fast Pass" titleStyle={styles.titleStyle} />
      {/* Language  on the right side */}
      <Dropdown
        placeholderLabel="EN"
        Data={languageOptions}
        isRenderLabel={false}
        height={25.5}
        DropdownLabel="EN"
        borderRadius={8}
        width={60}
        fontSize={12}
        iconSize={18}
        marginLeft={4}
        borderColor="#4D4639"
        padding={0}
        backgroundColor="#EDEFFF"
      />
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({
  appBarTheme: {
    marginTop: '24px',
    marginLeft: '12px',
    backgroundColor: '#EDEFFF',
  },
  titleStyle: {
    fontFamily: 'Poppins-Italic',
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 20,
    textAlign: 'left',
    color: '#0A0A0B',
  },
  view: {
    height: 22,
    width: 58,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4D4639',
    flexDirection: 'row',
    paddingTop: 4,
  },
  text: {
    fontSize: 12,
    marginLeft: 20,
    color: '#4D4639',
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
  icon: {
    marginTop: 1,
  },
});
export default Navbar;
