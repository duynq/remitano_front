import { Axios } from 'axios'

class BaseApi {
  public axios: Axios
  constructor(axiosInstance: Axios) {
    this.axios = axiosInstance
  }
}

export default BaseApi
