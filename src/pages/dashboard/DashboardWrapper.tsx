import React from 'react';
import PrivateHeader from '../../components/headers/PrivateHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import { Box } from 'theme-ui';

type Props = {
  children: React.ReactNode;
};

function DashboardWrapper({ children }: Props) {
  return (
    <>
      <Sidebar />
      <PrivateHeader />

      <Box sx={{ width: 'calc(100% - 17rem)' }} px={5} ml="auto">
        {children}
      </Box>
    </>
  );
}

export default DashboardWrapper;
