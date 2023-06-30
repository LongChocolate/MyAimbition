import * as React from 'react';
import {View, TouchableOpacity, TouchableOpacityProps, TextStyle, StyleSheet, ViewStyle} from 'react-native';
import {REM} from '../../styles/dimensions';
import Typography from '../Text/Typography';
import {colors} from '../../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    titleStyle?: TextStyle;
    containerStyle?: ViewStyle;
    border?: boolean;
}

export const ButtonSmall = ({title, titleStyle, containerStyle, border, ...props}: ButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={0.8} {...props} style={props.style}>
            <View style={[styles.buttonView, border && styles.borderView, containerStyle]}>
                <Typography medium size14 lineHeight={16} white={!border} primary={border} center style={titleStyle}>
                    {title}
                </Typography>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 5,
        maxHeight: 30,
        backgroundColor: colors.primary,
    },
    borderView: {
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: 'transparent',
    },
});
