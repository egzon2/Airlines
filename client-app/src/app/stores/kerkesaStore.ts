import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/metodaAgent";
import { Kerkesa } from "../models/kerkesa";

export default class KerkesaStore {
  kerkesaRegistry = new Map<string, Kerkesa>();
  selectedKerkesa: Kerkesa | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }


  get kerkesatByDate() {
    return Array.from(this.kerkesaRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedKerkesat() {
    return Object.entries(   //nje array i objekteve, cdo objekt e ka nje key qe o date dhe per cdo date do kemi array te datave
      this.kerkesatByDate.reduce((kerkesat, kerkesa) => {
        const date = format(kerkesa.date!, 'dd MMM yyyy');
        kerkesat[date] = kerkesat[date] ? [...kerkesat[date], kerkesa] : [kerkesa];
        return kerkesat;
      }, {} as {[key: string]: Kerkesa[]})
    )
  }

  loadKerkesat = async () => {
    this.loadingInitial = true;
    try {
      const kerkesat = await agent.Kerkesat.list();
      kerkesat.forEach(kerkesa => {
        this.setKerkesa(kerkesa);
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }

  loadKerkesa = async (id: string) => {
    let kerkesa = this.getKerkesa(id);
    if (kerkesa) {
      this.selectedKerkesa = kerkesa;
      return kerkesa;
    } else {
      this.loadingInitial =true;
      try {
        kerkesa = await agent.Kerkesat.details(id);
        this.setKerkesa(kerkesa);
        runInAction(() => {
          this.selectedKerkesa = kerkesa;
        }) 
        this.setLoadingInitial(false);
        return kerkesa;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }

  private setKerkesa = (kerkesa: Kerkesa) => {
    kerkesa.date = new Date(kerkesa.date!);
    this.kerkesaRegistry.set(kerkesa.id, kerkesa);
  };

  private getKerkesa = (id: string) => {
    return this.kerkesaRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  addKerkesa = async (kerkesa: Kerkesa) => {
    this.loading = true;
    try {
      await agent.Kerkesat.create(kerkesa);
      runInAction(() => {
        this.kerkesaRegistry.set(kerkesa.id, kerkesa);
        this.selectedKerkesa = kerkesa;
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
  
  updateKerkesa = async (kerkesa: Kerkesa) => {
    this.loading = true;
    try {
      await agent.Kerkesat.update(kerkesa);
      runInAction(() => {
        this.kerkesaRegistry.set(kerkesa.id, kerkesa);
        this.selectedKerkesa = kerkesa;
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

  deleteKerkesa = async (id: string) => {
    this.loading = true;
    try {
      await agent.Kerkesat.delete(id);
      runInAction(() => {
        this.kerkesaRegistry.delete(id);
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
