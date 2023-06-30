import firestore from '@react-native-firebase/firestore';
import {listTimelineStore} from '../../stores/ListTimelineStore';
import {planningStore} from '../../stores/PlanningStore';
import {IDetailPlanning, IPlanning} from '../../types/planning';
import {ITimeline} from '../../types/timelinePlaning';
import {StatePlanning} from '../../utils/enum';
import {dateFormat} from '../../utils/helper';

class FirebasePlanningService {
    public postPlanning = (detail: IDetailPlanning, days: number, timePrediction: string) => {
        const timeStart = new Date();

        listTimelineStore.setEmpty(days);
        const timeline: ITimeline[] = listTimelineStore.getTimeline;
        listTimelineStore.reset();

        return firestore()
            .collection('Planning')
            .add({
                detail,
                days,
                timePrediction,
                timeStart: dateFormat(timeStart),
                state: StatePlanning.InProcess,
                timeline: timeline,
            });
    };

    public getPlanning = async () => {
        const data = await firestore()
            .collection('Planning')
            .onSnapshot((documentSnapshot) => {
                documentSnapshot.forEach((document) => {
                    let plan = [];
                    plan.push(document.data());

                    planningStore.add(plan);
                });
            });
        return () => data;
    };
}

const firebasePlanningService = new FirebasePlanningService();
export default firebasePlanningService;
