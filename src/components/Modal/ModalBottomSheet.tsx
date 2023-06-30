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
    children?: ReactNode;
    title?: string;
    closeModal: () => void;
}

const ModalBottom = ({isVisible, children, title, closeModal, ...props}: ModalCustomProps) => {
    return (
        <Modal
            isVisible={isVisible}
            {...props}
            style={{padding: 0, margin: 0}}
            onBackdropPress={() => closeModal(false)}
            onBackButtonPress={() => closeModal(false)}>
            <View style={styles.containerModalBottomSheet}>
                <View style={{marginVertical: 20}}>
                    {title && (
                        <Typography primary bold center size18>
                            {title}
                        </Typography>
                    )}
                </View>
                <View style={{justifyContent: 'center'}}>{children}</View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    // Modal

    containerModalBottomSheet: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: SCREEN_HEIGHT * 0.3,
        backgroundColor: colors.white,
        borderTopLeftRadius: 7,
        borderTopRightRadius: 7,
        borderTopWidth: 0.5,
        borderTopColor: colors.grey,
        paddingHorizontal: 10,
    },
});
export default memo(ModalBottom);
