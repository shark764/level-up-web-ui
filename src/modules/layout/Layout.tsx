import React, { ReactNode } from 'react';
import { styled } from 'stitches.config';
import { Navbar } from './components';

interface Props {
  children: ReactNode;
}

const Container = styled('div', {
  display: 'flex',
  minHeight: '100vh'
});

const Content = styled('main', {
  width: '100%',
  padding: '0'
});

export const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
    </Container>
  );
};
