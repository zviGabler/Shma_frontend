import { endpoints } from "../constants/settings"

export default class Api {
  constructor(axios) {
    this.axios = axios
  }
  
  login = async (userName, password) => await this.axios.post('/users/login', { userName, password })

  getUserById = async (id) => await this.axios.get(`${endpoints.users}${endpoints.userById}?id=${id}`)
  
  getUserChatHistory = async () => await this.axios.get(`${endpoints.users}${endpoints.userChatHistory}`)

  getUserByUserName = async (username) => await this.axios.get(`${endpoints.users}${endpoints.userDetails}?userName=${username}`)

  friendRequest = async (id1, id2) => await this.axios.post(`${endpoints.friendships}${endpoints.request}/${id1}/${id2}`)

  checkFriendship = async (id1, id2) => await this.axios.get(`${endpoints.friendships}${endpoints.checkFriendship}/${id1}/${id2}`)

  usersFromIds = async (ids) => await this.axios.post(`${endpoints.users}${endpoints.usersByIds}`, { ids })

  getFriendsIds = async (id) => await this.axios.get(`${endpoints.friendships}${endpoints.friends}/${id}`)

  // signup =

  // getMessages...
}