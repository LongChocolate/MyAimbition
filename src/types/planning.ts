import {PlanningForm, resultTDEE, TDEEForm} from '../utils/interface';
import {ITimeline} from './timelinePlaning';

export interface IPlanning {
    timeStart: string | null;
    detail: IDetailPlanning;
    days: number;
    timePrediction: string | null;
    state: string | null;
    timeline: ITimeline;
}

export interface IDetailPlanning {
    numeralInfo: TDEEForm | null;
    numeralDesire: PlanningForm | null;
    result: resultTDEE | null;
}
