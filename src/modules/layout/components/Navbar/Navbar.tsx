import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStickyState } from '@modules/common/hooks';
import {
  HamburgerMenuIcon,
  HomeIcon,
  FacilityIcon,
  ZoneIcon,
  DeviceIcon
} from '@modules/common/components';
import { styled } from 'stitches.config';

const Container = styled(motion.nav, {
  display: 'flex',
  flexDirection: 'column',
  padding: '$3',
  borderRight: '1px solid $charcoalMedium',
  variants: {
    size: {
      extended: {
        width: 240
      },
      collapsed: {
        width: 'auto'
      }
    }
  },
  defaultVariants: {
    size: 'collapsed'
  }
});

const NavbarToggle = styled('button', {
  all: 'unset',
  marginRight: 'auto',
  padding: '$3',
  borderRadius: '$3',
  cursor: 'pointer',

  '&:hover': {
    background: '$royalPurple'
  },

  '& > svg': {
    height: '16px',
    width: '16px'
  }
});

const NavigationList = styled('ol', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  listStyle: 'none',
  padding: 0
});

const NavigationButton = styled(Link, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: '$3',
  padding: '$3',
  border: 'none',
  borderRadius: '$1',
  background: 'none',
  fontSize: '$2',
  lineHeight: 1,
  color: '$royalPurple',
  cursor: 'pointer',

  '&:hover': {
    background: '$royalPurple'
  },

  '& > svg': {
    height: '16px',
    width: '16px'
  },

  variants: {
    color: {
      active: {
        background: '$royalPurple',
        '& > svg, span': {
          color: '$offWhite'
        }
      },
      inactive: {
        background: 'none'
      }
    }
  },
  defaultVariants: {
    color: 'inactive'
  }
});

const NavigationLabel = styled(motion.span, {
  fontWeight: 500
});

const pages = [
  { name: 'Home', path: '', icon: <HomeIcon /> },
  { name: 'Facilities', path: '/facilities', icon: <FacilityIcon /> },
  { name: 'Zones', path: '/zones', icon: <ZoneIcon /> },
  { name: 'Devices', path: '/devices', icon: <DeviceIcon /> }
];

export const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useStickyState(
    true,
    'layout:navbar:collapsed'
  );
  const location = useLocation();

  const active = pages.find((page) =>
    matchPath(location.pathname, {
      path: `${page.path}`,
      exact: true
    })
  );

  const activeRoute = active && active.path;

  return (
    <Container size={isCollapsed ? 'collapsed' : 'extended'}>
      <NavbarToggle onClick={() => setIsCollapsed(!isCollapsed)}>
        <HamburgerMenuIcon />
      </NavbarToggle>

      <NavigationList>
        {pages.map((page) => (
          <li key={page.name}>
            <NavigationButton
              to={page.path}
              color={activeRoute === page.path ? 'active' : 'inactive'}
            >
              {page.icon}
              {!isCollapsed && (
                <NavigationLabel
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {page.name}
                </NavigationLabel>
              )}
            </NavigationButton>
          </li>
        ))}
      </NavigationList>
    </Container>
  );
};
