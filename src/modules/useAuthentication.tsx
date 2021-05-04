import React from 'react';
import { GoogleClient, GoogleUser, GoogleAPI } from '../types/global';
import { useLocation } from 'wouter';
import { gql, useMutation } from '@apollo/client';

const GOOGLE_CLIENT_ID =
  '800974187362-ork5qrc63vnkvd3gme7p14bbba6ovfft.apps.googleusercontent.com';

export function useAuthentication() {
  const [GoogleClient, setGoogleClient] = React.useState<
    GoogleClient | undefined
  >(undefined);
  const [currentUser, setCurrentUser] = React.useState<GoogleUser>({});
  const [googleAPI, setGoogleAPI] = React.useState<GoogleAPI>({
    loading: true,
    error: undefined,
  });
  const [location, setLocation] = useLocation();

  const GET_OR_CREATE_USER_QUERY = gql`
    mutation User($googleId: String!, $email: String!, $name: String) {
      user(input: { googleId: $googleId, email: $email, name: $name })
    }
  `;
  const [getOrCreateUser] = useMutation(GET_OR_CREATE_USER_QUERY, {
    context: {
      headers: {
        Authorization: currentUser?.qc?.access_token,
      },
    },
  });

  React.useEffect(() => {
    if (window.gapi) {
      window.gapi.load('auth2', () => {
        initializeGoogleLib();
      });
    } else {
      throw new Error('Google lib has not initialized');
    }
  }, []);

  // GOOGLE LOGIC

  const initializeGoogleLib = () => {
    return window.gapi.auth2
      .init({
        client_id: GOOGLE_CLIENT_ID,
      })
      .then((Client) => {
        setGoogleClient(Client);

        if (isUserSignedIn(Client)) {
          const user = getUser(Client);

          setUser(user);
        } else {
          setUser({ status: 'expired_token' });
        }

        return setGoogleAPI({ loading: false });
      });
  };

  const getUser = (Client?: GoogleClient) => {
    return Client?.currentUser?.get?.();
  };

  const isUserSignedIn = (Client?: GoogleClient) => {
    return Client?.isSignedIn?.get?.();
  };

  const signIn = () => {
    setGoogleAPI({ loading: true });

    return GoogleClient?.signIn().then((user: GoogleUser) => {
      setUser(user);
      document.cookie = `da_google_token=${user.qc.access_token}`;

      setGoogleAPI({ loading: false });
    });
  };

  const signOut = () => {
    setGoogleAPI({ loading: true });

    return GoogleClient?.signOut().then(() => {
      setUser({ status: 'expired_token' });
      document.cookie = 'da_google_token=';

      if (location !== '/auth') {
        setLocation('/auth');
      }

      setGoogleAPI({ loading: false });
    });
  };

  // OUR LOGIC

  const checkAPIAndRedirect = async () => {
    const data = await getOrCreateUser({
      variables: {
        googleId: currentUser?.Aa,
        email: currentUser?.profile?.email,
        name: currentUser?.profile?.name,
      },
    }).catch(() => {
      signOut();

      return alert(
        'Não conseguimos reconhecer o seu usuário em nossa base de dados. Por favor, entre em contato pelo chat!'
      );
    });

    if (data) {
      return setLocation('/dashboard');
    }
  };

  const getUserProfile = () => {
    return currentUser.profile;
  };

  const setUser = (user?: GoogleUser) => {
    let formattedProfile = {};
    const profile = user?.getBasicProfile?.();

    if (profile) {
      formattedProfile = {
        status: 'valid_token',
        profile: {
          ID: profile?.getId(),
          name: profile?.getName(),
          firstName: profile?.getGivenName(),
          email: profile?.getEmail(),
          imageUrl: profile?.getImageUrl(),
        },
      };
    }

    return setCurrentUser({
      ...currentUser,
      ...user,
      ...formattedProfile,
    });
  };

  const isLoading = () => {
    return !currentUser.status || googleAPI.loading;
  };

  const isTokenValid = () => {
    return currentUser.status === 'valid_token';
  };

  return {
    initializeGoogleLib,
    getUser,
    getUserProfile,
    setUser,
    signIn,
    signOut,
    isUserSignedIn,
    isLoading,
    isTokenValid,
    checkAPIAndRedirect,
  };
}
