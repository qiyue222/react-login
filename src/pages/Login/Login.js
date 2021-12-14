import React, {useState, Component} from 'react';
import styles from './LoginStyle';
import Frisbee from 'frisbee';
import querystring from 'querystring';
import MD5 from 'react-native-md5';
import Checkbox from 'react-native-check-box';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// 全局变量
const api = new Frisbee({
  baseURI: 'https://gateway.mwuat.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    sysId: 1,
  },
});
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      check: true,
      username: '',
      password: '',
    };
  }
  login = async () => {
    try {
      let res = await api.post('/login', {
        body: querystring.stringify({
          username: this.state.username,
          password: MD5.hex_md5(this.state.password),
        }),
      });
      if (res.err) throw res.err;
      global.token = `${res.body.data.token}`;
      this.props.navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <View style={styles.login}>
        <View style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.headerLeft}>账号登录</Text>
            <Text style={styles.headerRight}>手机号登录</Text>
          </View>
          <Image
            source={require('../../public/meiwu.png')}
            style={styles.logo}></Image>
          <View style={styles.form}>
            <TextInput
              style={styles.formInput}
              placeholder="请输入账号"
              value={this.username}
              onChangeText={text => this.setState({username: text})}
            />
            <TextInput
              style={styles.formInput}
              placeholder="请输入密码"
              textContentType="password"
              keyboardType="default"
              secureTextEntry={true}
              value={this.password}
              onChangeText={text => this.setState({password: text})}
            />
          </View>
          <TouchableOpacity style={styles.forget}>
            <Text style={styles.forgetText}>忘记密码</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} activeOpacity={0.7}>
            <Text style={styles.loginText} onPress={this.login}>
              登录
            </Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <View style={styles.keepLogin}>
              <Checkbox
                isChecked={this.state.check}
                onPress={() => this.setState({check: !this.state.check})}
              />
              <Text>保持登录</Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.goToRegister}>没有账号，去注册</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
// const Login = () => {
//   const [check, setCheck] = useState(true);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   login = async props => {
//     try {
//       let res = await api.post('/login', {
//         body: querystring.stringify({
//           username,
//           password: MD5.hex_md5(password),
//         }),
//       });
//       if (res.err) throw res.err;
//       console.log(res);
//       console.log(res.body.data.token);
//       const storeData = async res => {
//         try {
//           await AsyncStorage.setItem('token', res.body.data.token);
//         } catch (e) {
//           // saving error
//         }
//       };
//       console.log(props);
//       console.log(props.navigation);
//       props.navigation.navigate('Home');
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <View style={styles.login}>
//       <View style={styles.body}>
//         <View style={styles.header}>
//           <Text style={styles.headerLeft}>账号登录</Text>
//           <Text style={styles.headerRight}>手机号登录</Text>
//         </View>
//         <Image
//           source={require('../../public/meiwu.png')}
//           style={styles.logo}></Image>
//         <View style={styles.form}>
//           <TextInput
//             style={styles.formInput}
//             placeholder="请输入账号"
//             value={username}
//             onChangeText={text => setUsername(text)}
//           />
//           <TextInput
//             style={styles.formInput}
//             placeholder="请输入密码"
//             value={password}
//             onChangeText={text => setPassword(text)}
//           />
//         </View>
//         <TouchableOpacity style={styles.forget}>
//           <Text style={styles.forgetText}>忘记密码</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.loginBtn} activeOpacity={0.7}>
//           <Text style={styles.loginText} onPress={this.login}>
//             登录
//           </Text>
//         </TouchableOpacity>
//         <View style={styles.footer}>
//           <View style={styles.keepLogin}>
//             <Checkbox isChecked={check} onClick={() => setCheck(!check)} />
//             <Text>保持登录</Text>
//           </View>

//           <TouchableOpacity>
//             <Text style={styles.goToRegister}>没有账号，去注册</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

export default Login;
