import React from 'react';
import { Flex, Box } from 'theme-ui';
import ActionMenu from '@vtex/styleguide/lib/ActionMenu';
import { useDataDispatch } from '../../data/DataLayer';
import { useLocation } from 'wouter';
import routes from '../../routes';
import currentUserQuery from '../../data/queries/currentUserQuery.graphql';
import { useQuery } from '@apollo/client';

function PrivateHeader() {
  const [, setLocation] = useLocation();
  const dispatch = useDataDispatch();

  const { data: currentUserData } = useQuery(currentUserQuery, {
    context: {
      headers: {
        Authorization: window?.localStorage.getItem('da_google_token'),
      },
      fetchPolicy: 'network-only',
    },
    onCompleted: () => {
      dispatch && dispatch({ type: 'setCurrentUser', payload: currentUserData?.currentUser });
    },
    onError: (e) => {
      window?.localStorage.removeItem('da_google_token');

      window?.history.pushState({ location }, document.title, routes.auth);
    },
  });

  const userName = currentUserData?.currentUser?.email?.match(/^([^@]*)@/)?.[1]?.toLowerCase();

  const OPTIONS = [
    {
      label: 'Sair',
      isDangerous: 'true',
      onClick: () => {
        window?.localStorage.removeItem('da_google_token');

        dispatch && dispatch({ type: 'clearState', payload: {} });

        setLocation(routes.auth);
      },
    },
  ];

  return (
    <Flex
      sx={{
        width: 'calc(100% - 17rem)',
        padding: 4,
        justifyContent: 'flex-end',
      }}
    >
      {userName && (
        <Box sx={{ position: 'absolute', top: 3, right: 3 }}>
          <ActionMenu
            label={`@${userName}`}
            buttonProps={{
              variation: 'tertiary',
            }}
            options={OPTIONS}
          />
        </Box>
      )}
    </Flex>
  );
}

export default PrivateHeader;
