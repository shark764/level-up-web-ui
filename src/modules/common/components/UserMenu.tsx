import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Popover from '@radix-ui/react-popover';
import { PersonIcon } from '@modules/common/components';
import { styled } from 'stitches.config';
import { useAuth } from '@modules/auth';

const Avatar = styled(Popover.Trigger, {
  all: 'unset',
  width: 48,
  height: 48,
  borderRadius: '$round',
  border: '2px solid $royalPurple',
  textAlign: 'center',
  cursor: 'pointer',
  '& svg': {
    width: 16,
    height: 16,
    color: '$royalPurple'
  }
});

const Content = styled(Popover.Content, {
  borderRadius: 12,
  backgroundColor: '$offWhite',
  color: '$mediumGray'
});

const Header = styled('header', {
  paddingTop: '$3',
  paddingX: '$3',
  textAlign: 'center',

  '& h1': {
    fontWeight: 'normal',
    fontSize: '$bodyLarge',
    lineHeight: '$2',
    color: '$charcoalMedium'
  },
  '& h2': {
    fontWeight: 'normal',
    fontSize: '$bodyNormal',
    lineHeight: '$3'
  }
});

const Separator = styled('hr', {
  width: '80%',
  border: '1px solid $lightGray'
});

const Body = styled('ul', {
  listStyle: 'none',
  padding: 0,
  '& li': {
    fontSize: '$bodyLarge',
    padding: '$1 $3',
    cursor: 'not-allowed'
  },

  '& li:hover': {
    backgroundColor: '$lightGray',
    color: '$charcoalLight'
  }
});

const Footer = styled('footer', {
  borderRadius: '0 0 12px 12px',
  backgroundColor: '$magenta',
  color: '$offWhite'
});

const LogoutButton = styled('button', {
  all: 'unset',
  width: '100%',
  paddingY: '$2',
  textAlign: 'center',
  cursor: 'pointer'
});

export const UserMenu = () => {
  const history = useHistory();
  const { user, signOut } = useAuth();

  return (
    <Popover.Root>
      <Avatar>
        <PersonIcon />
      </Avatar>
      <Content>
        <Header>
          <h1>{user.name}</h1>
          <h2>{user.role}</h2>
        </Header>
        <Separator />
        <Body>
          <li>Notifications</li>
          <li>Profile Information</li>
          <li>Profile Settings</li>
        </Body>
        <Footer>
          <LogoutButton
            onClick={() => {
              signOut(() => history.push('/'));
            }}
          >
            Logout
          </LogoutButton>
        </Footer>
      </Content>
    </Popover.Root>
  );
};
