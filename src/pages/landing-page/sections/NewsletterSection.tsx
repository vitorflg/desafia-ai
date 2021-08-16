import React from 'react';
import { Box, Button, Flex, Heading, Input, Text } from 'theme-ui';
import { ToastConsumer } from '@vtex/styleguide/lib/ToastProvider';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = React.useState('');

  const isEmailRegex = email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/) ? true : false;

  return (
    <ToastConsumer>
      {({ showToast }) => (
        <Flex
          sx={{
            flexDirection: ['column', 'column', 'row'],
            justifyContent: 'center',
            alignItems: 'center',
            py: 6,
          }}
        >
          <Box sx={{ textAlign: ['center', 'center', 'left'] }}>
            <Heading as="h1">Newsletter</Heading>

            <Text sx={{ maxWidth: '22rem', mt: 3 }} variant="styles.p">
              Receba desafios periodicamente de acordo com o seu perfil
            </Text>
          </Box>

          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            variant="forms.input.primary"
            sx={{ maxWidth: '20rem', mr: [0, 0, 3], mt: 3 }}
            placeholder="vitorflg@id.uff.br"
          ></Input>

          <Button
            variant={!email || !isEmailRegex ? 'disabled' : 'primary'}
            disabled={!email || !isEmailRegex}
            onClick={() =>
              showToast({ message: 'E-mail cadastrado com sucesso :)', type: 'success' })
            }
            sx={{ mt: 3, width: ['100%', '100%', 'auto'], maxWidth: '20rem' }}
          >
            Assinar
          </Button>
        </Flex>
      )}
    </ToastConsumer>
  );
};

export default NewsletterSection;
