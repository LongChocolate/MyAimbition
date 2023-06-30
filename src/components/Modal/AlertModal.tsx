import React, {Component, useState} from 'react';
import {View, TouchableOpacity, Keyboard, TextInput} from 'react-native';
import Typography from '../Text/Typography';
import {colors} from '@/styles/theme';
import {boxShadow} from '@/styles/boxShadow';
import AwesomeAlert from 'react-native-awesome-alerts';
import {SCREEN_WIDTH} from '@/styles/dimensions';
import {RowView} from '../View/RowView';

const TypeColor = {
    error: colors.error,
    alert: colors.darkGrey,
};

interface AlertButton {
    text?: string;
    onPress?: (value?: string) => void;
    style?: 'cancel' | 'default';
}

interface AlertOption {
    duration?: number;
    placeholder?: string;
}

interface AlertConfigure {
    title: string;
    message?: string | React.ReactNode;
    buttonGroup?: AlertButton[];
    options?: AlertOption;
}

interface PromptConfigure {
    title: string;
    message?: string | React.ReactNode;
    onGetText?: (text: string) => void;
    defaultValue?: string;
    options?: AlertOption;
}

interface AlertState extends AlertConfigure, PromptConfigure {
    modalVisible?: boolean;
    type?: string;
    onDismiss?: () => void;
}

export class Alert extends Component<any, AlertState> {
    static alertInstance: Alert;
    closeTimeout: NodeJS.Timeout;
    static alert(config: AlertConfigure) {
        this.alertInstance.showAlert(config, 'alert');
    }
    static error(config: AlertConfigure) {
        this.alertInstance.showAlert(config, 'error');
    }
    static prompt(config: PromptConfigure) {
        this.alertInstance.showPrompt({...config, options: {placeholder: ''}});
    }
    static hide() {
        if (this.alertInstance.getModalState()) {
            this.alertInstance.closeAlert();
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            title: '',
            message: '',
            buttonGroup: [{text: 'OK'}],
            options: null,
            type: 'alert',
            defaultValue: '',
            onGetText: null,
        };
    }

    getModalState() {
        return this.state.modalVisible;
    }

    showAlert(config: AlertConfigure, type: string) {
        Keyboard.dismiss();
        this.setState({
            ...config,
            type,
            modalVisible: true,
        });
        // If we have a toast already open, cut off its close timeout so that it won't affect *this* toast.
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
        }
        // Set the toast to close after the duration.
        if (config.options && config.options.duration !== 0) {
            const duration = config.options.duration > 0 ? config.options.duration : 1500;
            this.closeTimeout = setTimeout(this.closeAlert, duration);
        }
    }

    showPrompt = (config: PromptConfigure) => {
        Keyboard.dismiss();
        this.setState({
            ...config,
            type: 'prompt',
            modalVisible: true,
        });
    };

    closeAlert = () => {
        clearTimeout(this.closeTimeout);
        this.setState({
            modalVisible: false,
            title: '',
            message: '',
            buttonGroup: [{text: 'OK'}],
            options: null,
            type: 'alert',
            defaultValue: '',
            onGetText: null,
        });
    };

    render() {
        if (!this.state.modalVisible) {
            return null;
        }
        return (
            <AwesomeAlert
                show={this.state.modalVisible}
                closeOnHardwareBackPress={false}
                closeOnTouchOutside={false}
                customView={
                    this.state.type == 'alert' ? (
                        <AlertView
                            buttonGroup={this.state.buttonGroup}
                            message={this.state.message}
                            title={this.state.title}
                            onDismiss={this.closeAlert}
                            type={this.state.type}
                        />
                    ) : (
                        <PromptView
                            message={this.state.message}
                            title={this.state.title}
                            onDismiss={this.closeAlert}
                            options={this.state.options}
                            defaultValue={this.state.defaultValue}
                            onGetText={this.state.onGetText}
                        />
                    )
                }
                contentContainerStyle={{
                    maxWidth: '90%',
                    borderRadius: 7,
                    padding: -10,
                    ...boxShadow('rgba(0, 0, 0, 0.2)', 0, 3, 6),
                }}
            />
        );
    }
}

const AlertView = ({onDismiss, buttonGroup, message = '', title = '', type = 'alert'}: AlertState) => (
    <View
        style={{
            minWidth: SCREEN_WIDTH * 0.9,
            margin: -10,
        }}>
        <View style={{padding: 30}}>
            {!title || (
                <Typography bold size18 lineHeight={21} color={TypeColor[type]}>
                    {title}
                </Typography>
            )}

            {!message || (
                <Typography darkGrey style={{marginTop: !title ? 0 : 20}}>
                    {message}
                </Typography>
            )}
        </View>

        <RowView
            justifyContent={'flex-end'}
            style={{
                paddingBottom: 20,
                marginRight: 30,
            }}>
            {buttonGroup.map((item: AlertButton) => (
                <TouchableOpacity
                    key={item.text}
                    activeOpacity={0.8}
                    onPress={() => {
                        onDismiss();
                        if (item.onPress) {
                            item.onPress();
                        }
                    }}
                    style={{marginLeft: 40}}>
                    <Typography
                        bold
                        size18
                        lineHeight={21}
                        center
                        color={item.style == 'cancel' ? colors.mediumGrey : colors.primary}>
                        {item.text}
                    </Typography>
                </TouchableOpacity>
            ))}
        </RowView>
    </View>
);

const PromptView = ({onDismiss, message = '', title = '', defaultValue, options, onGetText}: AlertState) => {
    const [value, setValue] = useState(defaultValue);
    return (
        <View
            style={{
                minWidth: SCREEN_WIDTH * 0.8,
                margin: -10,
            }}>
            <View style={{padding: 20, alignItems: 'center'}}>
                {!title || (
                    <Typography bold size18 lineHeight={21} darkGrey>
                        {title}
                    </Typography>
                )}

                {!message || (
                    <Typography darkGrey style={{marginTop: !title ? 0 : 20}}>
                        {message}
                    </Typography>
                )}

                <View
                    style={{
                        marginTop: 20,
                        paddingHorizontal: 20,
                        height: 50,
                        width: '100%',
                        borderRadius: 7,
                        borderWidth: 1,
                        borderColor: colors.mediumGrey,
                    }}>
                    <TextInput
                        allowFontScaling={false}
                        placeholder={options.placeholder}
                        placeholderTextColor={colors.lightGrey}
                        onChangeText={(text) => setValue(text)}
                        value={value}
                        style={{
                            fontFamily: 'text-regular',
                            fontSize: 16,
                            color: colors.darkGrey,
                            flex: 1,
                        }}
                    />
                </View>
            </View>

            <RowView
                justifyContent={'flex-end'}
                style={{
                    paddingBottom: 20,
                    marginRight: 30,
                }}>
                <TouchableOpacity activeOpacity={0.8} onPress={onDismiss} style={{marginRight: 40}}>
                    <Typography bold mediumGrey size18 lineHeight={21} center>
                        Hủy
                    </Typography>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        onDismiss();
                        if (onGetText) {
                            onGetText(value);
                        }
                    }}>
                    <Typography bold primary size18 lineHeight={21} center>
                        Đồng ý
                    </Typography>
                </TouchableOpacity>
            </RowView>
        </View>
    );
};
