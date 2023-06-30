import {faEye, faEyeSlash, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {TextInput, View, TextInputProps, TouchableOpacity, ViewStyle, Platform, TextStyle} from 'react-native';
import useValidate from '../../hooks/useValidate';
import {colors, sizes} from '../../styles/theme';
import { ButtonCustom } from '../Button/Button';
import Typography from '../Text/Typography';
import {RowView} from '../View/RowView';

interface inputProps extends TextInputProps {
    inputRef?: React.LegacyRef<TextInput>;
    label?: string;
    errorMessage?: string;
    inputStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    errorStyle?: TextStyle;
    showRequire?: boolean;
    componentRight?: React.ReactNode;
    componentLeft?: React.ReactNode;
    search?: boolean;
    round?: boolean;
}

export const ElInput = React.forwardRef(
    (
        {
            inputRef,
            label,
            errorMessage,
            showRequire, //* required
            componentRight,
            componentLeft,
            containerStyle,
            inputStyle,
            labelStyle,
            errorStyle,
            search,
            round,
            ...props
        }: inputProps,
        ref,
    ) => {
        const [showPasss, setShowPass] = useState(props.secureTextEntry);

        const onPressShow = () => {
            setShowPass(!showPasss);
        };


        return (
            <View style={{...containerStyle}}>
                {!!label && (
                    <Typography size14 lineHeight={16} darkGrey style={{marginBottom: 5, ...labelStyle}}>
                        {label}
                        {showRequire && (
                            <Typography size14 lineHeight={16} error>
                                {' '}
                                * (bắt buộc)
                            </Typography>
                        )}
                    </Typography>
                )}

                <RowView
                    style={{
                        paddingVertical: Platform.OS === 'ios' ? 8 : 0,
                        paddingHorizontal: 16,
                        backgroundColor: '#fff',
                        borderWidth: !props.editable ? 0 : 1,
                        borderColor: errorMessage ? colors.error : props.value == '' ? colors.grey : colors.black,
                        borderRadius: round ? 25 : 7,
                        height: !props.multiline ? 50 : null,
                        ...inputStyle,
                    }}>
                    {componentLeft}
                    {search && <FontAwesomeIcon icon={faMagnifyingGlass} size={24} />}

                    <TextInput
                        numberOfLines={1}
                        placeholderTextColor={props.value ? colors.darkGrey : colors.lightGrey}
                        allowFontScaling={false}
                        {...props}
                        ref={inputRef}
                        secureTextEntry={showPasss}
                        style={[
                            props.style,
                            {
                                color: colors.black,
                                fontSize: sizes.size16,
                                flex: 1,
                                marginLeft: componentLeft || (search && 10),
                                marginRight: componentRight && 10,
                                height: 70,
                            },
                        ]}
                    />

                    {componentRight}

                    {props.secureTextEntry && (
                        <ButtonCustom onPress={onPressShow}>
                            <FontAwesomeIcon icon={showPasss ? faEyeSlash : faEye} size={24} />
                        </ButtonCustom>
                    )}
                </RowView>

                {!!errorMessage && (
                    <Typography size14 error italic lineHeight={16} style={{marginTop: 3, ...errorStyle}}>
                        {errorMessage}
                    </Typography>
                )}
            </View>
        );
    },
);

ElInput.defaultProps = {
    editable: true,
};
