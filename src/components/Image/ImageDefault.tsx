import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import {ImageResizeMode} from 'react-native';
import {View, Image, ViewStyle} from 'react-native';
import {imageDefault} from '../../assets/images';
import {colors} from '../../styles/theme';

interface AvatarProps {
    containerStyle: ViewStyle;
    image?: string | null;
    border?: boolean;
    mode?: ImageResizeMode | undefined;
    user?: boolean;
    url?: string | null;
    addIcon?: boolean;
}

export const ImageView = ({image, border, containerStyle, mode, user, url, addIcon}: AvatarProps) => {
    const [error, setError] = useState(false);
    return (
        <View style={[containerStyle, {position: 'relative'}]}>
            <Image
                source={error ? (user ? imageDefault.noAvatar : imageDefault.noImage) : url ? {uri: url} : image}
                style={{width: '100%', height: '100%', borderRadius: border ? 999 : 7}}
                onError={() => setError(true)}
                resizeMode={mode}
            />

            {addIcon && (
                <View style={{position: 'absolute', bottom: 0, right: 10}}>
                    <FontAwesomeIcon icon={faCirclePlus} size={20} color={colors.primary} />
                </View>
            )}
        </View>
    );
};
