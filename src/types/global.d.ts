export type HistoryState = {
  location: string;
};

export type GoogleAPI = {
  loading: boolean;
  error?: unknown;
};

export type GoogleProfile = {
  getId: () => string;
  getName: () => string;
  getGivenName: () => string;
  getEmail: () => string;
  getImageUrl: () => string;
};

export type GoogleUser = {
  status?: 'valid_token' | 'expired_token';
  profile?: {
    ID?: string;
    name?: string;
    firstName?: string;
    email?: string;
    imageUrl?: string;
  };
  interactions: boolean;
  getBasicProfile?: () => GoogleProfile;
  [key: string]: any;
};

export interface GoogleClient {
  isSignedIn: {
    get: () => boolean;
  };
  currentUser: {
    get: () => GoogleUser;
  };
  signOut: () => Promise<void>;
  signIn: () => Promise<GoogleUser>;
}

declare global {
  interface Window {
    gapi: {
      load: (module: string, callback: () => void) => Promise<any>;
      auth2: {
        init: (initProps: { client_id: string }) => Promise<GoogleClient | undefined>;
      };
    };
  }
}
