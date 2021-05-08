import React from 'react';
import { useCookies } from 'react-cookie';
import { useLocation } from 'wouter';
import routes from '.';

const GOOGLE_TOKEN_INFO_BASE_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo';

function PrivateRoutes({ children }) {
  const [, setLocation] = useLocation();
  const [googleApiCallResponse, setGoogleApiCallResponse] = React.useState<Response>();
  const [cookies, _] = useCookies(['da_google_token']);

  React.useEffect(() => {
    fetch(`${GOOGLE_TOKEN_INFO_BASE_URL}?access_token=${cookies['da_google_token']}`).then(
      (data) => {
        setGoogleApiCallResponse(data);

        if (data.status !== 200) {
          setLocation(routes.auth);
        }
      }
    );
  }, []);

  return googleApiCallResponse ? children : <></>;
}

export default PrivateRoutes;
