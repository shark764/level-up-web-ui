import React, { ReactNode } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDownIcon } from '@modules/common/components';

import { styled } from 'stitches.config';

interface Props {
  content: ReactNode;
  onClear: () => void;
}

const Trigger = styled(Popover.Trigger, {
  all: 'unset',
  display: 'flex',
  gap: '$1',
  alignItems: 'center',
  padding: '$2 $3',
  borderRadius: '$1',
  fontSize: '$bodyMedium',
  backgroundColor: '$charcoalLight',
  color: '$offWhite',
  cursor: 'pointer'
});

const Content = styled(Popover.Content, {
  minWidth: 320,
  borderRadius: 12,
  backgroundColor: '$offWhite',
  color: '$mediumGray'
});

const FiltersContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '$3'
});

const Footer = styled('footer', {
  paddingY: '$3',
  borderRadius: '0 0 12px 12px',
  textAlign: 'center',
  backgroundColor: '$royalPurple',
  color: '$offWhite',
  cursor: 'pointer'
});

export const InputGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontSize: '$bodyNormal',
  color: '$charcoalLight'
});

export const Input = styled('input', {
  all: 'unset',
  padding: '$2',
  borderRadius: '$1',
  border: '1px solid $lightGray',
  backgroundColor: '$offWhite',
  color: '$mediumGray'
});

export const Root = ({ content, onClear }: Props) => (
  <Popover.Root>
    <Trigger>
      Filters <ChevronDownIcon />
    </Trigger>
    <Content>
      <FiltersContainer>{content}</FiltersContainer>
      <Footer onClick={onClear}>Clear</Footer>
    </Content>
  </Popover.Root>
);
