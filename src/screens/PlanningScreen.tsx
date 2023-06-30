import {faFileLines} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react';
import React, {useState, useEffect} from 'react';

import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firebasePlanningService from '../apis/PlanningService';
import PlanningView from '../components/Planning';
import Typography from '../components/Text/Typography';
import Header from '../layouts/Header';
import {planningStore} from '../stores/PlanningStore';
import {boxShadow, colors} from '../styles/theme';
import {NavigationScreens} from '../utils/enum';

const Planning = observer(({navigation, route}: any) => {
    useEffect(() => {
        firebasePlanningService.getPlanning();
    }, []);

    return (
        <SafeAreaView
            style={{flex: 1, paddingBottom: useBottomTabBarHeight() + 10, backgroundColor: colors.lightGreen}}>
            <Header title="Kế hoạch" />
            {planningStore.getLoading ? (
                <View
                    style={{
                        flex: 1,
                        marginVertical: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ActivityIndicator size="large" color={colors.darkGrey} />
                </View>
            ) : planningStore.getPlanning.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 10}}>
                    {planningStore.getPlanning.map((plan, index) => {
                        return (
                            <PlanningView
                                plan={plan}
                                key={index}
                                onPress={() =>
                                    navigation.navigate(NavigationScreens.Timeline, {timeline: plan.timeline})
                                }
                            />
                        );
                    })}
                </ScrollView>
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <FontAwesomeIcon icon={faFileLines} color={colors.black} size={150} />
                    <Typography size16 lineHeight={19} darkGrey center style={{marginTop: 20}} bold>
                        Chưa có kết quả nào
                    </Typography>
                </View>
            )}
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    groupResult: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 14,
        borderColor: colors.darkGrey,

        backgroundColor: colors.white,

        ...boxShadow(colors.darkGrey),
    },
});
export default Planning;
