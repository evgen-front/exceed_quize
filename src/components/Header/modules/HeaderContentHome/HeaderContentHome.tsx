import { FC } from 'react';
import { useAtom } from 'jotai';
import { Box, Text, Avatar } from 'components';
import { userAtom } from 'atoms/userAtom';
import { colors } from 'consts';
import { Link } from 'react-router-dom';
import { PROFILE } from 'Router/routes';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
`;

export const HeaderContentHome: FC = () => {
  const [user] = useAtom(userAtom);

  return (
    <Box display='flex' width='100%' justifyContent='space-between'>
      <Box display='flex' flexDirection='column'>
        <Text color={colors.WHITE} fontSize='16px'>
          Привет,
        </Text>
        <Text color={colors.WHITE} fontSize='24px'>
          {user?.username}
        </Text>
      </Box>
      <StyledLink to={PROFILE}>
        <Avatar name={user?.username} />
      </StyledLink>
    </Box>
  );
};
