import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/metodaAgent";
import { Punetori } from "../models/punetori";
import {format} from 'date-fns';

export default class PunetoriStore {
  punetoriRegistry = new Map<string, Punetori>();
  selectedPunetori: Punetori | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get punetoretByDate() {
    return Array.from(this.punetoriRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedPunetoret() {
    return Object.entries(   //nje array i objekteve, cdo objekt e ka nje key qe o date dhe per cdo date do kemi array te datave
      this.punetoretByDate.reduce((punetoret, punetori) => {
        const date = format(punetori.date!, 'dd MMM yyyy') 
        punetoret[date] = punetoret[date] ? [...punetoret[date], punetori] : [punetori];
        return punetoret;
      }, {} as {[key: string]: Punetori[]})
    )//change punetori,dateEnd
  }

  loadPunetoret = async () => {
    this.loadingInitial = true;
    try {
      const punetoret = await agent.Punetoret.list();
      punetoret.forEach(punetori => {
        this.setPunetori(punetori);
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }

  loadPunetori = async (id: string) => {
    let punetori = this.getPunetori(id);
    if (punetori) {
      this.selectedPunetori = punetori;
      return punetori;
    } else {
      this.loadingInitial =true;
      try {
        punetori = await agent.Punetoret.details(id);
        this.setPunetori(punetori);
        runInAction(() => {
          this.selectedPunetori = punetori;
        }) 
        this.setLoadingInitial(false);
        return punetori;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }

  private setPunetori = (punetori: Punetori) => {
    punetori.date = new Date(punetori.date!);
    this.punetoriRegistry.set(punetori.id, punetori);
  };//qitu ma ndryshe u kon

  private getPunetori = (id: string) => {
    return this.punetoriRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  addPunetori = async (punetori: Punetori) => {
    this.loading = true;
    try {
      await agent.Punetoret.create(punetori);
      runInAction(() => {
        this.punetoriRegistry.set(punetori.id, punetori);
        this.selectedPunetori = punetori;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  
  updatePunetori = async (punetori: Punetori) => {
    this.loading = true;
    try {
      await agent.Punetoret.update(punetori);
      runInAction(() => {
        this.punetoriRegistry.set(punetori.id, punetori);
        this.selectedPunetori = punetori;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deletePunetori = async (id: string) => {
    this.loading = true;
    try {
      await agent.Punetoret.delete(id);
      runInAction(() => {
        this.punetoriRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
