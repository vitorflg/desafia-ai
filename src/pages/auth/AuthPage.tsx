import { Box, Flex, Heading, Image } from '@theme-ui/components';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import React from 'react';
import logoImgSrc from '../../assets/images/logo.png';
import authImgSrc from '../../assets/images/woman-in-science.jpg';
import { Header } from '../../components/headers/PublicHeader';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthPage: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState();
  React.useEffect(() => {
    disableBodyScroll(document.body);

    () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  /* 
    TODO: Integrate with a custom back-end to control user authentication
    in the server
  */

  const onSuccess = (response: any) => {
    setCurrentUser(response);
    toast.dark('🚀 Login realizado com sucesso!', {
      position: 'bottom-left',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onFailure = (response: any) => {
    console.log(response);
    toast.dark('❌ Erro ao realizar login', {
      position: 'bottom-left',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  console.log(currentUser);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header
        sx={{
          px: 4,
          py: '1.25rem',
          width: 'fit-content',
          margin: 0,
        }}
      >
        <Image width="140" src={logoImgSrc} />
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
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
            />
          </Box>
          {currentUser && (
            <Box
              id="222"
              sx={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                zIndex: 999,
              }}
            >
              <GoogleLogout
                clientId="800974187362-ork5qrc63vnkvd3gme7p14bbba6ovfft.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={() => {
                  setCurrentUser(undefined);
                  toast.dark('Logout realizado com sucesso!', {
                    position: 'bottom-left',
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
              />
            </Box>
          )}
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
