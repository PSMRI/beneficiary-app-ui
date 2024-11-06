import {StyleSheet, FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import SearchHeader from '../../components/common/layout/SearchHeader';
import Layout from '../../components/common/layout/Layout';
import * as benefitServis from '../../service/benefits';
import {Gender, Castes, IncomeRange} from '../../constatnt/Constant';
import BenefitCard from '../../components/common/BenefitCard';
import {Dialog, Portal, Text} from 'react-native-paper';
import {getTokenData} from '../../service/ayncStorage';
import {getUser} from '../../service/auth';

const List = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({});
  const [initState, setInitState] = useState('yes');
  // const [hasMore] = useState(true);
  // const benefits = data.ubi_network_cache; // data from API
  const [benefits, setBenefits] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const init = async () => {
      try {
        const {sub} = await getTokenData(); // Assuming sub is the user identifier
        const user = await getUser(sub);
        const filters = {
          'social-eligibility': user?.userInfo?.caste,
          'ann-hh-inc': user?.userInfo?.income,
          'gender-eligibility': user?.userInfo?.gender,
        };
        const newFilter = {};
        Object.keys(filters).forEach(key => {
          if (filters[key] && filters[key] !== '') {
            if (typeof filters[key] === 'string') {
              newFilter[key] = filters[key].toLowerCase();
            } else {
              newFilter[key] = filters[key];
            }
          }
        });
        setFilter(newFilter);
        setInitState('no');
      } catch (e) {
        setError(e.message);
        setInitState('no');
      }
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        if (initState == 'no') {
          setLoading(true);
          const result = await benefitServis.getAll({
            filters: {
              ...filter,
              'ann-hh-inc': filter?.['ann-hh-inc']
                ? `0-${filter?.['ann-hh-inc']}`
                : '',
            },
            search,
          });
          setBenefits(result?.data?.ubi_network_cache);
          setLoading(false);
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    init();
  }, [filter, search, initState]);

  if (error) {
    return (
      <Portal>
        <Dialog visible={!!error} onDismiss={() => setError('')}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Text>{error}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Text onPress={() => setError('')}>Close</Text>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  return (
    <Layout
      loading={loading}
      _heading={{
        heading: 'Browse Benefits',
      }}
      isScrollable={true}
      afterHeader={
        <SearchHeader
          onSearch={setSearch}
          inputs={[
            {
              label: 'Caste',
              data: Castes,
              value: filter?.['social-eligibility'] || '',
              key: 'social-eligibility',
            },
            {
              label: 'Income Range',
              data: IncomeRange,
              value: filter?.['ann-hh-inc'] || '',
              key: 'ann-hh-inc',
            },
            {
              label: 'Gender',
              data: Gender,
              value: filter?.['gender-eligibility'] || '',
              key: 'gender-eligibility',
            },
          ]}
          onFilter={setFilter}
        />
      }>
      {benefits?.length === 0 ? (
        <View style={[styles.emptyContainer, styles.center, {padding: 20}]}>
          <Text style={styles.emptyText}>No benefits available</Text>
        </View>
      ) : (
        <FlatList
          data={benefits}
          renderItem={({item}) => (
            <BenefitCard item={item} key={item.id} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
          onEndReachedThreshold={0.5}
          // ListFooterComponent={
          //   hasMore && (
          //     <CustomButton
          //       label="Load More"
          //       marginTop={18}
          //       height={40}
          //       width={'100%'}
          //       marginBottom={18}
          //     />
          //   )
          // }
        />
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    padding: 15,
    marginTop: 5,
  },
});
export default List;
