import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {SCREEN_HEIGHT} from '../styles/dimensions';
import {colors} from '../styles/theme';
import {htmlCode} from '../assets/html';
const AdvertiseScreen = ({route}: any) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
            <WebView
                useWebKit={true}
                showsVerticalScrollIndicator={false}
                originWhitelist={['*']}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
                source={{html: htmlCode.chirstmas}}
                scalesPageToFit={true}
            />
        </SafeAreaView>
    );
};

export default AdvertiseScreen;
