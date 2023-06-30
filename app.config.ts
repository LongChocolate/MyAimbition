import {ExpoConfig} from '@expo/config-types';

// In SDK 47 and higher, use the following import instead:
// import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
    name: 'MyAimbition',
    slug: '',
    android: {
        package: 'com.myaimbition.app',
    },
};

export default config;
