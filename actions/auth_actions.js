import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';

// AsyncStorage.setItem('token', token)
// AsyncStorage.getItem('token') - similar to localStorage in browser

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');

  if (token) {
    // dispatch action for successful login
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
  } else {
    // start fb login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('1112859635524885', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
};
