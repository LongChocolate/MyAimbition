import {Image, StyleSheet, View} from 'react-native';
import React from 'react';

import Typography from '../components/Text/Typography';
import Button from '../components/Button/MyButton';
import {NavigationScreens} from '../utils/enum';
import {imageDefault} from '../assets/images';
import {StackActions} from '@react-navigation/native';

const RegisterSuccessScreen = ({navigation, route}: any) => {
    return (
        <View style={{marginVertical: 50, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center'}}>
            <Typography bold size18 lineHeight={25} uppercase primary style={styles.titleRegisterSuccess}>
                tạo tài khoản thành công
            </Typography>
            <Image
                style={{height: 350, width: '100%'}}
                source={imageDefault.registerSuccessImage}
                resizeMode="stretch"
            />

            <Typography lineHeight={20} size14 center darkGrey bold>
                Cảm ơn bạn đã đăng ký tài khoản. Bạn có thể đăng nhập ngay bây giờ
            </Typography>

            <Button
                title="Trở lại đăng nhập"
                containerStyle={styles.containerBtnGoBackLogin}
                onPress={() => navigation.dispatch(StackActions.replace(NavigationScreens.Login))}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    // Icon
    containerIconSuccess: {
        marginBottom: 20,
    },

    //title
    titleRegisterSuccess: {
        marginVertical: 10,
    },

    // Btn goBack Login
    containerBtnGoBackLogin: {
        width: 200,
        borderRadius: 7,
        marginTop: 20,
    },
});

export default RegisterSuccessScreen;
