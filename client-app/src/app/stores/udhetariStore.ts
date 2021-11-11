import React from 'react';
import { makeAutoObservable, runInAction } from "mobx";
import {v4 as uuid} from 'uuid';
import { store } from "./store";
import { history } from "../..";
import { convertCompilerOptionsFromJson } from "typescript";
import { UdhetariUser, UdhetariuserFormValues } from '../models/udhetariUser';
import agent from '../api/metodaAgent';
import { Udhetari } from '../models/udhetari';

export default class UdhetariStore {
    udhetari: UdhetariUser | null = null;
    udhetariSelected: UdhetariUser | null = null;
    udhetariRegistry = new Map<String, Udhetari>();
    selectedUdhetari: Udhetari | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    static isLoggedIn: any;

    constructor() {
        makeAutoObservable(this)
    }
    get isLoggedIn() {
        return !!this.udhetariSelected;
    }
    get udhetaretCount(){
        return this.udhetariRegistry.size;
    }

    loginUdhetari = async (creds: UdhetariuserFormValues) => {
        try {
            const udhetaret = await agent.AccountUdhetari.login(creds);
            store.commonStore.setToken(udhetaret.token);
            runInAction(() => this.udhetariSelected = udhetaret);
            history.push("/listaofertave");
            window.location.reload()
            store.modalStore.closeModal();
        } catch(error) {
            throw error;
        }
    }

    logoutUdhetari = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.udhetariSelected = null;
        history.push('/');
    }

    getUdhetari= async () => {
        try {
            const udhetari = await agent.AccountUdhetari.currentUdhetari();
            runInAction(() => this.udhetari = udhetari);
        } catch (error) {
            console.log(error);
        }
    }
    // getUdhetarin = async () => {
    //     try {
    //        const udhetaret =  await agent.AccountUdhetari.currentUdhetari();
    //        runInAction(() => this.udhetariSelected = udhetaret);

    //        history.push("/udhetariProfile");


    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    get udhetaretByDate() {
        return Array.from(this.udhetariRegistry.values()).sort((a, b) => Date.parse(a.birthday) - Date.parse(b.birthday));
    }

    loadUdhetaret = async () => {
        try{
            const udhetaret = await agent.Udhetaret.list();
            udhetaret.forEach(udhetari => {
                    udhetari.birthday = udhetari.birthday.split('T')[0];
                    this.udhetariRegistry.set(udhetari.id, udhetari);
                })
                this.setLoadingInitial(false);        
        } catch(error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectUdhetarin = (id: string) => {
        this.selectedUdhetari = this.udhetariRegistry.get(id);
    }
    
    cancelSelectedUdhetari = () => {
        this.selectedUdhetari = undefined;
    }

    // openForm = (id?: string) => {
    //     id ? this.selectUdhetarin(id) : this.cancelSelectedUdhetari();
    //     this.editMode = true;
    // }

    // openForm2 = (id?: string) => {
    //     id ? this.selectUdhetarin(id) : this.cancelSelectedUdhetari();
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }

    register = async (creds: UdhetariuserFormValues) => {
        try {
            console.log("creds Udhetari: ", creds);
            await agent.AccountUdhetari.register(creds);
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
    createUdhetarin = async (udhetari: Udhetari) => {
        this.loading = true;
        udhetari.id = uuid();
        try{
            await agent.Udhetaret.create(udhetari);
            runInAction(() => {
                this.udhetariRegistry.set(udhetari.id, udhetari);
                this.selectedUdhetari = udhetari;
                this.editMode= false;
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateUdhetarin = async (udhetari: Udhetari) => {
        this.loading = true;
        try {
            await agent.Udhetaret.update(udhetari);
            runInAction(() => {
                this.udhetariRegistry.set(udhetari.id, udhetari);
                this.selectedUdhetari = udhetari;
                this.editMode= false;
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteUdhetarin = async (id: string) => {
        this.loading = true;
        try{
            await agent.Udhetaret.delete(id);
            runInAction(() => {
                this.udhetariRegistry.delete(id);
                if(this.udhetariSelected?.id === id) this.cancelSelectedUdhetari();
                this.loading = false;
            })
        }catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    public getUdhetariNamebyId = (id: string) => {
        return this.udhetariRegistry.get(id)?.emri;
    };

}