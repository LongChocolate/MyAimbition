import {StackActions} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {StyleSheet, ToastAndroid, View, ScrollView, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firebaseAuthService from '../apis/authService';
// import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
// import firebaseAuthService from '../apis/authService';

import {ButtonCustom} from '../components/Button/Button';
import Button from '../components/Button/MyButton';
import {ElInput} from '../components/Input/ElInput';
import Typography from '../components/Text/Typography';
import {RowView} from '../components/View/RowView';
import Header from '../layouts/Header';
import {boxShadow, colors} from '../styles/theme';
import {NavigationScreens} from '../utils/enum';
import {registerForm} from '../utils/interface';
import Validator from '../utils/validate';

const defaultForm: registerForm = {
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    email: '',
};

const RegisterScreen = ({navigation, route}: any) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<registerForm>(defaultForm);
    const [errors, setErrors] = useState(defaultForm);

    const handleChangeValue = (name: string, value: string): any => {
        if (!!value) {
            setErrors((prev) => {
                return {...prev, [name]: null};
            });
            setForm((prev) => {
                return {...prev, [name]: value};
            });
        } else {
            setForm((prev) => {
                return {...prev, [name]: ''};
            });
        }
    };

    const handleBlur = useCallback(
        (name: string) => {
            const result = Validator(form, [Validator.isRequired(name)]);
            setErrors((prev) => {
                return {...prev, [name]: result.error[name]};
            });
        },
        [form],
    );

    const handleRegister = useCallback(() => {
        const checkSubmit = async () => {
            const checkAccount = [
                Validator.isRequired('phone', 'Số điện thoại'),
                Validator.isNumberPhoneVN('phone', 'Số điện thoại'),
                Validator.isRequired('name', 'Họ tên'),
                Validator.isChar('name', 'Họ tên'),

                Validator.isRequired('password', 'Mật khẩu'),
                Validator.isLength('password', 6, 'Mật khẩu'),

                Validator.isRequired('confirmPassword', 'Mật khẩu xác nhận'),
                Validator.isLength('confirmPassword', 6, 'Mật khẩu xác nhận'),

                Validator.isRequired('email', 'Email'),
                Validator.isEmail('email', 'Email'),
            ];

            const result = await Validator(form, [...checkAccount]);

            if (result.status) {
                setLoading(true);

                const isExist = await firebaseAuthService.isExistPhone(form.phone);

                setLoading(false);

                if (isExist) {
                    setErrors((prev) => {
                        return {...prev, phone: 'Số điện thoại này đã được đăng kí!.'};
                    });
                } else {
                    navigation.dispatch(StackActions.replace(NavigationScreens.SendCodeVerification, {form: form}));
                }
            } else {
                setErrors(result.error);
            }
        };
        checkSubmit();
    }, [form]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
            <Header back title="Đăng kí tài khoản" size={18} onBack={() => navigation.goBack()} />

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                <View style={styles.container}>
                    <ElInput
                        label="Họ và tên"
                        placeholder="Nhập họ tên "
                        containerStyle={styles.containerInput}
                        onChangeText={(value) => handleChangeValue('name', value)}
                        onBlur={() => handleBlur('name')}
                        showRequire
                        errorMessage={errors.name}
                        value={form.name}
                    />
                    <ElInput
                        label="Số điện thoại"
                        placeholder="Nhập SĐT"
                        containerStyle={styles.containerInput}
                        onChangeText={(value) => handleChangeValue('phone', value)}
                        onBlur={() => handleBlur('phone')}
                        showRequire
                        keyboardType="phone-pad"
                        maxLength={10}
                        errorMessage={errors.phone}
                        value={form.phone}
                    />

                    <ElInput
                        label="Mật khẩu"
                        placeholder="Mật khẩu"
                        containerStyle={styles.containerInput}
                        onChangeText={(value) => handleChangeValue('password', value)}
                        onBlur={() => handleBlur('password')}
                        secureTextEntry
                        showRequire
                        errorMessage={errors.password}
                        value={form.password}
                    />
                    <ElInput
                        label="Nhập lại mật khẩu"
                        placeholder="Mật khẩu xác nhận"
                        containerStyle={styles.containerInput}
                        onChangeText={(value) => handleChangeValue('confirmPassword', value)}
                        onBlur={() => handleBlur('confirmPassword')}
                        secureTextEntry
                        showRequire
                        errorMessage={errors.confirmPassword}
                        value={form.confirmPassword}
                    />

                    <ElInput
                        label="Email"
                        placeholder="example@domain.com"
                        containerStyle={styles.containerInput}
                        onChangeText={(value) => handleChangeValue('email', value)}
                        onBlur={() => handleBlur('email')}
                        showRequire
                        errorMessage={errors.email}
                        value={form.email}
                    />

                    <ButtonCustom containerStyle={styles.containerBtnRegister} onPress={() => handleRegister()}>
                        {loading ? (
                            <View
                                style={{
                                    flex: 1,
                                    marginVertical: 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <ActivityIndicator size="small" color={colors.white} />
                            </View>
                        ) : (
                            <Typography white bold>
                                Đăng ký
                            </Typography>
                        )}
                    </ButtonCustom>

                    <RowView style={styles.containerLogin}>
                        <Typography center lineHeight={16.41} size14 darkGrey>
                            Bạn đã có tài khoản?
                        </Typography>
                        <ButtonCustom>
                            <Typography center lineHeight={16.41} size14 primary>
                                Đăng nhập ngay
                            </Typography>
                        </ButtonCustom>
                    </RowView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        borderRadius: 14,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: colors.white,
    },
    //input
    containerInput: {
        marginBottom: 10,
    },

    // Btn Register
    containerBtnRegister: {
        marginVertical: 20,
        backgroundColor: colors.primary,
        borderRadius: 10,
    },

    // Login

    containerLogin: {
        justifyContent: 'center',
    },
});

export default RegisterScreen;
