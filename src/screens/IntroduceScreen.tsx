import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {imageDefault} from '../assets/images';
import {ButtonCustom} from '../components/Button/Button';
import Typography from '../components/Text/Typography';
import Header from '../layouts/Header';
import {colors} from '../styles/theme';
import {NavigationScreens} from '../utils/enum';

const IntroduceScreen = ({navigation, route}: any) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.white,
                paddingHorizontal: 15,
                paddingVertical: 50,
            }}>
            <Image style={{height: 350, width: '100%'}} source={imageDefault.logoImage} resizeMode="stretch" />

            <View style={{width: '80%', alignSelf: 'center', padding: 10}}>
                <Typography darkGrey size={20} center bold lineHeight={30}>
                    Chúng tôi luôn đồng hành cùng hành trình của bạn
                </Typography>
            </View>
            <View
                style={{
                    position: 'absolute',
                    left: 15,
                    right: 15,
                    bottom: 20,
                    height: 60,
                    justifyContent: 'center',
                    marginHorizontal: 10,
                }}>
                <ButtonCustom
                    containerStyle={{backgroundColor: colors.primary, padding: 10, borderRadius: 10}}
                    onPress={() => navigation.navigate(NavigationScreens.Login)}>
                    <Typography white bold size18>
                        Bắt Đầu
                    </Typography>
                </ButtonCustom>
            </View>
        </SafeAreaView>
    );
};

export default IntroduceScreen;
