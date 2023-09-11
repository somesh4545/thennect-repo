import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    height: '100%',
  },
  appTitle: {
    fontSize: 50,
    color: '#fff',
    fontFamily: 'DMSans-Bold',
  },
  headingH1: {
    fontSize: 40,
    fontFamily: 'DMSans-Bold',
  },
  headingH2: {
    fontSize: 25,
    fontFamily: 'DMSans-Bold',
  },
  headingH3: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
    textTransform: 'none',
  },
  headingH5: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    textTransform: 'none',
  },
  body12: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
  },
  body14: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
  },
  body16: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
  },
  body16Bold: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'DMSans-Bold',
  },
  link: {
    fontSize: 12,
    color: '#0029FF',
    fontFamily: 'DMSans-Regular',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    // display: 'flex',
    flexDirection: 'row',
  },
  error: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'DMSans-Regular',
    marginTop: -5,
    // lineHeight: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: width,
    elevation: 10,
  },
});
