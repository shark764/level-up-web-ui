import React, { ReactNode } from 'react';
import { styled } from 'stitches.config';
import { Navbar } from './components';

interface Props {
  children: ReactNode;
}

const Container = styled('div', {
  display: 'flex',
  /*  padding: '$1 $3', */
  height: '100%',
  gap: '$4'
});

const Content = styled('main', {
  width: '100%',
  padding: '$1 $4'
});

export const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
    </Container>
  );
};
