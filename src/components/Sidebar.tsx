import { ComponentWithAs, Flex, IconProps } from '@chakra-ui/react';
import { CheckCircleIcon, EditIcon, SettingsIcon } from '@chakra-ui/icons';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const routes = [
  {
    icon: CheckCircleIcon,
    url: '/',
  },
  {
    icon: EditIcon,
    url: '/editor',
  },
  {
    icon: SettingsIcon,
    url: '/settings',
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Flex
      w="50px"
      h="100vh"
      bg="blue.900"
      color="white"
      flexDir="column"
      align="center"
      pt={4}
      boxShadow="dark-lg"
      zIndex={1}
    >
      {routes.map((x) => (
        <MenuItem
          key={x.url}
          icon={x.icon}
          onClick={() => history.push(x.url)}
          isSelected={location.pathname === x.url}
        />
      ))}
    </Flex>
  );
};

export type MenuItemProps = {
  icon: ComponentWithAs<'svg', IconProps>;
  isSelected?: boolean;
  onClick: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  isSelected,
  onClick,
}) => {
  return (
    <Flex
      justify="center"
      bg={isSelected ? 'cyan.700' : 'blue.900'}
      w="100%"
      py={2}
      cursor="pointer"
      onClick={onClick}
    >
      <Icon boxSize={6} />
    </Flex>
  );
};

export default Sidebar;
