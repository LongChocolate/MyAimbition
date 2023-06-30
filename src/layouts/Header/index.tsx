import React from 'react';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {ReactNode} from 'react';
import {TouchableOpacityProps, View} from 'react-native';
import {ButtonCustom} from '../../components/Button/Button';
import Typography from '../../components/Text/Typography';
import {colors} from '../../styles/theme';

interface HeaderProps {
    title?: string;
    back?: boolean;
    onBack?: () => void;
    children?: ReactNode;
    color?: string;
    componentLeft?: ReactNode;
    size?: number;
    subTitle?: ReactNode;
    shadow?: boolean;
}

const Header = ({title, back, children, color, componentLeft, size, subTitle, onBack, shadow}: HeaderProps) => {
    return (
        <View
            style={{
                width: '100%',
                flexDirection: 'row',

                paddingVertical: 10,
                alignItems: 'center',
                paddingHorizontal: 10,
                borderBottomColor: colors.grey,
                borderBottomWidth: shadow ? 1 : 0,
            }}>
            {back && (
                <ButtonCustom onPress={onBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} />
                </ButtonCustom>
            )}
            <View style={{paddingLeft: componentLeft ? 15 : 0, flexDirection: 'row', alignItems: 'center'}}>
                {componentLeft}
                {title && (
                    <View style={{marginHorizontal: 10}}>
                        <Typography size={size ? size : 20} color={color ? color : 'primary'} bold lineHeight={50}>
                            {title}
                        </Typography>
                        {subTitle && subTitle}
                    </View>
                )}
            </View>
            {children && <View style={{flex: 1, marginHorizontal: 10}}>{children}</View>}
        </View>
    );
};

export default Header;
