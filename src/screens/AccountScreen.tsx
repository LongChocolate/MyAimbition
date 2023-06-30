import {faGear} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {imageDefault} from '../assets/images';
import {ButtonCustom} from '../components/Button/Button';
import {ImageView} from '../components/Image/ImageDefault';
import Typography from '../components/Text/Typography';
import Header from '../layouts/Header';
import {SCREEN_HEIGHT} from '../styles/dimensions';
import {colors} from '../styles/theme';

const AccountScreen = ({route}: any) => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'space-between', backgroundColor: colors.white}}>
            <View style={{height: SCREEN_HEIGHT - 130, paddingHorizontal: 10}}>
                <Header title="Tài khoản">
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <ButtonCustom>
                            <FontAwesomeIcon icon={faGear} size={20} />
                        </ButtonCustom>
                    </View>
                </Header>
                <ImageView
                    containerStyle={{height: 100, width: 100, alignSelf: 'center', marginTop: 20}}
                    image={imageDefault.noAvatar}
                    mode="stretch"
                    border
                />
                <View style={{marginVertical: 20}}>
                    <ButtonCustom
                        containerStyle={{backgroundColor: colors.primary}}
                        rounded
                        >
                        <Typography white size16 bold>
                            Đăng xuất
                        </Typography>
                    </ButtonCustom>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default AccountScreen;
