import { IUser } from '../models/IUser';
import { get, post, put, del } from './client';
import { apiEndpoints } from './configs';

const userService = {
  getUsers: async (params: any) => {
    const options = { url: `${apiEndpoints.users}`, params: {...params} };
    return get(options);
  },
  getUser: async (id: string) => {
    const options = { url: apiEndpoints.user.replace(':userId', id)};
    return get(options);
  },
  deleteUser: async (id: string) => {
    const options = { url: apiEndpoints.user.replace(':userId', id)};
    return del(options);
  },
  addUser: async (newUser: IUser) => {
    const options = { url: apiEndpoints.users, data: newUser};
    return post(options);
  }
}

export default userService;