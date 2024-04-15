import axiosApi from '@/utils/axios'

import UserRegistrationApis from './user/registration'
import UserLoginApis from './user/login'
import MovieApis from './movies'

let apiList = {
  user: {
    registration: new UserRegistrationApis(axiosApi),
    userLogin: new UserLoginApis(axiosApi)
  },
  movie: new MovieApis(axiosApi)
}

export const $api = { ...apiList }
