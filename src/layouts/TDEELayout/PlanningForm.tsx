import {Picker} from '@react-native-picker/picker';
import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

import {ButtonCustom} from '../../components/Button/Button';
import {ElInput} from '../../components/Input/ElInput';
import Typography from '../../components/Text/Typography';
import {RowView} from '../../components/View/RowView';
import {colors} from '../../styles/theme';
import {Rate} from '../../utils/enum';
import {PlanningForm, resultTDEE} from '../../utils/interface';

interface LayoutProps {
    formPlanning: PlanningForm;
    setFormPlanning: (value?: any) => void;
    result: resultTDEE | null;
}

const PlanningFormView = ({formPlanning, setFormPlanning, result}: LayoutProps) => {
    
    const onChangeValuePlanning = (key: string, value: any) => {
        setFormPlanning((prev: any) => {
            return {...prev, [key]: value};
        });
    };

    return (
        <View>
            <RowView justifyContent="flex-start" style={styles.inputStyle}>
                <Typography bold darkGrey>
                    Kế hoạch
                </Typography>

                <RowView style={{marginLeft: 10}}>
                    <ButtonCustom
                        containerStyle={{
                            backgroundColor: formPlanning.typePlanning === 'Giảm cân' ? colors.primary : colors.grey,
                            marginHorizontal: 5,
                            width: 100,
                            borderRadius: 7,
                        }}
                        onPress={() => {
                            onChangeValuePlanning('typePlanning', 'Giảm cân');
                        }}>
                        <Typography bold white>
                            Giảm cân
                        </Typography>
                    </ButtonCustom>

                    <ButtonCustom
                        containerStyle={{
                            backgroundColor: formPlanning.typePlanning === 'Tăng cân' ? colors.primary : colors.grey,
                            marginHorizontal: 5,
                            width: 100,
                            borderRadius: 7,
                        }}
                        onPress={() => {
                            onChangeValuePlanning('typePlanning', 'Tăng cân');
                        }}>
                        <Typography bold white>
                            Tăng cân
                        </Typography>
                    </ButtonCustom>
                </RowView>
            </RowView>

            <ElInput
                label="Số cân mong muốn"
                placeholder="e.x. 50"
                showRequire
                keyboardType="phone-pad"
                labelStyle={{fontWeight: 'bold'}}
                containerStyle={styles.inputStyle}
                onChangeText={(value) => {
                    onChangeValuePlanning('weightDesire', parseInt(value));
                }}
            />
            <Picker
                selectedValue={formPlanning.rate}
                onValueChange={(value, index) => {
                    onChangeValuePlanning('rate', value);
                }}
                mode={'dropdown'}
                style={styles.inputStyle}>
                <Picker.Item label="Giảm cân chậm" value={Rate.Low} />
                <Picker.Item label="Giảm cân thường" value={Rate.Medium} />
                <Picker.Item label="Giảm cân nhanh" value={Rate.Fast} />
                <Picker.Item label="Giảm cân cấp tốc" value={Rate.SpeedRun} />
            </Picker>

            <View style={styles.groupResult}>
                <Typography size18 darkGrey bold lineHeight={28}>
                    TDEE của bạn là
                </Typography>
                <Typography size18 lightGreen bold lineHeight={28}>
                    {result?.TDEE}
                </Typography>
                <Typography size12 darkGrey bold lineHeight={28}>
                    Calo 1 ngày
                </Typography>
            </View>

            <View style={styles.groupResult}>
                <Typography size18 darkGrey bold lineHeight={28}>
                    BMR của bạn là
                </Typography>
                <Typography size18 lightGreen bold lineHeight={28}>
                    {result?.BMR}
                </Typography>
                <Typography size12 darkGrey bold lineHeight={28}>
                    Calo 1 ngày
                </Typography>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    inputStyle: {
        marginBottom: 10,
    },
    groupResult: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 14,
        borderColor: colors.lightGreen,
    },
});

export default memo(PlanningFormView);
