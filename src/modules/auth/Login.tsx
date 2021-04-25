/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '@modules/auth';
import { PersonIcon, LockClosedIcon } from '@modules/common/components';
import { Input as StyledInput } from '@styles/form';
import { styled } from 'stitches.config';
import { Button } from '@styles/button';
import { useForm } from '@modules/common/hooks';

const PageContainer = styled('div', {
  paddingX: '$3',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  width: '100%',
  height: '100vh',
  justifyContent: 'center',

  '@bp3': {
    margin: 'auto',
    maxWidth: '50%'
  }
});

const InputContainer = styled(StyledInput, {
  display: 'flex',
  gap: '$3',
  padding: '$2 22px'
});

const InputIcon = styled('div', {
  '& svg': {
    width: '24px',
    height: '24px',
    color: '$brightGreen'
  }
});

const InputContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  color: '$mediumGray',
  marginBottom: '$1',

  '& label': {
    fontSize: '$bodySmall',
    lineHeight: '$3',
    margin: 0
  }
});

const Input = styled('input', {
  all: 'unset',
  width: '100%',
  fontSize: '$bodyNormal',
  lineHeight: '$3',
  color: '$offWhite',

  '&::placeholder': {
    color: '$offWhite'
  }
});

export const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { formData, handleInputChange } = useForm({
    username: '',
    password: ''
  });

  // @ts-ignore
  const { from } = location.state || { from: { pathname: '/' } };

  const signIn = () => {
    auth.signIn(formData.username, () => {
      history.replace(from);
    });
  };

  const onEnterListener = (
    event: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      if (formData.username && formData.password) {
        signIn();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onEnterListener);
    return () => {
      document.removeEventListener('keydown', onEnterListener);
    };
  }, []);

  if (auth.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <PageContainer>
      <h1>Login</h1>
      <form></form>
      <InputContainer as='div'>
        <InputIcon>
          <PersonIcon />
        </InputIcon>
        <InputContent>
          <label htmlFor='username'>Username or email</label>
          <Input
            required
            name='username'
            placeholder='Type your username or email'
            onKeyDown={onEnterListener}
            onChange={handleInputChange}
          />
        </InputContent>
      </InputContainer>
      <InputContainer as='div'>
        <InputIcon>
          <LockClosedIcon />
        </InputIcon>
        <InputContent>
          <label htmlFor='password'>Password</label>
          <Input
            required
            name='password'
            type='password'
            placeholder='Type your password'
            onKeyDown={onEnterListener}
            onChange={handleInputChange}
          />
        </InputContent>
      </InputContainer>
      <Button
        color='purple'
        css={{ justifyContent: 'center' }}
        onClick={signIn}
      >
        Log In
      </Button>
    </PageContainer>
  );
};
