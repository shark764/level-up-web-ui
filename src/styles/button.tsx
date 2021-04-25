import { styled } from 'stitches.config';

export const Button = styled('button', {
  all: 'unset',
  display: 'flex',
  gap: '$1',
  alignItems: 'center',
  padding: '$3 $4',
  borderRadius: '$1',
  fontSize: '$bodyMedium',
  backgroundColor: '$charcoalLight',
  color: '$offWhite',
  cursor: 'pointer',

  variants: {
    color: {
      danger: {
        backgroundColor: '$error'
      },
      purple: {
        backgroundColor: '$royalPurple'
      },
      green: {
        backgroundColor: '$brightGreen',
        color: '$charcoalMedium'
      }
    }
  }
});
