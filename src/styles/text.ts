import { global, styled } from 'stitches.config';

export const useGlobalTextStyles = global({
  h1: { fontSize: '44px', lineHeight: '$1', marginTop: '$1' },
  h2: { fontSize: '36px', lineHeight: '$1' },
  h3: { fontSize: '28px', lineHeight: '$1' },
  h4: { fontSize: '24px', lineHeight: '$1' },
  h5: { fontSize: '20px', lineHeight: '$1' },
  h6: { fontSize: '16px', lineHeight: '$1' }
});

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  padding: '$2 $3 $4',
  '& > h1': {
    margin: 0
  }
});
