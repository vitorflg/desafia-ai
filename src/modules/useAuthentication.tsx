import React from 'react';
import { GoogleClient, GoogleUser, GoogleAPI } from '../types/global';

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

  React.useEffect(() => {
    if (window?.gapi) {
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

        setGoogleAPI({ loading: false });
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
      setGoogleAPI({ loading: false });
    });
  };

  const signOut = () => {
    setGoogleAPI({ loading: true });

    return GoogleClient?.signOut().then(() => {
      setUser({ status: 'expired_token' });
      setGoogleAPI({ loading: false });
    });
  };

  // OUR LOGIC

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

    setCurrentUser({
      ...currentUser,
      ...user,
      ...formattedProfile,
    });
  };

  const isLoading = () => {
    return !currentUser.status || googleAPI.loading;
  };

  const isTokenValid = () => {
    return currentUser.status === 'valid_token' ? true : false;
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
  };
}
