import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {boxShadow, colors} from '../styles/theme';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {HOME_ROUTES} from '../contraints/routes';

const RootStack = createBottomTabNavigator();

const BottomTabsNavigator = () => {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,

                tabBarStyle: {
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    right: 10,

                    backgroundColor: colors.white,
                    borderRadius: 14,
                    height: 90,
                    ...boxShadow(colors.darkGrey),
                },

                tabBarHideOnKeyboard: true,
            }}>
            {HOME_ROUTES.map((route, index) => {
                const middleIcon = route.title;
                return (
                    <RootStack.Screen
                        key={index}
                        name={route.name}
                        component={route.component}
                        options={{
                            tabBarIcon: ({focused}) => {
                                return (
                                    <FontAwesomeIcon
                                        icon={route.icon}
                                        size={middleIcon ? 25 : 60}
                                        color={
                                            focused ? colors.primary : middleIcon ? colors.lightGrey : colors.primary
                                        }
                                        style={boxShadow(colors.darkGrey)}
                                    />
                                );
                            },
                            tabBarIconStyle: middleIcon
                                ? {padding: 0, margin: 0}
                                : {
                                      bottom: 30,
                                      borderRadius: 99,
                                      backgroundColor: colors.lightGreen,
                                      padding: 40,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderLeftWidth: 1,
                                      borderRightWidth: 1,
                                      borderColor: colors.grey,
                                  },
                            tabBarLabel: route.title ? route.title : '',

                            tabBarActiveTintColor: colors.primary,
                            tabBarInactiveTintColor: colors.grey,

                            tabBarLabelStyle: {
                                fontStyle: 'normal',
                                fontWeight: '700',
                                fontSize: 12,
                                lineHeight: 12,
                                textAlign: 'center',
                                bottom: 10,
                            },
                        }}
                    />
                );
            })}
        </RootStack.Navigator>
    );
};

export default BottomTabsNavigator;
