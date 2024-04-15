import BaseApi from '../BaseApi'
import { Axios } from 'axios'
import { AccountUserRequest } from '@/types/user'

class UserLoginApis extends BaseApi {
  constructor(axios: Axios) {
    super(axios)
  }

  async login(data: AccountUserRequest) {
    const res = await this.axios.post('/sign_in', data)

    return res.data
  }
}

export default UserLoginApis
