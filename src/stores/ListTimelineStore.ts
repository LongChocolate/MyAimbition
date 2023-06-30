import {action, observable, makeObservable, computed} from 'mobx';
import {IDetailTimeline, ITimeline} from '../types/timelinePlaning';
import {StatePlanning} from '../utils/enum';
import {isToday} from '../utils/helper';
import {timelineStore} from './TimelineStore';

class ListTimelineStore {
    @observable listTimelineStore: ITimeline[] = [];

    constructor() {
        makeObservable(this);
    }

    @action
    setEmpty = async (days: number) => {
        const count = days;
        const time = new Date();

        for (let i = 0; i < count; i++) {
            time.setDate(time.getDate() + 1);
            timelineStore.set(time, isToday(time) ? StatePlanning.InProcess : StatePlanning.Wait);

            const timeline: ITimeline = timelineStore.getTimeline;
            this.listTimelineStore.push(timeline);
        }
    };

    @action
    set = (data: ITimeline[]) => {
        this.listTimelineStore = data;
    };

    @action
    reset = () => {
        this.listTimelineStore = [];
        timelineStore.reset();
    };

    @computed
    get getTimeline() {
        return this.listTimelineStore;
    }
}

export const listTimelineStore = new ListTimelineStore();
