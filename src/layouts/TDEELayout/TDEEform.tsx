import {Picker} from '@react-native-picker/picker';
import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

import {ButtonCustom} from '../../components/Button/Button';
import Form from '../../components/FormValidate/Form';
import {ElInput} from '../../components/Input/ElInput';
import Typography from '../../components/Text/Typography';
import {RowView} from '../../components/View/RowView';
import {colors} from '../../styles/theme';
import {Intensity} from '../../utils/enum';
import {TDEEForm} from '../../utils/interface';

interface LayoutProps {
    formTDEE: TDEEForm;
    setFormTDEE: (value?: any) => void;
}

const TDEEFormView = ({formTDEE, setFormTDEE}: LayoutProps) => {
    const onChangeValueTDEE = (key: string, value: any) => {
        setFormTDEE((prev: any) => {
            return {...prev, [key]: value};
        });
    };

    return (
        <View>
            <Typography size16 lightGreen bold center lineHeight={30}>
                Thông tin tính TDEE
            </Typography>
            <RowView justifyContent="space-between" style={styles.inputStyle}>
                <ElInput
                    label="Chiều cao"
                    placeholder="e.x. 180"
                    showRequire
                    keyboardType="phone-pad"
                    labelStyle={{fontWeight: 'bold'}}
                    onChangeText={(value) => onChangeValueTDEE('height', value)}
                    value={formTDEE?.height}
                />
                <ElInput
                    label="Cân nặng"
                    placeholder="e.x. 50"
                    showRequire
                    keyboardType="phone-pad"
                    labelStyle={{fontWeight: 'bold'}}
                    onChangeText={(value) => onChangeValueTDEE('weight', value)}
                    value={formTDEE?.weight}
                />
            </RowView>

            <ElInput
                label="Tuổi"
                placeholder="e.x. 18"
                showRequire
                keyboardType="phone-pad"
                labelStyle={{fontWeight: 'bold'}}
                containerStyle={styles.inputStyle}
                onChangeText={(value) => onChangeValueTDEE('age', value)}
                value={formTDEE?.age}
            />

            <RowView justifyContent="flex-start" style={styles.inputStyle}>
                <Typography bold darkGrey>
                    Giới tính
                </Typography>

                <RowView style={{marginLeft: 10}}>
                    <ButtonCustom
                        onPress={() => onChangeValueTDEE('gender', 'Nam')}
                        containerStyle={{
                            backgroundColor: formTDEE.gender === 'Nam' ? colors.primary : colors.grey,
                            marginHorizontal: 5,
                            width: 100,
                            borderRadius: 7,
                        }}>
                        <Typography bold white>
                            Nam
                        </Typography>
                    </ButtonCustom>

                    <ButtonCustom
                        onPress={() => onChangeValueTDEE('gender', 'Nữ')}
                        containerStyle={{
                            backgroundColor: formTDEE.gender === 'Nữ' ? colors.primary : colors.grey,
                            marginHorizontal: 5,
                            width: 100,
                            borderRadius: 7,
                        }}>
                        <Typography bold white>
                            Nữ
                        </Typography>
                    </ButtonCustom>
                </RowView>
            </RowView>

            <Picker
                selectedValue={formTDEE.intens}
                onValueChange={(value, index) => {
                    onChangeValueTDEE('intens', value);
                }}
                mode={'dropdown'}
                style={styles.inputStyle}>
                <Picker.Item label="Ít vận động (không tập luyện)" value={Intensity.None} />
                <Picker.Item label="Vận động nhẹ (Tập luyện 1-3 ngày/1 tuần)" value={Intensity.Low} />
                <Picker.Item label="Vận động vừa (Tập luyện 3-5 ngày/1 tuần)" value={Intensity.Medium} />
                <Picker.Item label="Vận động nhiều (Tập luyện hằng ngày)" value={Intensity.High} />
                <Picker.Item label="Vận động viên (hoặc ngày 2 lần)" value={Intensity.Power} />
            </Picker>
        </View>
    );
};
const styles = StyleSheet.create({
    inputStyle: {
        marginBottom: 10,
    },
});

export default memo(TDEEFormView);
