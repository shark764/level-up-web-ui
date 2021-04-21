import { styled } from 'stitches.config';

export const Table = styled('table', {
  width: '100%',
  borderCollapse: 'collapse'
});

export const TableHead = styled('thead', {
  backgroundColor: '$royalPurple',
  color: '$offWhite',
  '&:first-child': {
    borderRadius: '$1 0 0 $1'
  },
  '&:last-child': {
    borderRadius: '0 $1 $1 0'
  }
});

export const TableHeader = styled('th', {
  textAlign: 'left',
  padding: '$3',
  '&:first-child': {
    borderRadius: '$1 0 0 $1'
  },
  '&:last-child': {
    borderRadius: '0 $1 $1 0'
  }
});

export const TableBody = styled('tbody', {
  paddingY: '$3'
});

export const TableRow = styled('tr', {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '$royalPurple',
    color: '$offWhite'
  }
});

export const TableData = styled('td', {
  padding: '$3',
  '&:first-child': {
    borderRadius: '$1 0 0 $1'
  },
  '&:last-child': {
    borderRadius: '0 $1 $1 0'
  }
});
