import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

import AppStyles from '../../AppStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BlogCard from './../components/BlogCard';
import DataLoading from './../components/DataLoading';
import {client} from './../lib/client';
import Toast from 'react-native-toast-message';
import GradientText from './../components/GradientText';

const {width, height} = Dimensions.get('window');

const Blogs = () => {
  const [startID, setStartID] = useState(0);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loadMore, setLoadMore] = useState(true);

  useEffect(() => {
    fetchTrendingBlogs();
    fetchAllBlogs();
  }, []);

  const fetchTrendingBlogs = async () => {
    const query = `*[_type=="post"]{_id,_createdAt,mainImage,title,subtitle}[0...5]`;
    // if(user.)
    try {
      const response = await client.fetch(query, {});
      // console.log(response);
      setTrendingBlogs(response);
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error occured while fetching blogs',
        text2: '' + error,
        onPress: () => {
          Toast.hide();
        },
        position: 'bottom',
      });
    }
  };

  const fetchAllBlogs = async () => {
    var endID = startID + 16;
    const query = `*[_type=="post"]{_id,_createdAt,mainImage,title,subtitle}|order(_createdAt desc)[$startID...$endID]`;
    // const query = `*[_type=="post"]{_id,_createdAt,mainImage,title,subtitle}|order(_createdAt desc)[0...2]`;
    try {
      const response = await client.fetch(query, {startID, endID});
      if (response.length == 0) {
        setLoadMore(false);
      }
      response.map(blog => {
        setAllBlogs(prev => [...prev, blog]);
      });
      if (response.length < 16) setLoadMore(false);
      setStartID(endID);
    } catch (error) {
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
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GradientText
          text={'Blogs'}
          style={[AppStyles.headingH2, {marginBottom: 20}]}
        />
        {/* <TouchableOpacity style={styles.searchBox}>
          <FontAwesome name="search" size={18} color={'#000'} />
        </TouchableOpacity> */}
      </View>
      {/* blogs for you section */}
      <ScrollView>
        <View style={styles.section}>
          <Text style={[AppStyles.headingH3, {marginBottom: 10}]}>
            Trending blogs
          </Text>
          {trendingBlogs.length == 0 ? (
            <DataLoading />
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {trendingBlogs.map(blog => (
                <BlogCard key={blog._id} data={blog} width={width - 80} />
              ))}
            </ScrollView>
          )}
        </View>
        <ScrollView style={{marginTop: 20}}>
          <Text style={[AppStyles.headingH3]}>All blogs</Text>
          <View>
            {allBlogs.length == 0 ? (
              <DataLoading />
            ) : (
              <>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.blogsContainer}>
                    {allBlogs.map(blog => (
                      <View key={blog._id} style={{marginBottom: 15}}>
                        <BlogCard
                          key={blog._id}
                          data={blog}
                          width={(width - 40) / 2}
                        />
                      </View>
                    ))}
                  </View>
                </ScrollView>
                {loadMore ? (
                  <View
                    style={[
                      AppStyles.center,
                      {marginVertical: 10, marginBottom: 20},
                    ]}>
                    <TouchableOpacity onPress={fetchAllBlogs}>
                      <Text>Load more</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </>
            )}
          </View>
          <View style={{paddingBottom: 70}} />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Blogs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    backgroundColor: '#fff',
  },
  blogsContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
