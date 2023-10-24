import React from 'react';

import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Container, FormBox } from './LoginPage.styled';

export default function LoginPage() {
  return (
    <Container>
      <FormBox>
        <LoginForm />
      </FormBox>
    </Container>
  );
}