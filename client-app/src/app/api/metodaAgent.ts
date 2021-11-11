import axios, { AxiosError, AxiosResponse } from "axios";
// import { request } from "http";
import { toast } from "react-toastify";
import { history } from "../..";
import { Punetori } from "../models/punetori";
import { Fluturimi } from "../models/fluturimi";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { Udhetari } from "../models/udhetari";
import { UdhetariUser, UdhetariuserFormValues } from "../models/udhetariUser";
import { Rezervimi } from "../models/rezervimi";
import { Oferta } from "../models/oferta";
import { Kerkesa } from "../models/kerkesa";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;

}, (error: AxiosError) => {
  const {data, status,config} = error.response!;
  switch (status) {
    case 400:
      if(typeof data === 'string'){
        toast.error(data);
      }
      if(config.method === 'get' && data.errors.hasOwnProperty('id')){
        history.push('/not-found');
      }
    if(data.errors){
      const modalStateErrors = [];
      for(const key in data.errors){
        if(data.errors[key]){
          modalStateErrors.push(data.errors[key])
        }
      }
      throw modalStateErrors.flat();
    } else {
      toast.error(data);
    }
    break;
    case 401:
      toast.error('unauthorized');
      break;

    case 404:
      history.push('/not-found');
      break;

    case 500:
      store.commonStore.setServerError(data);
      history.push('/server-error');
      break;
  }
  return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};


const Punetoret = {
  list: () => requests.get<Punetori[]>("/punetoret"),
  details:(id: string) => requests.get<Punetori>("/punetoret/"+id),
  create: (punetori : Punetori) => requests.post<void>("/punetoret", punetori),
  update: (punetori: Punetori) => requests.put<void>(`/punetoret/${punetori.id}`, punetori),
  delete:(id: string) => axios.delete<void>("/punetoret/"+id)
};

const Fluturimet = {
  list: () => requests.get<Fluturimi[]>("/fluturimet"),
  details:(id: string) => requests.get<Fluturimi>("/fluturimet/"+id),
  create: (fluturimi : Fluturimi) => requests.post<void>("/fluturimet", fluturimi),
  update: (fluturimi: Fluturimi) => requests.put<void>(`/fluturimet/${fluturimi.id}`, fluturimi),
  delete:(id: string) => axios.delete<void>("/fluturimet/"+id)
};

const Kerkesat = {
  list: () => requests.get<Kerkesa[]>("/kerkesat"),
  details:(id: string) => requests.get<Kerkesa>("/kerkesat/"+id),
  create: (kerkesa : Kerkesa) => requests.post<void>("/kerkesat", kerkesa),
  update: (kerkesa: Kerkesa) => requests.put<void>(`/kerkesat/${kerkesa.id}`, kerkesa),
  delete:(id: string) => axios.delete<void>("/kerkesat/"+id)
};

const Ofertat = {
  list: () => requests.get<Oferta[]>("/ofertat"),
  details:(id: string) => requests.get<Oferta>("/ofertat/"+id),
  create: (oferta : Oferta) => requests.post<void>("/ofertat", oferta),
  update: (oferta: Oferta) => requests.put<void>(`/ofertat/${oferta.id}`, oferta),
  delete:(id: string) => axios.delete<void>("/ofertat/"+id)
};

const Rezervimet = {
  list: () => requests.get<Rezervimi[]>("/rezervimet"),
  details:(id: string) => requests.get<Rezervimi>("/rezervimet/"+id),
  create: (rezervimi : Rezervimi) => requests.post<void>("/rezervimet", rezervimi),
  update: (rezervimi: Rezervimi) => requests.put<void>(`/rezervimet/${rezervimi.id}`, rezervimi),
  delete:(id: string) => axios.delete<void>("/rezervimet/"+id)
};

const Account = {
  current: () => requests.get<User>('/account'),
  login: (user: UserFormValues) => requests.post<User>('/account/login', user),
  register: (user: UserFormValues) => requests.post<User>('/account/register', user)
};

const Udhetaret = {
  list: () => requests.get<Udhetari[]>("/udhetari"),
  details: (id: string) => requests.get<Udhetari>(`/udhetari/${id}`),
  create: (udhetari: Udhetari) => axios.post<void>(`/udhetari`, udhetari),
  update: (udhetari: Udhetari) => {
    // console.log("upd:", udhetari);
    return axios.put<void>(`/udhetari/${udhetari.id}`, udhetari);
  },
  delete: (id: string) => axios.delete<void>(`/udhetari/${id}`),
};

const AccountUdhetari = {
  currentUdhetari: () =>
    requests.get<UdhetariUser>("/UdhetariAccount/currentUdhetari"),
  login: (udhetari: UdhetariuserFormValues) =>
    requests.post<UdhetariUser>("/UdhetariAccount/loginUdhetari", udhetari),
  register: (udhetari: UdhetariuserFormValues) =>
    requests.post<UdhetariUser>("/UdhetariAccount/registerUdhetari", udhetari),
};



const agent = {
  Punetoret,
  Account,
  Fluturimet,
  Udhetaret,
  Rezervimet,
  AccountUdhetari,
  Ofertat,
  Kerkesat

};

export default agent;
