import React, { ReactNode } from 'react';
import * as Alert from '@radix-ui/react-alert-dialog';
import { styled } from 'stitches.config';
import { Button } from '@styles/button';

interface Props {
  open: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  color?: 'danger' | 'warning';
  onCancel: () => void;
  onAccept: () => void;
}

const Overlay = styled(Alert.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, .15)',
  backdropFilter: 'blur(8px)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
});

const Content = styled(Alert.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  backgroundColor: '$charcoal',
  borderRadius: '$1',
  padding: '$4 64px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center'
});

const IconContainer = styled('div', {
  '& svg': {
    width: 64,
    height: 64
  },
  variants: {
    color: {
      danger: {
        color: '$error'
      },
      warning: {
        color: '$warning'
      }
    }
  }
});

const Actions = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: 24,
  marginTop: '$4'
});

export const AlertDialog = ({
  open,
  title,
  description,
  icon,
  color = 'warning',
  onCancel,
  onAccept
}: Props) => {
  return (
    <Alert.Root open={open}>
      <Overlay />
      <Content>
        <IconContainer color={color}>{icon}</IconContainer>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>{description}</Alert.Description>
        <Actions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button color='danger' onClick={onAccept}>
            Accept
          </Button>
        </Actions>
      </Content>
    </Alert.Root>
  );
};
