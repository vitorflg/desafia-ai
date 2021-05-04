import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './pages/landing-page/LandingPage';
import HomePage from './pages/dashboard/HomePage';
import ChallengesPage from './pages/dashboard/ChallengesPage';
import ChallengePage from './pages/dashboard/ChallengePage';
import NotFoundPage from './pages/404/NotFoundPage';
import AuthenticationPage from './pages/authentication/AuthenticationPage';
import { ThemeProvider } from 'theme-ui';
import theme from './themes';
import './themes/index.css';
import 'vtex-tachyons';
import { Route, Switch } from 'wouter';
import routes from './routes';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import { DataProvider } from './data/DataLayer';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/dev/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <Switch>
              <Route path={routes.landing_page} component={LandingPage}></Route>
              <Route path={routes.auth} component={AuthenticationPage}></Route>
              <Route path={routes.dashboard.home} component={HomePage}></Route>
              <Route
                path={routes.dashboard.challenges}
                component={ChallengesPage}
              ></Route>
              <Route
                path={routes.dashboard.challenge}
                component={ChallengePage}
              ></Route>
              <Route component={NotFoundPage}></Route>
            </Switch>
          </ErrorBoundary>
        </ThemeProvider>
      </DataProvider>
    </ApolloProvider>
  );
};

const rootElement = document.getElementById('app');

// It's being used an experimental version of React and the project has the requirements to use it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.unstable_createRoot(rootElement, { hydrate: true }).render(<App />);
