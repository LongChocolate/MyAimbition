import {faSeedling} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {View, StyleSheet, TouchableOpacityProps} from 'react-native';
import {boxShadow, colors} from '../../styles/theme';
import {IPlanning} from '../../types/planning';
import {NavigationScreens} from '../../utils/enum';
import {ButtonCustom} from '../Button/Button';
import Typography from '../Text/Typography';
import {RowView} from '../View/RowView';

interface IPlanningView extends TouchableOpacityProps {
    plan: IPlanning;
}

const PlanningView = ({plan, ...props}: IPlanningView) => {
    return (
        <ButtonCustom {...props} style={styles.groupResult}>
            <RowView>
                <FontAwesomeIcon icon={faSeedling} size={25} color={colors.primary} />

                <Typography size14 primary bold style={{marginLeft: 10}}>
                    {plan.timeStart}
                </Typography>
            </RowView>

            <RowView>
                <Typography darkGrey size14 bold style={{width: '40%'}}>
                    Chỉ số ban đầu:
                </Typography>
                <Typography size14 darkGrey style={{marginLeft: 10}}>
                    {plan.detail.numeralInfo.weight}Kg
                </Typography>
            </RowView>

            <RowView>
                <Typography size14 darkGrey bold style={{width: '40%'}}>
                    Chỉ s mong muốn:
                </Typography>

                <Typography size14 darkGrey style={{marginLeft: 10}}>
                    {plan.detail.numeralDesire.weightDesire}Kg
                </Typography>
                <View
                    style={{
                        width: 5,
                        height: 5,
                        borderRadius: 20,
                        backgroundColor: colors.darkGrey,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 10,
                    }}
                />
                <Typography primary bold size14>
                    {plan.state}
                </Typography>
            </RowView>

            <RowView>
                <Typography size14 darkGrey bold style={{width: '40%', alignSelf: 'baseline'}}>
                    Thời gian dự kiến:
                </Typography>
                <Typography size14 darkGrey style={{marginLeft: 10}}>
                    {plan.timePrediction} {'\n'}({plan.days} Ngày)
                </Typography>
            </RowView>
        </ButtonCustom>
    );
};

export default PlanningView;

const styles = StyleSheet.create({
    groupResult: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 14,
        borderColor: colors.darkGrey,

        backgroundColor: colors.white,

        ...boxShadow(colors.darkGrey),
    },
});
