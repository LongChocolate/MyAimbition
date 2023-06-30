import React, {ReactElement, ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';
import useValidate from '../../hooks/useValidate';

interface FormProps {
    children: ReactElement;
    containerStyle?: ViewStyle;

    data?: any;
    rules?: any[];
    onResult?: (value?: any) => void;
}

const Form = ({children, containerStyle, data, rules, onResult}: FormProps) => {
    const result = useValidate(data, rules);
    onResult(result);

    return <View style={{...containerStyle}}>{children}</View>;
};

export default Form;
