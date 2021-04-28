import { styled } from 'stitches.config';

export const ActionButton = styled('button', {
  all: 'unset',
  padding: '$1',
  borderRadius: 4,
  color: '$lightGray',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$royalPurple'
  },

  '& svg': {
    width: 14,
    height: 14
  },

  variants: {
    color: {
      danger: {
        color: '$error'
      }
    }
  }
});

export const Table = styled('table', {
  width: '100%',
  tableLayout: 'fixed',
  borderCollapse: 'separate',
  borderSpacing: '0 8px'
});

export const TableHead = styled('thead', {
  color: '$mediumGray'
});

export const TableHeader = styled('th', {
  textAlign: 'left',
  padding: '$2',
  '&:first-child': {
    borderRadius: '$1 0 0 $1'
  },
  '&:last-child': {
    paddingX: 0,
    borderRadius: '0 $1 $1 0'
  }
});

export const TableBody = styled('tbody', {
  paddingY: '$3'
});

export const TableRow = styled('tr', {
  cursor: 'pointer',
  backgroundColor: '$charcoalMedium',
  '&:hover': {
    backgroundColor: '$charcoalLight'
  },

  [`& ${ActionButton}`]: {
    opacity: 0
  },

  [`&:hover ${ActionButton}`]: {
    opacity: 1
  }
});

export const TableData = styled('td', {
  padding: '$3',
  '&:first-child': {
    borderRadius: '$1 0 0 $1'
  },
  '&:last-child': {
    paddingY: 0,
    borderRadius: '0 $1 $1 0'
  }
});
