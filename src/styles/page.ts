import { styled } from 'stitches.config';

export const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$3 $4',
  borderBottom: '1px solid $charcoalMedium',
  '& *': {
    margin: 0
  }
});

export const Title = styled('h1', {});

export const SubTitle = styled('p', {
  color: '$charcoalLight'
});

export const PageContent = styled('div', {
  padding: '$4'
});
