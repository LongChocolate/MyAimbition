import {faXmarkCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, ScrollView, KeyboardAvoidingView} from 'react-native';
// import auth from '@react-native-firebase/auth';

import {ButtonCustom} from '../components/Button/Button';
import {ElInput} from '../components/Input/ElInput';
import Typography from '../components/Text/Typography';
import {RowView} from '../components/View/RowView';
import {boxShadow, colors} from '../styles/theme';
import {NavigationScreens} from '../utils/enum';
import Validator from '../utils/validate';
import {SafeAreaView} from 'react-native-safe-area-context';
import {imageDefault} from '../assets/images';
import {ImageView} from '../components/Image/ImageDefault';
import {loginForm} from '../utils/interface';
// import firebaseAuthService from '../apis/authService';

const defaultForm: loginForm = {phone: '', password: ''};

const LoginScreen = ({navigation, route}: any) => {
    const [phoneValue, setPhoneValue] = useState<loginForm>(defaultForm);

    const [errors, setErrors] = useState(defaultForm);
    const [checkClear, setCheckClear] = useState(false);

    const handleChangeValue = (name: string, value: string) => {
        if (!!value) {
            setErrors((prev) => {
                return {...prev, [name]: null};
            });
            setPhoneValue((prev) => {
                return {...prev, [name]: value};
            });
            setCheckClear(true);
        } else {
            setPhoneValue((prev) => {
                return {...prev, [name]: ''};
            });
            setCheckClear(false);
        }
    };

    const handleSubbmit = async () => {
        const result = await Validator(phoneValue, [
            Validator.isRequired('phone', 'Số điện thoại'),
            Validator.isLength('phone', 9, 'Số điện thoại'),
        ]);
        setErrors(result.error);
        if (result.status) {
            signInWithPhoneNumber(phoneValue.phone);
        } else {
            signInWithPhoneNumber(phoneValue.phone);
        }
    };

    async function signInWithPhoneNumber(phoneNumber: string) {
        navigation.navigate(NavigationScreens.SendCodeVerification);
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGrey}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: 50}}>
                <View style={styles.container}>
                    <ImageView
                        containerStyle={{height: 250, width: '100%'}}
                        image={imageDefault.loginImage}
                        mode="stretch"
                    />
                    <ElInput
                        value={phoneValue.phone}
                        onChangeText={(value) => handleChangeValue('phone', value)}
                        label="Số điện thoại"
                        inputStyle={{backgroundColor: colors.white, marginBottom: 10}}
                        placeholder={'e.g. +84'}
                        componentRight={
                            checkClear ? (
                                <ButtonCustom onPress={() => handleChangeValue('phone', '')}>
                                    <FontAwesomeIcon icon={faXmarkCircle} size={24} />
                                </ButtonCustom>
                            ) : (
                                <></>
                            )
                        }
                        errorMessage={errors.phone && errors.phone}
                        keyboardType="phone-pad"
                        maxLength={10}
                    />
                    <ElInput
                        value={phoneValue.password}
                        onChangeText={(value) => handleChangeValue('password', value)}
                        label="Mật khẩu"
                        inputStyle={{backgroundColor: colors.white}}
                        placeholder={'*******'}
                        errorMessage={errors.password && errors.password}
                        secureTextEntry
                    />

                    <RowView style={{marginVertical: 20}}>
                        <Typography size14 black>
                            Bạn chưa đăng kí?
                        </Typography>
                        <Typography
                            size16
                            primary
                            bold
                            style={{paddingHorizontal: 10}}
                            onPress={() => navigation.navigate(NavigationScreens.Register)}>
                            Đăng kí ngay
                        </Typography>
                    </RowView>

                    <View
                        style={{
                            height: 60,
                            justifyContent: 'center',
                        }}>
                        <ButtonCustom
                            containerStyle={{backgroundColor: colors.primary, padding: 10, borderRadius: 10}}
                            onPress={() => handleSubbmit()}>
                            <Typography white bold size18>
                                Đăng nhập
                            </Typography>
                        </ButtonCustom>
                    </View>
                </View>
                {/* <Image style={{height: 250, width: '100%'}} source={imageDefault.loginImage} resizeMode="stretch" /> */}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 20,
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: colors.white,

        ...boxShadow(colors.darkGrey),
    },
});
export default LoginScreen;
