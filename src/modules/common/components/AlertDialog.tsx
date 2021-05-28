import React, { ReactNode } from 'react';
import * as Alert from '@radix-ui/react-alert-dialog';
import { styled } from 'stitches.config';
import { Button } from '@styles/button';

interface Props {
  open: boolean;
  icon: ReactNode;
  title: string;
  titleColor?: 'danger' | 'warning' | 'default';
  description: string;
  color?: 'danger' | 'warning';
  onCancel: () => void;
  onAccept: () => void;
  cancelText?: string;
  acceptText?: string;
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
  backgroundColor: '$charcoalMedium',
  borderRadius: '$1',
  padding: '$4 64px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  maxWidth: 600
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
const Title = styled(Alert.Title, {
  variants: {
    color: {
      default: { color: '$offWhite' },
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
  titleColor = 'default',
  description,
  icon,
  color = 'warning',
  onCancel,
  onAccept,
  cancelText = 'Cancel',
  acceptText = 'Accept'
}: Props) => (
  <Alert.Root open={open}>
    <Overlay />
    <Content>
      <IconContainer color={color}>{icon}</IconContainer>
      <Title color={titleColor}>{title}</Title>
      <Alert.Description>{description}</Alert.Description>
      <Actions>
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button color='danger' onClick={onAccept}>
          {acceptText}
        </Button>
      </Actions>
    </Content>
  </Alert.Root>
);
