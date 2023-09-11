import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AppStyles from '../../../AppStyles';
import {client} from './../../lib/client';
import DataLoading from './../DataLoading';
import BlogCard from './../BlogCard';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const BlogsSection = props => {
  const {user} = props;
  const [fetchingBlogs, setFetchingBlogs] = useState(true);
  const [blogsData, setBlogsData] = useState([]);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    // const noInterestQuery = `*[_type=="post"]{_id,_createdAt,mainImage,title,subtitle}|order(_createdAt desc)[0...5]`;
    var query = '';
    // console.log(user.interests);
    var interests = user.interests;
    interests = interests.map(x => x.toLowerCase());
    if (user.interests.length == 0) {
      query = `*[_type=="post"]{_id,_createdAt,mainImage,title,subtitle}[0...5]`;
    } else {
      query = `*[_type=="post" && categories[0]->title in $interests]{_id,_createdAt,mainImage,title,subtitle}|order(_createdAt )[0...5]`;
    }
    try {
      const response = await client.fetch(query, {interests});
      // console.log(response);
      setFetchingBlogs(false);
      setBlogsData(response);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error occured while fetching blogs',
        text2: '' + error,
        onPress: () => {
          Toast.hide();
        },
      });
    }
  };

  return (
    <View style={styles.section}>
      <Text style={[AppStyles.headingH3, {marginBottom: 10}]}>
        Blogs for you
      </Text>
      {fetchingBlogs == true ? (
        <DataLoading />
      ) : (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {blogsData.map(blog => (
            <BlogCard key={blog._id} data={blog} width={width - 80} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default BlogsSection;

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
});
