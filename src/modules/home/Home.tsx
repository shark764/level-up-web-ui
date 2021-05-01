import React from 'react';
import { useAuth } from '@modules/auth';
import { Header, Title, SubTitle, PageContent } from '@styles/page';
import { UserMenu } from '@modules/common/components';
import { styled } from 'stitches.config';

const BodyTitle = styled('div', {
  '& h1': {
    fontSize: '$display1',
    fontWeight: 300,
    textTransform: 'uppercase',
    color: '$royalPurple'
  }
});

const WelcomeImage = styled('img', {
  maxWidth: 500
});

export const Home = () => {
  const { user } = useAuth();

  return (
    <>
      <Header>
        <div>
          <Title>Home</Title>
          <SubTitle>{`${user.name} - ${user.role}`}</SubTitle>
        </div>
        <UserMenu />
      </Header>
      <PageContent
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 64
        }}
      >
        <BodyTitle>
          <h1>Welcome! It is nice to have you back</h1>
          <p>
            From this dashboard you’ll be able to manage facilities, zones,
            devices, equipments and many more options
          </p>
        </BodyTitle>

        <WelcomeImage src='/assets/img/welcome.svg' />
      </PageContent>
    </>
  );
};
