import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../../components/common/button/Button';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Layout from '../../components/common/layout/Layout';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-paper';
import * as benefitServis from '../../service/benefits';
import WebViewFormExample from '../../components/common/webview/Form';
import {getTokenData} from '../../service/ayncStorage';
import {getUser} from '../../service/auth';

const ViewDetails = ({route}) => {
  // Retrieve the id passed from the HomeScreen
  const {id} = route.params;
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [webFromProp, setWebFromProp] = useState({});

  const [item, setItem] = useState();
  const navigation = useNavigation();
  const [context, setContext] = useState({});

  const handleBack = () => {
    navigation.navigate('BenefitsListing');
  };
  const openCOnfirmDialog = async () => {
    setLoading(true);
    console.log('sagar', ' user');

    const result = await benefitServis.applyApplication({id, context});
    const {sub} = await getTokenData(); // Assuming sub is the user identifier
    const user = await getUser(sub);
    console.log('sagar', user);
    setWebFromProp({
      url: result?.data?.responses?.[0]?.message?.order?.items?.[0]?.xinput
        ?.form?.url,
      formData:
        {
          ...(user?.user || {}),
          ...(user?.userInfo || {}),
          class: user?.userInfo?.current_class || '',
          marks_previous_class: user?.userInfo?.previous_year_marks || '',
          phone_number: user?.userInfo?.phone || '',
        } || {},
    });
    setLoading(false);
    // setVisibleDialog(true);
  };

  const closeCOnfirmDialog = () => {
    setVisibleDialog(false);
  };
  useEffect(() => {
    const init = async () => {
      try {
        const result = await benefitServis.getOne({id});
        setContext(result?.data?.responses?.[0]?.context);
        setItem(result?.data?.responses?.[0]?.message?.order?.items?.[0] || {});
        setLoading(false);
      } catch (e) {
        console.log('Error:', e.message);
      }
    };
    init();
  }, []);
  const renderItem = ({item: detailItem}) => (
    <View style={styles.listItem}>
      <Text style={styles.bullet}>•</Text>
      <Text style={styles.itemText}>{detailItem}</Text>
    </View>
  );
  const documents = [
    {id: 1, name: 'Marksheet(10th)'},
    {id: 2, name: 'Income Certificate'},
    {id: 3, name: 'Caste Certificate'},
    {id: 4, name: 'Domicile Certificate'},
  ];
  const submitConfirm = async id => {
    console.log(id, 'sagar');
    setWebFromProp();
  };
  if (webFromProp?.url) {
    return (
      <WebViewFormExample {...webFromProp} setPageContent={submitConfirm} />
    );
  }
  return (
    <Layout
      loading={loading}
      _heading={{
        heading: 'Pre-Matric Scholarship-ST',
        subHeading: 'Application for SC Scholarship1',
        handleBack,
      }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.sidePadding}>
          <Text style={styles.title}>{item?.descriptor?.name}</Text>
          <View style={styles.benefitAmount}>
            <Icon source={'currency-inr'} size={16} color="#484848" />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 14, marginRight: 4}}>
                {item?.price?.value}
              </Text>
              <Text style={{fontSize: 14, marginRight: 4}}>
                {item?.price?.currency}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.descriptionHeading}>Details</Text>
            <Text numberOfLines={8} style={styles.description}>
              {item?.descriptor?.long_desc}
            </Text>
          </View>
          <Text style={styles.descriptionHeading}>
            Objectives of the Pre-matric Scholarship-ST:
          </Text>
          <FlatList
            data={item?.objective}
            renderItem={({item: objectiveItem}) =>
              renderItem({item: objectiveItem})
            }
            keyExtractor={objectiveItem => objectiveItem}
            style={styles}
            scrollEnabled={false}
          />

          <Text style={styles.descriptionHeading}>Key Points:</Text>
          <FlatList
            data={item?.keyPoints}
            renderItem={({item: keyPointsItem}) =>
              renderItem({item: keyPointsItem})
            }
            keyExtractor={keyPointsItem => keyPointsItem}
            scrollEnabled={false}
          />
          <Text style={styles.descriptionHeading}>Mandatory Documents:</Text>
          <FlatList
            data={item?.document}
            renderItem={({item: documentItem}) =>
              renderItem({item: documentItem})
            }
            keyExtractor={documentItem => documentItem}
            scrollEnabled={false}
          />
          <CustomButton
            label="Proceed To Apply"
            marginTop={18}
            height={40}
            width={'95%'}
            handleClick={async () => openCOnfirmDialog()}
          />
          <ConfirmationDialog
            dialogVisible={visibleDialog}
            closeDialog={closeCOnfirmDialog}
            submitDialog={true}
            documents={documents}
          />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},
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
  benefitAmount: {
    flexDirection: 'row',
    alignItems: 'center',
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
export default ViewDetails;
