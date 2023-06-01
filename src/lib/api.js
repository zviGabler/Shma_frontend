export default class Api {
  constructor(axios) {
    this.axios = axios
  }

  login = async (userName, password) => await this.axios.post('/users/login', { userName, password })

  logout = async () => await this.axios.post('/users/logout')

  // signup =

  // getMessages...
}