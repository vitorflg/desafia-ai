import React from 'react';
import { useLocation } from 'wouter';
// import { useLocation } from 'wouter';
import routes from '.';

const GOOGLE_TOKEN_INFO_BASE_URL =
  'https://www.googleapis.com/oauth2/v3/tokeninfo';

function PrivateRoutes({ children }: { children: React.ReactChild }) {
  const [, setLocation] = useLocation();
  const [
    googleApiCallResponse,
    setGoogleApiCallResponse,
  ] = React.useState<Response>();

  function getCookie(key: string) {
    var matchedCookie = document.cookie.match(
      '(^|;)\\s*' + key + '\\s*=\\s*([^;]+)'
    );

    return matchedCookie?.pop();
  }

  React.useEffect(() => {
    fetch(
      `${GOOGLE_TOKEN_INFO_BASE_URL}?access_token=${getCookie(
        'da_google_token'
      )}`
    ).then((data) => {
      setGoogleApiCallResponse(data);

      if (data.status !== 200) {
        setLocation(routes.auth);
      }
    });
  }, []);

  return googleApiCallResponse ? children : <></>;
}

export default PrivateRoutes;
