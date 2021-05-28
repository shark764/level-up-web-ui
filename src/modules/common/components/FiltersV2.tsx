import React, { ReactNode, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDownIcon } from '@modules/common/components';

import { styled } from 'stitches.config';

interface Props {
  content: ReactNode;
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
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  backgroundColor: '$charcoalMedium',
  color: '$mediumGray',
  borderTop: '6px solid $royalPurple',
  marginTop: 28,
  border: '1px solid $charcoalLight',
  width: '150vh'
});

const FiltersContainer = styled('div', {
  borderTop: '6px solid $royalPurple'
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

export const FilterTitle = styled('h4', {
  fontWeight: 700,
  fontStyle: 'normal',
  fontSize: '$bodyLarge',
  color: '$royalPurple',
  lineHeight: '$1'
});

const ChevronIcon = styled(ChevronDownIcon, {
  MozTransition: 'all .1s linear',
  WebkitTransition: 'all .1s linear',
  transition: 'all .1s linear',

  variants: {
    direction: {
      up: {
        MozTransform: 'rotate(180deg)',
        WebkitTransform: 'rotate(180deg)',
        transform: 'rotate(180deg)'
      },
      down: {
        MozTransform: 'rotate(0deg)',
        WebkitTransform: 'rotate(0deg)',
        transform: 'rotate(0deg)'
      }
    }
  }
});

export const Root = ({ content }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root onOpenChange={setOpen}>
      <Trigger>
        {open ? 'Hide Filters' : 'Show Filters'}{' '}
        <ChevronIcon direction={open ? 'up' : 'down'} />
      </Trigger>
      <Content>
        <FiltersContainer>{content}</FiltersContainer>
      </Content>
    </Popover.Root>
  );
};
