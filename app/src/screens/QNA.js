import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from './../components/BackButton';
import AppStyles from '../../AppStyles';
import DataLoading from './../components/DataLoading';
import Toast from 'react-native-toast-message';
import axios from '../axios/axios';
import QNACard from '../components/QNACard';

const QNA = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [qnasList, setQnasList] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    createNavigation();
    findQNAs();
  }, []);

  const findQNAs = async () => {
    console.log(page);
    const fields = '_id,user,question,categories,createdAt,commentsCount';
    axios
      .get(`/qna?fields=${fields}&limit=10&sort=-createdAt&page=${page}`)
      .then(res => {
        var {data, count} = res.data;

        data = JSON.parse(data);
        if (!data) {
          setLoadMore(false);
        } else if (data.length == 0) {
          setLoadMore(false);
          setPage(-1);
        } else {
          data.map(u => {
            setQnasList(prev => [...prev, u]);
          });
          setPage(page => page + 1);
          if (count < 10) {
            setLoadMore(false);
            setPage(-1);
          }
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error occured while fetching blogs',
          text2: '' + error,
          onPress: () => {
            Toast.hide();
          },
          position: 'bottom',
        });
      });
  };

  const createNavigation = () => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => {
        return (
          <View style={AppStyles.header}>
            <BackButton onPress={() => navigation.goBack()} />
            <View>
              <Text style={[AppStyles.headingH3, {fontWeight: '200'}]}>
                QnA
              </Text>
            </View>
          </View>
        );
      },
    });
  };

  if (loading) {
    return <DataLoading />;
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {qnasList.map(item => (
          <QNACard key={item._id} data={item} />
        ))}
        {loadMore ? (
          <View
            style={[AppStyles.center, {marginVertical: 10, marginBottom: 20}]}>
            <TouchableOpacity onPress={findQNAs}>
              <Text>Load more</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default QNA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
