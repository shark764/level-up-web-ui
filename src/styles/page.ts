import { Button } from '@styles/button';
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

export const BackButton = styled(Button, {
  gap: '$3',
  padding: 0,
  background: 'none',
  color: '$brightGreen',
  cursor: 'pointer',
  fontSize: '$bodyLarge'
});

export const ID = styled('h3', {
  fontWeight: '300',
  color: '$mediumGray',
  fontSize: '$display2',
  lineHeight: '$1',
  '& span': {
    fontWeight: 'bold'
  }
});

export const DetailsHeader = styled('header', {
  marginY: '$4',
  '& *': {
    margin: 0
  }
});

export const DetailsHeaderMain = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const DetailsHeaderSecondary = styled('div', {
  display: 'flex',
  gap: '$4',
  color: '$charcoalLight'
});

export const FiltersContainer = styled('div', {
  marginLeft: 'auto',
  marginRight: '$4'
});

export const EmptyTitle = styled('h1', {
  color: '$royalPurple',
  fontSize: '$display1',
  fontWeight: 300
});

export const EmptyImage = styled('img', {
  maxWidth: 500
});
