import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Animated, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Typography from '../components/Text/Typography';
import {RowView} from '../components/View/RowView';
import Header from '../layouts/Header';
import {listTimelineStore} from '../stores/ListTimelineStore';
import {SCREEN_HEIGHT} from '../styles/dimensions';

import {boxShadow, colors} from '../styles/theme';
import {ITimeline} from '../types/timelinePlaning';
import {StatePlanning} from '../utils/enum';

const TimelineScreen = observer(({navigation, route}: any) => {
    useEffect(() => {
        listTimelineStore.set(route.params.timeline);
    }, [route]);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
            <Header back title="Dòng thời gian" size={18} onBack={() => navigation.goBack()} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, paddingHorizontal: 20}}>
                    {
                        <View style={{justifyContent: 'center'}}>
                            {listTimelineStore.getTimeline.map((day, index) => {
                                return (
                                    <View key={index}>
                                        <RowView style={{marginTop: index == 0 ? 0 : 50, marginBottom: 50}}>
                                            <View
                                                style={{
                                                    height: 12,
                                                    width: 12,

                                                    backgroundColor:
                                                        day.state == StatePlanning.InProcess
                                                            ? colors.primary
                                                            : colors.grey,
                                                    borderRadius: 999,
                                                }}></View>
                                            <Typography size14 primary bold style={{marginLeft: 10}}>
                                                {day.dateTime}
                                            </Typography>
                                        </RowView>
                                    </View>
                                );
                            })}
                        </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        borderRadius: 14,
        backgroundColor: colors.white,

        ...boxShadow(colors.darkGrey),
    },
});

export default TimelineScreen;
