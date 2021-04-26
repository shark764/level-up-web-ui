import React from 'react';
import { useAuth } from '@modules/auth';
import { UserMenu } from '@modules/common/components';
import { Header, Title, SubTitle, PageContent } from '@styles/page';

export const Device = () => {
  const { user } = useAuth();
  return (
    <>
      <Header>
        <div>
          <Title>Device Details</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>
      <PageContent>Work In Progress</PageContent>
    </>
  );
};
