import { AuthService } from 'api/services/AuthService';
import { UpdatedUsers } from 'types';

export const makeModeratorsAction = (updatedUsers: UpdatedUsers) => {
  for (const keys in updatedUsers) {
    const userList = updatedUsers[keys as 'setTrue' | 'setFalse'];
    const keyType = keys === 'setTrue';
    if (userList.length) {
      AuthService.makeModerators(userList, keyType);
    }
  }
};
