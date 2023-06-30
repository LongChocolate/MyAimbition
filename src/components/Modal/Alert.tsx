import React, {memo, ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import Typography from '../Text/Typography';
import Modal, {ModalProps} from 'react-native-modal/dist';
import {SCREEN_HEIGHT} from '../../styles/dimensions';
import {colors} from '../../styles/theme';
import {RowView} from '../View/RowView';
import {ButtonCustom} from '../Button/Button';

interface ModalCustomProps {
    isVisible: boolean;
    message?: string | null;
    title?: string;
    error?: boolean;
    closeModal: () => void;
}

const Alert = ({isVisible, message, title, error, closeModal, ...props}: ModalCustomProps) => {
    return (
        <Modal isVisible={isVisible} {...props}>
            <View style={styles.containerModalAlert}>
                <View style={{paddingHorizontal: 20}}>
                    <Typography color={error ? colors.error : colors.primary} bold center>
                        {title}
                    </Typography>
                    <Typography darkGrey style={{marginTop: 5, marginBottom: 15}}>
                        {message}
                    </Typography>
                    <RowView justifyContent="space-between">
                        <ButtonCustom onPress={() => closeModal(false)}>
                            <Typography primary size14 bold>
                                OK
                            </Typography>
                        </ButtonCustom>
                    </RowView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    // Modal

    containerModalAlert: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.2,
        backgroundColor: 'white',
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
    },
});
export default memo(Alert);
