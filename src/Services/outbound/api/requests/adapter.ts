import Axios, {AxiosInstance} from 'axios';

const MAIN_SERVER_BASE_URL = 'https://api.exchangerate-api.com/';

const axiosInstance = Axios.create({
  baseURL: MAIN_SERVER_BASE_URL,
});

abstract class AbstractAPIService<T> {
  readonly apiClient: T;
  constructor(_apiClient: T) {
    this.apiClient = _apiClient;
  }

  abstract Get(params: any): any;
  abstract Post(params: any): any;
  abstract Put(params: any): any;
  abstract Delete(params: any): any;
}

export class APIServiceConstructor<T extends AxiosInstance> extends AbstractAPIService<T> {
  override Get = this.apiClient.get;
  override Post = this.apiClient.post;
  override Put = this.apiClient.put;
  override Delete = this.apiClient.delete;
}

const API = new APIServiceConstructor(axiosInstance);

export default API;
