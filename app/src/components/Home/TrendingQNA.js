import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppStyles from '../../../AppStyles';
import DataLoading from './../DataLoading';
import ShowMoreBtn from './../ShowMoreBtn';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axios from '../../axios/axios';
import QNACard from './../QNACard';
import Entypo from 'react-native-vector-icons/Entypo';
import Constants from './../../../Constants';

const TrendingQNA = () => {
  const [loading, setLoading] = useState(true);
  const [qnasList, setQnasList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    findQNAs();
  }, []);

  const findQNAs = async () => {
    const fields = '_id,user,question,categories,createdAt,commentsCount';
    axios
      .get(`/qna?fields=${fields}&limit=5&sort=-createdAt`)
      .then(res => {
        const {data} = res.data;

        setQnasList(JSON.parse(data));
        setLoading(false);
        // console.log(data);
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

  //   if (loading) {
  //     return <DataLoading />;
  //   }
  return (
    <View style={styles.section}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={[AppStyles.headingH3, {marginBottom: 10}]}>
          Trending QnA' s
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddQNA');
          }}>
          <Text style={[AppStyles.body16, {color: Constants.colour.primary}]}>
            Ask one
            <Entypo name="chevron-right" size={18} />
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <DataLoading />
      ) : (
        <>
          <ScrollView>
            {qnasList.map(item => (
              <QNACard key={item._id} data={item} />
            ))}
            <ShowMoreBtn
              text="View more"
              onPress={() => navigation.navigate('QNA')}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default TrendingQNA;

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
});
