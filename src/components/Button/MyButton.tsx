import * as React from 'react';
import {View, TouchableOpacity, TouchableOpacityProps, TextStyle, StyleSheet, ViewStyle} from 'react-native';
import Typography from '../Text/Typography';
import {colors} from '../../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    titleStyle?: TextStyle;
    containerStyle?: ViewStyle;
    border?: boolean;
    borderColor?: string;
}

const Button = ({title, titleStyle, containerStyle, border, borderColor = colors.primary, ...props}: ButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={0.8} {...props} style={props.style}>
            <View
                style={[
                    styles.buttonView,
                    border && styles.borderView,
                    borderColor && {borderColor},
                    props.disabled && {opacity: 0.5},
                    containerStyle,
                ]}>
                <Typography bold white={!border} color={border && borderColor} center style={titleStyle}>
                    {title}
                </Typography>
            </View>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 13,
        paddingHorizontal: 15,
        borderRadius: 14,
        maxHeight: 54,
        backgroundColor: colors.primary,
    },
    borderView: {
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: 'transparent',
    },
});
