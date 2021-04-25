import React from 'react';
import { useAuth } from '@modules/auth';
import { Header, Title, SubTitle } from '@styles/page';
import { UserMenu } from '@modules/common/components';

export const Devices = () => {
  const { user } = useAuth();

  return (
    <div>
      <Header>
        <div>
          <Title>Devices</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>
    </div>
  );
};
