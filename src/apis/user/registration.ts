import BaseApi from '../BaseApi'
import { Axios } from 'axios'
import { AccountUserRequest } from '@/types/user'

class UserRegistrationApis extends BaseApi {
  constructor(axios: Axios) {
    super(axios)
  }

  async register(data: AccountUserRequest) {
    const res = await this.axios.post('/users', data)

    return res.data
  }
}

export default UserRegistrationApis
