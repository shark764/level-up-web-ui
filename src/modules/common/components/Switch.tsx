import React from 'react';
import * as Toggle from '@radix-ui/react-switch';
import { styled } from 'stitches.config';

const StyledSwitch = styled(Toggle.Root, {
  appearance: 'none',
  border: 'none',
  padding: 0,
  width: 64,
  height: 26,
  backgroundColor: '$charcoalMedium',
  borderRadius: 25,
  position: 'relative',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px royalblue'
  },
  '&[data-state="checked"]': {
    backgroundColor: '$errorLight'
  }
});

const StyledThumb = styled(Toggle.Thumb, {
  display: 'block',
  width: 24,
  height: 24,
  backgroundColor: '$charcoal',
  borderRadius: '$round',
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 2px',
  transition: 'transform 100ms',
  transform: 'translateX(1px)',
  willChange: 'transform',

  '&[data-state="checked"]': {
    transform: 'translateX(36px)',
    backgroundColor: '$error'
  }
});

export const Switch = ({
  checked,
  defaultChecked,
  onCheckedChange
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: () => void;
}) => (
  <StyledSwitch
    checked={checked}
    defaultChecked={defaultChecked}
    onCheckedChange={onCheckedChange}
  >
    <StyledThumb />
  </StyledSwitch>
);
