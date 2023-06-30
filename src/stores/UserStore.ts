import {IAuth} from '../types/user';
import {action, computed, makeObservable, observable} from 'mobx';

const userDefault = {
    phone: '',
    name: '',
    email: '',
    gender: '',
    image: '',

    token: '',
    login: true,
};

class UserStore {
    @observable userStore: IAuth = userDefault;

    constructor() {
        makeObservable(this);
    }
    @action
    update = (user: IAuth) => {
        (this.userStore.phone = user?.phone),
            (this.userStore.name = user?.name),
            (this.userStore.email = user?.email),
            (this.userStore.gender = user?.gender),
            (this.userStore.image = user?.image);
    };

    @action loginUser = (user: IAuth, token: string) => {
        this.userStore = user;
        this.userStore.login = true;
        this.userStore.token = token;
    };

    // @action saveToken = (token: string) => {
    //     this.userStore.token = token;
    // };

    @action
    reset = () => {
        this.userStore = userDefault;
    };

    @computed
    get getToken() {
        return this.userStore.token;
    }

    @computed
    get getLogin() {
        return this.userStore.login;
    }

    @computed
    get getInfo() {
        return this.userStore;
    }
}

export const userStore = new UserStore();
