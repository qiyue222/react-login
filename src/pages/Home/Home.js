import React, {Component} from 'react';
import api from '../../api/api';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import styles from './HomeStyle';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemList: [],
      isRefreshing: false, //是否在加载中
      currentPage: 1, // 当前页面
      pageSize: 20, // 每页条数
      hasMore: true, // 控制上拉加载，
      showFoot: 0, //1:没有更多数据，2:正在加载
    };
  }
  initList = async () => {
    const token = global.token || '';
    try {
      let res = await api.get(
        '/userAccount/userAccount/staffList?&systemType=surmax_type&status=&rel=%2FuserAccount%2FuserAccount%2Fsurmax%2Fsearch' +
          `&pageIndex=${this.state.currentPage}&pageSize=${this.state.pageSize}`,
        {
          headers: {Authorization: `Bearer ${token}`},
          // body: {
          //   pageIndex: this.state.currentPage,
          //   pageSize: this.state.pageSize,
          //   systemType: 'surmax_type',
          //   rel: '/userAccount/userAccount/surmax/search',
          // },
        },
      );
      if (res.err) throw res.err;
      console.log(res);
      if (res.body.data.itemList.length < this.state.pageSize) {
        this.setState({hasMore: false});
        this.setState({showFoot: 1});
      }
      console.log(this.state.hasMore);
      //判断上拉或下拉返回数组的值
      if (this.state.currentPage === 1) {
        this.setState({itemList: res.body.data.itemList, isRefreshing: false});
      } else {
        this.setState({
          itemList: [...this.state.itemList, ...res.body.data.itemList],
        });
      }
      console.log('获取成功');
    } catch (err) {
      console.log(err);
    }
  };
  componentDidMount() {
    this.initList();
  }
  //上拉加载更多
  _onEndReached = () => {
    console.log('上拉加载更多被触发了');
    let that = this;
    if (this.state.hasMore) {
      that.setState({currentPage: that.state.currentPage + 1}, () => {
        that.initList();
      });
      console.log(this.state.currentPage);
    } else {
      return;
    }
  };
  //下拉刷新
  _onRefresh = () => {
    console.log('下拉刷新被触发了');
    let that = this;
    if (!that.state.refresh) {
      that.setState({currentPage: 1, itemList: [], isRefreshing: false}, () => {
        that.initList();
      });
    }
  };
  //底部渲染
  _renderFooter() {
    if (this.state.showFoot === 1) {
      return (
        <View
          style={{
            height: 30,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              color: '#999999',
              fontSize: 14,
              marginTop: 5,
              marginBottom: 5,
            }}>
            没有更多数据了
          </Text>
        </View>
      );
    } else if (this.state.showFoot === 2) {
      return (
        <View>
          <ActivityIndicator />
          <Text>正在加载...</Text>
        </View>
      );
    } else if (this.state.showFoot === 0) {
      return (
        <View>
          <Text></Text>
        </View>
      );
    }
  }
  _separator() {
    return <View style={{height: 1}} />;
  }
  renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>员工名：{item.staffName}</Text>
        <Text style={styles.title}>员工号：{item.staffNo}</Text>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.itemList}
          renderItem={this.renderItem}
          keyExtractor={item => item.staffId}
          //默认每页渲染数据
          initialNumToRender={20}
          ItemSeparatorComponent={this._separator}
          //上拉加载
          onEndReached={this._onEndReached.bind(this)}
          //距离底部多远的地方进行加载
          onEndReachedThreshold={0.2}
          // 下拉刷新
          onRefresh={this._onRefresh.bind(this)}
          refreshing={this.state.isRefreshing}
          ListFooterComponent={this._renderFooter.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

export default Home;
