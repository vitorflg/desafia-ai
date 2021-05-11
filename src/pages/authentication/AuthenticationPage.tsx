import { Box, Flex, Heading, Image, Button } from '@theme-ui/components';
import React from 'react';
import logoImgSrc from '../../assets/images/logo.png';
import authImgSrc from '../../assets/images/woman-in-science.jpg';
import loaderGifSrc from '../../assets/images/loader.gif';
import { Header } from '../../components/headers/PublicHeader';
import { disableBodyScroll } from 'body-scroll-lock';
import { useAuthentication } from '../../modules/useAuthentication';
import { useLocation } from 'wouter';
import { useDataState } from '../../data/DataLayer';

const AuthenticationPage: React.FC = () => {
  const [, setLocation] = useLocation();
  const Authentication = useAuthentication();
  const currentUser = useDataState();
  const currentUserProfile = currentUser?.profile;
  const isTokenValid = window?.localStorage.getItem('da_google_token');

  React.useEffect(() => {
    disableBodyScroll(document.body);
  }, []);

  function onClick() {
    setLocation('/');
  }

  return (
    <>
      <Header
        sx={{
          position: 'fixed',
          px: 4,
          py: '1.25rem',
          width: 'fit-content',
          margin: 0,
          zIndex: 999,
        }}
      >
        <Box sx={{ cursor: 'pointer' }} onClick={onClick}>
          <Image width="140" src={logoImgSrc} />
        </Box>
      </Header>

      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'hidden',
          position: 'relative',
        }}
      >
        <Box sx={{ padding: '0rem 5rem', width: '45%' }}>
          <Heading sx={{ variant: 'styles.h2', maxWidth: '30rem', mt: 3 }} as="h2">
            Faça seu login na plataforma
          </Heading>
          <Box
            sx={{
              mt: 3,
              maxWidth: '25rem',
              fontSize: 1,
            }}
          >
            {Authentication.isLoading() && (
              <Image mb={3} sx={{ display: 'block' }} src={loaderGifSrc} width="30" />
            )}
            {!isTokenValid && (
              <Button variant="primary" onClick={Authentication.signIn}>
                Entrar com google
              </Button>
            )}
            {isTokenValid && (
              <>
                {currentUserProfile && (
                  <>
                    <Box>
                      <Image variant="avatar" sx={{ mr: 3 }} src={currentUserProfile.imageUrl} />
                      <Heading sx={{ display: 'inline-block' }}>{currentUserProfile.name}</Heading>
                    </Box>
                    <Button
                      onClick={() => Authentication.checkAPIAndRedirect(window?.history?.state)}
                      mr={3}
                    >
                      Continuar como {currentUserProfile.firstName}
                    </Button>
                    <Button variant="primary" mt={3} onClick={Authentication.signOut}>
                      Sair
                    </Button>
                  </>
                )}
              </>
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

export default AuthenticationPage;
