import React from 'react';
import {createStackNavigator, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack';

import {NavigationScreens} from '../utils/enum';
import IntroduceScreen from '../screens/IntroduceScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SendCodeVerificationScreen from '../screens/SendVerificationScreen';
import RegisterSuccessScreen from '../screens/RegisterSuccessScreen';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator();

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

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator screenOptions={{headerShown: false, ...MyTransition}}>
            <AuthStack.Screen name={NavigationScreens.Introduce} component={IntroduceScreen} />
            <AuthStack.Screen name={NavigationScreens.Login} component={LoginScreen} />
            <AuthStack.Screen name={NavigationScreens.SendCodeVerification} component={SendCodeVerificationScreen} />

            <AuthStack.Screen name={NavigationScreens.Register} component={RegisterScreen} />

            <AuthStack.Screen name={NavigationScreens.RegisterSuccess} component={RegisterSuccessScreen} />
        </AuthStack.Navigator>
    );
};
export default AuthNavigator;
