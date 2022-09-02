import { AuthService } from 'api/services/AuthService';
import { UpdatedUsers } from 'types';

export const makeModeratorsAction = (updatedUsers: UpdatedUsers) => {
  let value = true;
  for (const keys in updatedUsers) {
    const userList = updatedUsers[keys as 'setTrue' | 'setFalse'];
    if (userList.length) {
      AuthService.makeModerators(userList, value);
      value = false;
    }
  }
};
