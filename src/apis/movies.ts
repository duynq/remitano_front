import BaseApi from './BaseApi'
import { Axios } from 'axios'

class MovieApis extends BaseApi {
  constructor(axios: Axios) {
    super(axios)
  }

   async getMovies (params: {}) {
    const res = await this.axios.get('/movies', { params })

    return res.data
  }

  async createMovie(data: any) {
    const res = await this.axios.post('/movies', data)

    return res.data
  }
}

export default MovieApis
