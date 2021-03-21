import { Box, Flex, Heading, Image } from '@theme-ui/components';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import React from 'react';
import logoImgSrc from '../../assets/images/logo.png';
import authImgSrc from '../../assets/images/woman-in-science.jpg';
import { Header, HeaderRow } from '../../components/headers/PublicHeader';
import GoogleLogin from 'react-google-login';

const AuthPage: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState();
  React.useEffect(() => {
    disableBodyScroll(document.body);

    () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  const responseGoogle = (response: any) => {
    console.log(response);
    setCurrentUser(response);
  };

  return (
    <>
      <Header
        sx={{
          px: 4,
          py: '1.25rem',
          width: 'fit-content',
          margin: 0,
        }}
        behaviour="relative"
      >
        <HeaderRow>
          <Image width="140" src={logoImgSrc} />
        </HeaderRow>
      </Header>

      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'hidden',
          position: 'relative',
          bottom: '4rem',
        }}
      >
        <Box sx={{ padding: '0rem 5rem', width: '45%' }}>
          <Heading
            sx={{ variant: 'styles.h2', maxWidth: '30rem', mt: 3 }}
            as="h2"
          >
            Faça seu login na plataforma
          </Heading>
          <Box
            sx={{
              mt: 3,
              maxWidth: '25rem',
              fontSize: 1,
              '> button': { fontSize: '1.5rem !important' },
            }}
          >
            <GoogleLogin
              style={{
                fontSize: '3rem',
                padding: '5rem',
                color: 'red',
                marginTop: '6rem',
              }}
              clientId="800974187362-ork5qrc63vnkvd3gme7p14bbba6ovfft.apps.googleusercontent.com"
              buttonText="Entrar com e-mail da UFF"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Box>
          <Box>
            {currentUser && (
              <Heading sx={{ marginTop: '6rem' }} as="h6">
                {JSON.stringify(currentUser)}
              </Heading>
            )}
          </Box>
        </Box>

        <Box sx={{ width: '55%', position: 'relative' }}>
          <Image
            sx={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
            }}
            src={authImgSrc}
          />
        </Box>
      </Flex>
    </>
  );
};

export default AuthPage;
