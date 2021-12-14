import React, {Component} from 'react';
import Route from './src/router/index';
import {View} from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={{flexGrow: 1}}>
        <Route />
      </View>
    );
  }
  componentDidMount() {
    global = {};
  }
}

export default App;
