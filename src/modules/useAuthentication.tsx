import React from 'react';
import { GoogleClient, GoogleUser, GoogleAPI, HistoryState } from '../types/global';
import { useLocation } from 'wouter';
import { useMutation } from '@apollo/client';
import createUserQuery from '../data/queries/createUserQuery.graphql';
import { useDataDispatch, useDataState } from '../data/DataLayer';

const GOOGLE_CLIENT_ID = '800974187362-ork5qrc63vnkvd3gme7p14bbba6ovfft.apps.googleusercontent.com';

export function useAuthentication() {
  const [, setLocation] = useLocation();
  const [GoogleClient, setGoogleClient] = React.useState<GoogleClient | undefined>(undefined);
  const [googleAPIStatus, setGoogleAPIStatus] = React.useState<GoogleAPI>({
    loading: true,
    error: undefined,
  });
  const dispatch = useDataDispatch();
  const currentUser = useDataState();

  const [createUser] = useMutation(createUserQuery, {
    context: {
      headers: {
        Authorization: currentUser?.id_token,
      },
    },
  });

  React.useEffect(() => {
    if (window.gapi) {
      window.gapi.load('auth2', () => {
        initializeGoogleLib();
      });
    }
  }, []);

  const initializeGoogleLib = () => {
    return window.gapi.auth2
      .init({
        client_id: GOOGLE_CLIENT_ID,
      })
      .then((Client) => {
        setGoogleClient(Client);

        if (isUserSignedIn(Client) && window?.localStorage.getItem('da_google_token')) {
          const user = Client?.currentUser?.get?.();

          setCurrentUser(user);
        }

        return setGoogleAPIStatus({ loading: false });
      });
  };

  const isUserSignedIn = (Client?: GoogleClient) => {
    return Client?.isSignedIn?.get?.();
  };

  const signIn = () => {
    setGoogleAPIStatus({ loading: true });

    return GoogleClient?.signIn().then((user: GoogleUser = {}) => {
      setCurrentUser(user);
      window?.localStorage.setItem('da_google_token', user?.getAuthResponse().id_token);
      setGoogleAPIStatus({ loading: false });
    });
  };

  const signOut = () => {
    setGoogleAPIStatus({ loading: true });

    return GoogleClient?.signOut()
      .then(() => {
        window?.localStorage.removeItem('da_google_token');

        setGoogleAPIStatus({ loading: false });
      })
      .catch((e) => {
        console.log(e, 'e');
      });
  };

  const checkAPIAndRedirect = async (historyState: HistoryState) => {
    const { data: userData } = await createUser({
      variables: {
        googleId: currentUser?.profile?.ID,
        email: currentUser?.profile?.email,
        name: currentUser?.profile?.name,
      },
    }).catch(() => {
      signOut();

      return alert('Não conseguimos reconhecer o seu usuário em nossa base de dados.');
    });

    if (userData) {
      const currentDataUser = await userData?.user;
      setCurrentUser(currentDataUser);
      await setLocation(historyState?.location ?? '/dashboard');
    }
  };

  const setCurrentUser = (user?: GoogleUser) => {
    let formattedProfile = {};
    const profile = user?.getBasicProfile?.();

    if (profile) {
      formattedProfile = {
        profile: {
          ID: profile?.getId(),
          name: profile?.getName(),
          firstName: profile?.getGivenName(),
          email: profile?.getEmail(),
          imageUrl: profile?.getImageUrl(),
        },
      };
    }

    return (
      dispatch &&
      dispatch({
        type: 'setCurrentUser',
        payload: {
          id_token: user?.getAuthResponse?.().id_token,
          ...user,
          ...formattedProfile,
        },
      })
    );
  };

  const isLoading = () => {
    return googleAPIStatus.loading;
  };

  return {
    currentUser,
    initializeGoogleLib,
    setCurrentUser,
    signIn,
    signOut,
    isUserSignedIn,
    isLoading,
    checkAPIAndRedirect,
  };
}
