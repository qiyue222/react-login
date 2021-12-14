import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(0, 189, 171)',
    justifyContent: 'center',
  },
  body: {
    width: '92%',
    backgroundColor: 'rgb(243, 251, 251)',
    marginTop: 40,
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 55,
    fontSize: 14,
    alignItems: 'center',
  },
  headerLeft: {
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    textAlign: 'center',
    flex: 1,
  },
  logo: {
    width: '100%',
    height: 80,
  },
  form: {
    width: '100%',
  },
  formInput: {
    width: '100%',
    height: 55,
    marginTop: 7,
    borderBottomWidth: 1,
    borderColor: 'rgb(219,219,219)',
    borderStyle: 'solid',
  },
  forget: {
    fontSize: 15,
    flexDirection: 'row-reverse',
    marginTop: 21,
    marginBottom: 43,
    marginLeft: 19,
  },
  forgetText: {
    color: 'rgb(0, 189, 171)',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: 'rgb(0, 189, 171)',
    height: 47,
  },
  loginText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 47,
    textAlign: 'center',
  },
  checkbox: {
    borderColor: '#eee',
  },
  keepLogin: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  goToRegister: {
    fontSize: 15,
    color: 'rgb(0, 189, 171)',
  },
});
export default styles;
