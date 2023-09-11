import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import BackButton from './../components/BackButton';
import AppStyles from '../../AppStyles';
import * as Animatable from 'react-native-animatable';
import PortableText from 'react-portable-text';
import {client, urlFor} from './../lib/client';
import DataLoading from './../components/DataLoading';
import {convertDateToFormat} from '../utils/util';

const {height, width} = Dimensions.get('window');

const BlogDetail = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState();

  useEffect(() => {
    createNavigation();
    BackHandler.addEventListener('hardwareBackPress', backAction);

    fetchBlog();
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    if (navigation.canGoBack() == false) {
      navigation.replace('Main');
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  };

  const fetchBlog = async () => {
    const blog_id = route.params.id;
    const query = `*[_type=="post" && _id=="${blog_id}"]{_id,_createdAt,mainImage,title,subtitle,"category":categories[0]->title,body}[0]`;
    const blogData = await client.fetch(query);
    setBlog(blogData);
    setLoading(false);
    // console.log(blogData);
  };

  const createNavigation = () => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.header}>
          <BackButton onPress={backAction} />
          {/* <Image source={{uri: img_url}} style={styles.profileImg} /> */}
          <Text style={AppStyles.headingH3} numberOfLines={1}>
            Blog
          </Text>
        </View>
      ),
    });
  };

  if (loading) {
    return <DataLoading />;
  }
  return (
    <ScrollView style={styles.container}>
      <Image style={styles.img} source={{uri: urlFor(blog.mainImage).url()}} />
      <Text style={AppStyles.headingH2}>{blog.title}</Text>
      <Animatable.Text
        animation={'fadeInUp'}
        duration={500}
        delay={200}
        style={[
          AppStyles.headingH5,
          {marginVertical: 5, textTransform: 'capitalize'},
        ]}>
        {blog.category}
      </Animatable.Text>
      <Animatable.Text
        animation={'fadeInUp'}
        duration={500}
        delay={300}
        style={[AppStyles.headingH5, {marginBottom: 15}]}>
        {convertDateToFormat(blog._createdAt)}
      </Animatable.Text>
      <Animatable.View animation={'fadeInUp'} duration={500} delay={400}>
        <PortableText
          // Pass in block content straight from Sanity.io
          content={blog.body}
          dataset={'production'}
          projectId={'nvdzs4p6'}
          // Optionally override marks, decorators, blocks, etc. in a flat
          // structure without doing any gymnastics
          serializers={{
            h1: props => (
              <Text
                style={[AppStyles.headingH2, {marginBottom: 10}]}
                {...props}
              />
            ),
            h2: props => (
              <Text
                style={[AppStyles.headingH2, {marginBottom: 10}]}
                {...props}
              />
            ),
            h3: props => (
              <Text
                style={[AppStyles.headingH2, {marginBottom: 10}]}
                {...props}
              />
            ),
            h4: props => (
              <Text
                style={[AppStyles.headingH2, {marginBottom: 10}]}
                {...props}
              />
            ),
            normal: props => (
              <Text
                style={[
                  AppStyles.body14,
                  {marginVertical: 10, textAlign: 'justify'},
                ]}
                {...props}
              />
            ),

            // someCustomType: YourComponent,
          }}
        />
      </Animatable.View>
      <View
        style={{
          paddingBottom: 40,
        }}
      />
    </ScrollView>
  );
};

export default BlogDetail;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: width,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  img: {
    width: '100%',
    height: 250,
    resizeMode: 'stretch',
    marginVertical: 10,
    // borderRadius: 5,
  },
});
