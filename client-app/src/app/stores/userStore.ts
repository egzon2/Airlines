import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/metodaAgent";
import { UdhetariUser, UdhetariuserFormValues } from "../models/udhetariUser";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    udhetari: UdhetariUser | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user)
            history.push('/profile');
            store.modalStore.closeModal();
        } catch(error) {
            throw error;
        }
    }
    
    udhetariLogin = async(values: UdhetariuserFormValues) => {
        try{
            const udhetari = await agent.AccountUdhetari.login(values);
            store.commonStore.setToken(udhetari.token);
            runInAction(() => this.udhetari = udhetari);
            history.push('/UdhetariProfile');

        }catch(error){
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user)
            history.push('/profile');
            store.modalStore.closeModal();
        } catch(error) {
            throw error;
        }
    }
}