import React, {ReactNode} from 'react';
import {TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleSheet} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    containerStyle?: ViewStyle;
    children: ReactNode;
    rounded?: boolean;
}

export const ButtonCustom = ({containerStyle, children, rounded, ...props}: ButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            {...props}
            style={props.style ? props.style : [styles.container, containerStyle, rounded ? {borderRadius: 7} : null]}>
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
    },
});
