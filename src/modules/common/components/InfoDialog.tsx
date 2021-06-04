import React from 'react';
import * as Info from '@radix-ui/react-alert-dialog';
import { styled } from 'stitches.config';
import { CloseIcon } from './Icons';

interface Props {
  open: boolean;
  title: string;
  content: string | React.ReactElement;
  color?: 'danger' | 'warning';
  onClose: () => void;
}

const Overlay = styled(Info.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, .15)',
  backdropFilter: 'blur(8px)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
});

const Content = styled(Info.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  backgroundColor: '$charcoalMedium',
  borderRadius: 12,
  padding: '$4 $1',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  maxWidth: 363
});

const IconContainer = styled('div', {
  right: 15,
  top: 15,
  position: 'absolute',
  cursor: 'pointer',
  '& svg': {
    width: 20,
    height: 20,
    fill: '$charcoalLight'
  }
});

const Title = styled(Info.Title, {
  color: '$brightGreen'
});

export const InfoDialog = ({
  open,
  title,
  content,
  color = 'warning',
  onClose
}: Props) => (
  <Info.Root open={open}>
    <Overlay />
    <Content>
      <IconContainer color={color} onClick={onClose}>
        <CloseIcon />
      </IconContainer>
      <Title>{title}</Title>
      <Info.Description as='div'>{content}</Info.Description>
    </Content>
  </Info.Root>
);
