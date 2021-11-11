import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/metodaAgent";
import { Rezervimi } from "../models/rezervimi";
import {format} from 'date-fns';

export default class RezervimiStore {
  rezervimiRegistry = new Map<string, Rezervimi>();
  selectedRezervimi: Rezervimi | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get rezervimetByDate() {
    return Array.from(this.rezervimiRegistry.values()).sort(
      (a, b) => a.departure!.getTime() - b.departure!.getTime()
    );
    
  }

  get groupedRezervimet() {
    return Object.entries(   //nje array i objekteve, cdo objekt e ka nje key qe o date dhe per cdo date do kemi array te datave
      this.rezervimetByDate.reduce((rezervimet, rezervimi) => {
        const date = format(rezervimi.departure!, 'dd MMM yyyy')
        const date2 = format(rezervimi.return!, 'dd MMM yyyy') 
        rezervimet[date] = rezervimet[date] ? [...rezervimet[date], rezervimi] : [rezervimi];
        rezervimet[date2] = rezervimet[date2] ? [...rezervimet[date2], rezervimi] : [rezervimi];
        return rezervimet;
      }, {} as {[key: string]: Rezervimi[]})
    )//change punetori,dateEnd
  }

  loadRezervimet = async () => {
    this.loadingInitial = true;
    try {
      const rezervimet = await agent.Rezervimet.list();
      rezervimet.forEach(rezervimi => {
        this.setRezervimi(rezervimi);
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }

  loadRezervimi = async (id: string) => {
    let rezervimi = this.getRezervimi(id);
    if (rezervimi) {
      this.selectedRezervimi = rezervimi;
      return rezervimi;
    } else {
      this.loadingInitial =true;
      try {
        rezervimi = await agent.Rezervimet.details(id);
        this.setRezervimi(rezervimi);
        runInAction(() => {
          this.selectedRezervimi = rezervimi;
        }) 
        this.setLoadingInitial(false);
        return rezervimi;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }

  private setRezervimi = (rezervimi: Rezervimi) => {
    rezervimi.departure = new Date(rezervimi.departure!);
    rezervimi.return = new Date(rezervimi.return!);
    this.rezervimiRegistry.set(rezervimi.id, rezervimi);
  };

  private getRezervimi = (id: string) => {
    return this.rezervimiRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  addRezervimi = async (rezervimi: Rezervimi) => {
    this.loading = true;
    try {
      await agent.Rezervimet.create(rezervimi);
      runInAction(() => {
        this.rezervimiRegistry.set(rezervimi.id, rezervimi);
        this.selectedRezervimi = rezervimi;
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
  
  updateRezervimi = async (rezervimi: Rezervimi) => {
    this.loading = true;
    try {
      await agent.Rezervimet.update(rezervimi);
      runInAction(() => {
        this.rezervimiRegistry.set(rezervimi.id, rezervimi);
        this.selectedRezervimi = rezervimi;
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

  deleteRezervimi = async (id: string) => {
    this.loading = true;
    try {
      await agent.Rezervimet.delete(id);
      runInAction(() => {
        this.rezervimiRegistry.delete(id);
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
