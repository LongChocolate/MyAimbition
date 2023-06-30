const DetailDefault: IDetailTimeline = {
    act: [
        {
            title: 'Breakfast',
            name: '',
            calories: '',
            state: 'Chưa',
        },
        {
            title: 'Lunch',
            name: '',
            calories: '',
            state: 'Chưa',
        },
        {
            title: 'Dinner',
            name: '',
            calories: '',
            state: 'Chưa',
        },
    ],
    totalCalories: '',
};

const TimelineDefault: ITimeline = {
    dateTime: '',
    state: '',

    caloriesReduce: '',
    detail: DetailDefault,
};

import {action, observable, makeObservable, computed} from 'mobx';
import {IDetailTimeline, ITimeline} from '../types/timelinePlaning';
import {dateFormat} from '../utils/helper';

class TimelineStore {
    @observable timelineStore: ITimeline = TimelineDefault;

    constructor() {
        makeObservable(this);
    }

    @action
    set = (time: Date, state: string) => {
        const dateStart = dateFormat(time);

        this.timelineStore.dateTime = dateStart;
        this.timelineStore.state = state;
    };

    // @action
    // add = (data: IPlanning[]) => {
    //     data.map((plan, index) => {
    //         this.TimelineStore.push(plan);
    //     });
    // };

    @action
    reset = () => {
        this.timelineStore = TimelineDefault;
    };

    @computed
    get newTimeline() {
        this.reset();
        return this.getTimeline;
    }

    @computed
    get getTimeline() {
        return this.timelineStore;
    }
}

export const timelineStore = new TimelineStore();
