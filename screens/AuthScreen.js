import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';

import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete(this.props); // just in case use already authenticated
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps); // when token is  updated in the state (rerender  )
  }

  onAuthComplete(props) {
    if(props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token
  }
}

export default connect(mapStateToProps, actions)(AuthScreen);
