import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomButton from '../../components/common/button/Button';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import Layout from '../../components/common/layout/Layout';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator, Icon} from 'react-native-paper';
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
  const [authUser, setAuthUser] = useState();
  const [item, setItem] = useState();
  const navigation = useNavigation();
  const [context, setContext] = useState({});
  const [isApplied, setIsApplied] = useState(false);
  const handleBack = () => {
    navigation.navigate('BenefitsListing');
  };
  const openCOnfirmDialog = async () => {
    setLoading(true);
    const result = await benefitServis.applyApplication({id, context});
    setWebFromProp({
      url: result?.data?.responses?.[0]?.message?.order?.items?.[0]?.xinput
        ?.form?.url,
      formData: authUser,
    });
    setLoading(false);
  };

  const closeCOnfirmDialog = () => {
    setVisibleDialog(false);
  };
  useEffect(() => {
    const init = async () => {
      try {
        const {sub} = await getTokenData(); // Assuming sub is the user identifier
        const user = await getUser(sub);
        const result = await benefitServis.getOne({id});
        const resultItem =
          result?.data?.responses?.[0]?.message?.order?.items?.[0] || {};
        setContext(result?.data?.responses?.[0]?.context);

        const docs = resultItem?.tags
          ?.find(e => e?.descriptor?.code == 'required-docs')
          ?.list.filter(e => e.value)
          .map(e => e.value);
        setItem({...resultItem, document: docs});
        const formData =
          {
            ...(user?.user || {}),
            ...(user?.userInfo || {}),
            class: user?.userInfo?.current_class || '',
            marks_previous_class: user?.userInfo?.previous_year_marks || '',
            phone_number: user?.userInfo?.phone || '',
          } || {};
        setAuthUser(formData);
        const appResult = await benefitServis.getApplication({
          user_id: formData?.user_id,
          benefit_id: id,
        });
        if (appResult?.length > 0) {
          setIsApplied(true);
        }
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
  const submitConfirm = async submission_id => {
    setLoading(true);
    const result = await benefitServis.confirmApplication({
      submission_id,
      context,
    });
    const orderId = result?.data?.responses?.[0]?.message?.order?.id;
    if (orderId) {
      const payload = {
        user_id: authUser?.user_id,
        benefit_id: id,
        benefit_provider_id: context?.bpp_id,
        benefit_provider_uri: context?.bap_uri,
        external_application_id: orderId,
        application_name: item?.descriptor?.name,
        status: 'submitted',
        application_data: authUser,
      };
      try {
        const appResult = await benefitServis.createApplication(payload);
        if (appResult) {
          setWebFromProp();
          setVisibleDialog({orderId, name: item?.descriptor?.name});
          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (webFromProp?.url) {
    return (
      <WebViewFormExample {...webFromProp} setPageContent={submitConfirm} />
    );
  }
  return (
    <Layout
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
          {/* <Text style={styles.descriptionHeading}>
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
          /> <Text style={styles.descriptionHeading}>Key Points:</Text>
          <FlatList
            data={item?.keyPoints}
            renderItem={({item: keyPointsItem}) =>
              renderItem({item: keyPointsItem})
            }
            keyExtractor={keyPointsItem => keyPointsItem}
            scrollEnabled={false}
          /> */}
          {Array.isArray(item?.document) && item?.document.length > 0 && (
            <View>
              <Text style={styles.descriptionHeading}>
                Mandatory Documents:
              </Text>
              <FlatList
                data={item?.document}
                renderItem={({item: documentItem}) =>
                  renderItem({item: documentItem})
                }
                keyExtractor={documentItem => documentItem}
                scrollEnabled={false}
              />
              <CustomButton
                label={
                  isApplied
                    ? 'Application Already Submitted'
                    : 'Proceed To Apply'
                }
                disabled={isApplied}
                width="100%"
                mode="contained"
                handleClick={() => setVisibleDialog(true)}
              />
              <ConfirmationDialog
                dialogVisible={visibleDialog}
                closeDialog={closeCOnfirmDialog}
                handleConfirmation={async () => openCOnfirmDialog()}
                documents={documents}
              />
            </View>
          )}
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
