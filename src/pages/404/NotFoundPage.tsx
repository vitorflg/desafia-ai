import React from 'react';
import { Box, Heading, Flex, Paragraph } from 'theme-ui';
import Image from '../../components/image/Image';
import { Link } from 'wouter';

function NotFoundPage() {
  return (
    <Flex
      p={6}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <Image
        sx={{
          width: '100%',
          maxWidth: '40rem',
        }}
        src="404.png"
      />

      <Box>
        <Heading as="h1">404</Heading>
        <Paragraph>
          This page does not exist,<br></br>
          <Link to="/dashboard">back to home!</Link>
        </Paragraph>
      </Box>
    </Flex>
  );
}

export default NotFoundPage;
