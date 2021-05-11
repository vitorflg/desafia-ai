import React from 'react';
import { useLocation } from 'wouter';
import routes from '.';
import { useQuery } from '@apollo/client';
import currentUserQuery from '../data/queries/currentUserQuery.graphql';
import { useDataDispatch } from '../data/DataLayer';

function PrivateRoutes({ children }) {
  const [location] = useLocation();
  const [googleApiCallResponse, setGoogleApiCallResponse] = React.useState<Response>();
  const dispatch = useDataDispatch();

  const { data: currentUserData } = useQuery(currentUserQuery, {
    context: {
      headers: {
        Authorization: window?.localStorage.getItem('da_google_token'),
      },
    },
    fetchPolicy: 'network-only',
    onError: (e) => {
      window?.localStorage.removeItem('da_google_token');

      setGoogleApiCallResponse(e);

      window?.history.pushState({ location }, document.title, routes.auth);
    },
  });

  const currentUser = currentUserData?.currentUser;

  React.useEffect(() => {
    if (currentUser) {
      dispatch && dispatch({ type: 'setCurrentUser', payload: currentUser });

      setGoogleApiCallResponse(currentUser);
    }
  }, [currentUser]);

  return googleApiCallResponse ? <>{children}</> : <></>;
}

export default PrivateRoutes;
