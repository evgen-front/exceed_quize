import { AuthService } from 'api/services/AuthService';
import { useQuery } from 'react-query';

export const useUsers = (isOpen: boolean) => {
  const {
    data: userList,
    isError,
    isLoading,
    refetch,
  } = useQuery('userList', AuthService.getAllUsers, {
    select: ({ data }) => data.filter((user) => !user.is_admin),
    enabled: isOpen,
  });

  return { userList, isError, refetch, isLoading };
};
