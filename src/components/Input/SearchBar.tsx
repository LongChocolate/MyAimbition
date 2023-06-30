import React, {memo, useRef, useState} from 'react';
import {TextInputProps, ViewStyle} from 'react-native';
import {ElInput} from './ElInput';

interface searchProps extends TextInputProps {
    containerInputSearch?: ViewStyle;
    containerStyle?: ViewStyle;
}

const SearchBar = ({containerStyle, containerInputSearch, ...props}: searchProps) => {
    const searchRef = useRef();

    const [text, setText] = useState('');
    return (
        <ElInput
            inputRef={searchRef}
            placeholder="Bạn cần tìm sản phẩm gì?"
            search
            value={text}
            containerStyle={containerStyle}
            inputStyle={containerInputSearch}
            onChangeText={(value) => setText(value)}
            round
            {...props}
            style={{fontSize: 16, lineHeight: 19}}
        />
    );
};

export default memo(SearchBar);
