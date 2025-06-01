import axios from 'axios';
import { User, IRegisterUser, UserResponse } from '../@types';

class Auth {
  async registerUser(user: IRegisterUser) {
    const res = await axios.post(`api/sn/api/signup`, user);

    if (res.status === 201) {
      return true;
    }
    return false;
  }

  async loginUser(user: User) {
    const res = await axios.post(`api/sn/api/login`, user);

    if (res.status === 200) {
      return { status: true, data: res.data as UserResponse };
    }
    return { status: false };
  }
}

const auth = new Auth();
export default auth;
