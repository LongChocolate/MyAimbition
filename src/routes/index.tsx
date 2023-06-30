import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AuthNavigator from './AuthRoute';
import HomeNavigator from './HomeRoute';
import {observer} from 'mobx-react';
import {userStore} from '../stores/UserStore';
import AdvertiseScreen from '../screens/Advertise';

const RootNavigator = observer(() => {
    const isLogin = userStore.getLogin;

    return <NavigationContainer>{isLogin ? <HomeNavigator /> : <AuthNavigator />}</NavigationContainer>;
});

export default RootNavigator;
