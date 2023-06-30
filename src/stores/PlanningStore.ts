import {IPlanning} from '../types/planning';
import {action, observable, makeObservable, computed} from 'mobx';

class PlanningStore {
    @observable planningStore: IPlanning[] = [];
    @observable loading: boolean = true;

    constructor() {
        makeObservable(this);
    }

    @action
    add = (data: IPlanning[]) => {
        data.map((plan, index) => {
            this.planningStore.push(plan);
        });
        this.loading = false;
    };

    @action
    reset = () => {
        this.planningStore = [];
        this.loading = true;
    };

    @computed
    get getPlanning() {
        return this.planningStore;
    }

    @computed
    get getLoading() {
        return this.loading;
    }
}

export const planningStore = new PlanningStore();
