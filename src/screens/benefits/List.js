import {StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import SearchHeader from '../../components/common/layout/SearchHeader';
import Layout from '../../components/common/layout/Layout';
import * as benefitServis from '../../service/benefits';

import BenefitCard from '../../components/common/BenefitCard';
// import CustomButton from '../../components/common/button/Button';
const List = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  // const [hasMore] = useState(true);
  // const benefits = data.ubi_network_cache; // data from API
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    const init = async () => {
      const result = await benefitServis.getAll();
      setBenefits(result?.data?.ubi_network_cache || []);
      setLoading(false);
    };
    init();
  }, []);

  return (
    <Layout
      loading={loading}
      _heading={{
        heading: 'Browse Benefits',
      }}
      isScrollable={true}
      afterHeader={<SearchHeader />}>
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
