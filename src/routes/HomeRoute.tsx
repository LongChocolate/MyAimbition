import React from 'react';
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';

import {NavigationScreens} from '../utils/enum';
import BottomTabsNavigator from './BottomTabRoute';
import TimelineScreen from '../screens/TimelineScreen';

const HomeStack = createStackNavigator();

const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({current, next, layouts}) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },

                    {
                        scale: next
                            ? next.progress.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [1, 0.9],
                              })
                            : 1,
                    },
                ],
            },
            overlayStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                }),
            },
        };
    },
};

const HomeNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false, ...MyTransition}}>
            <HomeStack.Screen name={NavigationScreens.Bottom} component={BottomTabsNavigator} />
            <HomeStack.Screen name={NavigationScreens.Timeline} component={TimelineScreen} />
        </HomeStack.Navigator>
    );
};
export default HomeNavigator;
