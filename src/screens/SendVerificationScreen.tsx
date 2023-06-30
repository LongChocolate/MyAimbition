import {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, ToastAndroid, View, TextInput} from 'react-native';
import {CommonActions, StackActions} from '@react-navigation/native';

import {ButtonCustom} from '../components/Button/Button';
import Typography from '../components/Text/Typography';
import Header from '../layouts/Header';
import {colors} from '../styles/theme';
import firebaseAuthService from '../apis/authService';
import {RowView} from '../components/View/RowView';
import Validator from '../utils/validate';
import {NavigationScreens, VerifiedState} from '../utils/enum';
import {SafeAreaView} from 'react-native-safe-area-context';
// import Alert from '../components/Modal/Alert';

interface interCode {
    code: string;
}

const SendCodeVerificationScreen = ({navigation, route}: any) => {
    const lengthInput = 6;
    const defaultCountdown = 60;

    let clockCall: number = 0;

    let textInput = useRef(null);

    const [internalVal, setInternalVal] = useState<interCode>({code: ''});
    const [errors, setErrors] = useState({});

    const [isVisible, setIsVisible] = useState(false);
    const [countdown, setCountdown] = useState(defaultCountdown);
    const [enabledResend, setEnableResend] = useState(false);
    const [isSendOTP, setIsSendOTP] = useState(true);

    const [verified, setVerified] = useState<FirebaseAuthTypes.PhoneAuthSnapshot | null>(null);

    const [alreadyNavigate, setAlreadyNavigate] = useState(false);

    const verifiedSuccess = () => {
        firebaseAuthService.register(route.params.form);
        navigation.dispatch(StackActions.replace(NavigationScreens.RegisterSuccess));
    };

    const sendOTP = async () => {
        const confirm = await firebaseAuthService.verifyPhoneNumber('+84' + route.params.form.phone);
        if (confirm) {
            if (confirm.state === VerifiedState.verified) {
                setInternalVal({code: confirm.code});

                const waitNavigate = setInterval(() => {
                    setAlreadyNavigate(true);
                }, 1000);

                return () => {
                    clearInterval(waitNavigate);
                    verifiedSuccess();
                };
            } else {
                setVerified(confirm);
            }
        } else {
            setIsVisible(true);
        }
    };

    if (isSendOTP) {
        setIsSendOTP(false);
        sendOTP();
    }

    const handleChangeText = (name: string, value: string) => {
        if (!!value) {
            setErrors((prev) => {
                return {...prev, [name]: null};
            });
            setInternalVal((prev) => {
                return {...prev, [name]: value};
            });
        } else {
            setInternalVal((prev) => {
                return {...prev, [name]: ''};
            });
        }
    };

    const confirmOTP = () => {
        const checkSubmit = async () => {
            const checkOTP = [
                Validator.isConfirmed('code', verified.code, 'Mã OTP'),
                Validator.isLength('code', 6, 'Mã OTP'),
                Validator.isRequired('code', 'Mã OTP'),
            ];

            const result = await Validator(internalVal, checkOTP);

            if (result.status) {
                verifiedSuccess();
            } else {
                setErrors(result.error);
                setIsVisible(true);
            }
        };
        checkSubmit();
    };

    const decrementClock = () => {
        if (countdown === 0 || alreadyNavigate) {
            setEnableResend(true);
            setCountdown(0);
            clearInterval(clockCall);
        } else {
            setCountdown(countdown - 1);
        }
    };

    const resendOTP = () => {
        setEnableResend(false);
        setCountdown(defaultCountdown);
    };

    const renderAlert = () => {
        // return (
        //     <Alert
        //         isVisible={isVisible}
        //         closeModal={() => setIsVisible}
        //         title={'Xác nhận mã OTP'}
        //         message={'Bạn đã gửi yêu cầu quá nhiều lần ! Vui lòng quay lại sau'}
        //     />
        // );
    };

    useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock();
        }, 1000);

        return () => {
            clearInterval(clockCall);
        };
    }, [countdown]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
            <Header back title="Xác nhận đăng nhập" size={18} onBack={() => navigation.goBack()} />

            <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={'padding'} style={styles.containerAvoidingView}>
                <View style={{alignSelf: 'center', paddingVertical: 10}}>
                    <Typography darkGrey size16 center lineHeight={30}>
                        Nhập "Mã xác nhận" từ thiết bị điện thoại của bạn.
                    </Typography>
                </View>
                <View>
                    <TextInput
                        ref={(input) => (textInput = input)}
                        value={internalVal.code}
                        onChangeText={(value) => handleChangeText('code', value)}
                        style={{width: 0, height: 0}}
                        maxLength={lengthInput}
                        keyboardType="numeric"
                        autoFocus
                        focusable={true}
                    />
                    <RowView justifyContent="center">
                        {Array(lengthInput)
                            .fill()
                            .map((data, index) => {
                                return (
                                    <View
                                        style={[
                                            styles.cellView,
                                            {
                                                borderColor:
                                                    index === internalVal.code.length ? colors.primary : colors.grey,
                                            },
                                        ]}
                                        key={index}>
                                        <Typography
                                            size16
                                            center
                                            black
                                            onPress={() => textInput.focus()}
                                            style={styles.cellText}>
                                            {internalVal.code.length > 0 ? internalVal.code[index] : ''}
                                        </Typography>
                                    </View>
                                );
                            })}
                    </RowView>
                </View>

                <Typography
                    size16
                    color={enabledResend ? colors.primary : colors.lightGrey}
                    bold
                    style={{paddingVertical: 20}}
                    onPress={() => resendOTP()}>
                    Gửi lại mã OTP ({countdown})
                </Typography>

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
                        containerStyle={{
                            backgroundColor: colors.primary,
                            padding: 10,
                            borderRadius: 10,
                        }}
                        onPress={() => confirmOTP()}>
                        <Typography white bold size18>
                            Tiếp theo
                        </Typography>
                    </ButtonCustom>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerAvoidingView: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    cellView: {
        paddingVertical: 2,
        width: 40,

        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        backgroundColor: colors.lightGrey,
    },

    cellText: {
        width: 40,
        padding: 10,
    },
});

export default SendCodeVerificationScreen;
