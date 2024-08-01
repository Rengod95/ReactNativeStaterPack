import {AxiosHeaderValue, AxiosInstance} from 'axios';
import _ from 'lodash-es';

export class AxiosConfigManager {
  private instance;
  constructor(_instance: AxiosInstance) {
    this.instance = _instance;
  }

  public updateRequestGlobalHeaderConfig(header: {[key: string]: AxiosHeaderValue}) {
    const prev = _.cloneDeep(this.instance.defaults.headers);
    this.instance.defaults.headers = _.merge(prev, header);
  }
}
