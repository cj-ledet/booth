import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://boothtickets.com:443/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  
  getModeratorBoardByUser(user_id) {
    return axios.get(API_URL + 'mod' + `?user_id=${user_id}`, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  
  getUser(id) {
    return axios.get(API_URL + `admin/${id}`, { headers: authHeader() });
  }
  
  updateUser(id, data) {
    return axios.put(API_URL + `admin/${id}`, data, { headers: authHeader() });
  }
}

export default new UserService();
