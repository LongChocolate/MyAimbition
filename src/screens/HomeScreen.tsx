import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ButtonCustom} from '../components/Button/Button';
import Typography from '../components/Text/Typography';
import Header from '../layouts/Header';
import {colors} from '../styles/theme';

const HomeScreen = ({route}: any) => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.lightGreen}}>
            <Header title="Trang chủ">
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <ButtonCustom>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={20} />
                    </ButtonCustom>
                </View>
            </Header>
        </SafeAreaView>
    );
};

export default HomeScreen;
