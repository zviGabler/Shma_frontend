import { endpoints } from "../constants/settings"

export default class Api {
  constructor(axios) {
    this.axios = axios
  }
  
  login = async (userName, password) => await this.axios.post('/users/login', { userName, password })

  getUserById = async (id) => await this.axios.get(`${endpoints.users}${endpoints.userById}?id=${id}`)
  
  // signup =

  // getMessages...
}