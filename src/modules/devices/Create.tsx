import React from 'react';
import { useAuth } from '@modules/auth';
import { UserMenu } from '@modules/common/components';
import { Header, Title, SubTitle, PageContent } from '@styles/page';

export const Create = () => {
  const { user } = useAuth();
  return (
    <>
      <Header>
        <div>
          <Title>Device Creation</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>
      <PageContent>Work In Progress</PageContent>
    </>
  );
};
