import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/metodaAgent";
import { Fluturimi } from "../models/fluturimi";

export default class FluturimiStore {
  fluturimiRegistry = new Map<string, Fluturimi>();
  selectedFluturimi: Fluturimi | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }


  get fluturimetByDate() {
    return Array.from(this.fluturimiRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedFluturimet() {
    return Object.entries(   //nje array i objekteve, cdo objekt e ka nje key qe o date dhe per cdo date do kemi array te datave
      this.fluturimetByDate.reduce((fluturimet, fluturimi) => {
        const date = format(fluturimi.date!, 'dd MMM yyyy');
        fluturimet[date] = fluturimet[date] ? [...fluturimet[date], fluturimi] : [fluturimi];
        return fluturimet;
      }, {} as {[key: string]: Fluturimi[]})
    )
  }

  loadFluturimet = async () => {
    this.loadingInitial = true;
    try {
      const fluturimet = await agent.Fluturimet.list();
      fluturimet.forEach(fluturimi => {
        this.setFluturimi(fluturimi);
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }

  loadFluturimi = async (id: string) => {
    let fluturimi = this.getFluturimi(id);
    if (fluturimi) {
      this.selectedFluturimi = fluturimi;
      return fluturimi;
    } else {
      this.loadingInitial =true;
      try {
        fluturimi = await agent.Fluturimet.details(id);
        this.setFluturimi(fluturimi);
        runInAction(() => {
          this.selectedFluturimi = fluturimi;
        }) 
        this.setLoadingInitial(false);
        return fluturimi;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }

  private setFluturimi = (fluturimi: Fluturimi) => {
    fluturimi.date = new Date(fluturimi.date!);
    this.fluturimiRegistry.set(fluturimi.id, fluturimi);
  };

  private getFluturimi = (id: string) => {
    return this.fluturimiRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  addFluturimi = async (fluturimi: Fluturimi) => {
    this.loading = true;
    try {
      await agent.Fluturimet.create(fluturimi);
      runInAction(() => {
        this.fluturimiRegistry.set(fluturimi.id, fluturimi);
        this.selectedFluturimi = fluturimi;
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
  
  updateFluturimi = async (fluturimi: Fluturimi) => {
    this.loading = true;
    try {
      await agent.Fluturimet.update(fluturimi);
      runInAction(() => {
        this.fluturimiRegistry.set(fluturimi.id, fluturimi);
        this.selectedFluturimi = fluturimi;
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

  deleteFluturimi = async (id: string) => {
    this.loading = true;
    try {
      await agent.Fluturimet.delete(id);
      runInAction(() => {
        this.fluturimiRegistry.delete(id);
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
