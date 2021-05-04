/** @jsx jsx */
import { Styled, Flex, Box, jsx } from 'theme-ui';
import React from 'react';
import routes from '../../routes';

type State = {
  error: unknown;
};
class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      error: null,
    };
  }
  static getDerivedStateFromError(error: unknown) {
    return { error };
  }

  componentDidCatch(error: any) {
    console.error('logging', error);
  }

  render() {
    if (this.state.error) {
      return (
        <Box>
          <Flex sx={{ pt: 7 }} variant="styles.containers.center">
            <Styled.h1>Something broke</Styled.h1>
            <Styled.a href={routes.landing_page}>Back to home</Styled.a>
          </Flex>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
