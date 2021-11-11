import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/metodaAgent";
import { Oferta } from "../models/oferta";

export default class OfertaStore {
  ofertaRegistry = new Map<string, Oferta>();
  selectedOferta: Oferta | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }


  get ofertatByDate() {
    return Array.from(this.ofertaRegistry.values()).sort(
      (a, b) => a.checkIn!.getTime() - b.checkIn!.getTime()
    );
  }

  get groupedOfertat() {
    return Object.entries(   //nje array i objekteve, cdo objekt e ka nje key qe o date dhe per cdo date do kemi array te datave
      this.ofertatByDate.reduce((ofertat, oferta) => {
        const date = format(oferta.checkIn!, 'dd MMM yyyy');
        const date2 = format(oferta.checkOut!, 'dd MMM yyyy');
        ofertat[date] = ofertat[date] ? [...ofertat[date], oferta] : [oferta];
        ofertat[date2] = ofertat[date2] ? [...ofertat[date2], oferta] : [oferta];
        return ofertat;
      }, {} as {[key: string]: Oferta[]})
    )
  }



  loadOfertat = async () => {
    this.loadingInitial = true;
    try {
      const ofertat = await agent.Ofertat.list();
      ofertat.forEach(oferta => {
        this.setOferta(oferta);
      })
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  }

  loadOferta = async (id: string) => {
    let oferta = this.getOferta(id);
    if (oferta) {
      this.selectedOferta = oferta;
      return oferta;
    } else {
      this.loadingInitial =true;
      try {
        oferta = await agent.Ofertat.details(id);
        this.setOferta(oferta);
        runInAction(() => {
          this.selectedOferta = oferta;
        }) 
        this.setLoadingInitial(false);
        return oferta;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  }


  private setOferta = (oferta: Oferta) => {
    oferta.checkIn = new Date(oferta.checkIn!);
    oferta.checkOut = new Date(oferta.checkOut!);
    this.ofertaRegistry.set(oferta.id, oferta);
  };

  private getOferta = (id: string) => {
    return this.ofertaRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  addOferta = async (oferta: Oferta) => {
    this.loading = true;
    try {
      await agent.Ofertat.create(oferta);
      runInAction(() => {
        this.ofertaRegistry.set(oferta.id, oferta);
        this.selectedOferta = oferta;
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
  
  updateOferta = async (oferta: Oferta) => {
    this.loading = true;
    try {
      await agent.Ofertat.update(oferta);
      runInAction(() => {
        this.ofertaRegistry.set(oferta.id, oferta);
        this.selectedOferta = oferta;
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

  deleteOferta = async (id: string) => {
    this.loading = true;
    try {
      await agent.Ofertat.delete(id);
      runInAction(() => {
        this.ofertaRegistry.delete(id);
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
