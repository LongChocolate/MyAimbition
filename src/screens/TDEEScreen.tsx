import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import firebasePlanningService from '../apis/PlanningService';

import {ButtonSmall} from '../components/Button/ButtonSmall';
import Button from '../components/Button/MyButton';
import PlanningFormView from '../layouts/TDEELayout/PlanningForm';
import TDEEFormView from '../layouts/TDEELayout/TDEEform';
import {planningStore} from '../stores/PlanningStore';
import {boxShadow, colors} from '../styles/theme';
import {IDetailPlanning} from '../types/planning';
import {Intensity, NavigationScreens, Rate} from '../utils/enum';
import {dateFormat, TDEE, timePrediction} from '../utils/helper';
import {PlanningForm, resultTDEE, TDEEForm} from '../utils/interface';

const formTDEEDefault: TDEEForm = {
    intens: Intensity.None,
    gender: '',
    weight: null,
    height: null,
    age: null,
};

const formPlanningDefault: PlanningForm = {
    typePlanning: '',
    weightDesire: null,
    rate: Rate.Low,
};

const resultDefault: resultTDEE = {
    TDEE: 0,
    BMR: 0,
};

const TDEEScreen = observer(({navigation, route}: any) => {
    const [formTDEE, setFormTDEE] = useState<TDEEForm>(formTDEEDefault);
    const [formPlanning, setFormPlanning] = useState<PlanningForm>(formPlanningDefault);

    const [onResult, setOnResult] = useState(false);
    const [result, setResult] = useState<resultTDEE>();

    const reset = () => {
        setFormTDEE(formTDEEDefault);
        setFormPlanning(formPlanningDefault);
        setResult(resultDefault);
        setOnResult(false);
    };

    return (
        <SafeAreaView style={{flex: 1, paddingBottom: useBottomTabBarHeight(), backgroundColor: colors.lightGreen}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {!onResult ? (
                        <>
                            <TDEEFormView formTDEE={formTDEE} setFormTDEE={setFormTDEE} />
                            <Button
                                title="Tính TDEE"
                                onPress={() => {
                                    const result = TDEE(formTDEE);
                                    setResult(result);
                                    setOnResult(true);
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <ButtonSmall
                                title="Thực hiện lại"
                                onPress={() => {
                                    reset();
                                }}
                                containerStyle={{width: '50%', marginBottom: 10, alignSelf: 'center'}}
                            />
                            <PlanningFormView
                                formPlanning={formPlanning}
                                setFormPlanning={setFormPlanning}
                                result={result}
                            />
                            <Button
                                title="Lập kế hoạch"
                                onPress={() => {
                                    const detail: IDetailPlanning = {
                                        result: result,
                                        numeralInfo: formTDEE,
                                        numeralDesire: formPlanning,
                                    };

                                    const timePredict = timePrediction(formTDEE.weight, formPlanning);

                                    firebasePlanningService.postPlanning(
                                        detail,
                                        timePredict.days,
                                        timePredict.dateTime,
                                    );
                                    reset();
                                    planningStore.reset();
                                    navigation.navigate(NavigationScreens.Planning);
                                }}
                            />
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        margin: 20,
        padding: 20,
        borderRadius: 14,
        backgroundColor: colors.white,

        ...boxShadow(colors.darkGrey),
    },
});

export default TDEEScreen;
