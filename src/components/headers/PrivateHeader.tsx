import React from 'react';
import { Flex, Box } from 'theme-ui';
import ActionMenu from '@vtex/styleguide/lib/ActionMenu';
import { useAuthentication } from '../../modules/useAuthentication';

function PrivateHeader() {
  const Authentication = useAuthentication();

  const userName = Authentication.getUserProfile()?.email?.match(/^([^@]*)@/)?.[1];

  const OPTIONS = [
    {
      label: 'Sair',
      isDangerous: 'true',
      onClick: () => Authentication.signOut(),
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
