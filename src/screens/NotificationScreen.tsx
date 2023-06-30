import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../styles/theme';
import Header from '../layouts/Header';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const NotificationScreen = ({route}: any) => {
    return (
        <SafeAreaView
            style={{flex: 1, paddingBottom: useBottomTabBarHeight() + 10, backgroundColor: colors.lightGreen}}>
            <Header title="Thông báo" />
        </SafeAreaView>
    );
};

export default NotificationScreen;
