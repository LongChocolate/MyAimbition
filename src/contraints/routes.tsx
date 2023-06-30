import React from 'react';

import {NavigationScreens} from '../utils/enum';
import {faHouse, faBell, faPlusCircle, faUser, faSpa} from '@fortawesome/free-solid-svg-icons';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AccountScreen from '../screens/AccountScreen';
import Planning from '../screens/PlanningScreen';
import TDEEScreen from '../screens/TDEEScreen';

export const HOME_ROUTES = [
    {
        name: NavigationScreens.Planning,
        title: 'Kế hoạch',
        icon: faSpa,
        component: Planning,
    },
    {
        name: NavigationScreens.TDEE,
        icon: faPlusCircle,
        component: TDEEScreen,
    },
    {
        name: NavigationScreens.Notification,
        title: 'Thông báo',
        icon: faBell,
        component: NotificationScreen,
    },
];
