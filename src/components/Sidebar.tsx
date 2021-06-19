import { ComponentWithAs, Flex, IconProps } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import React from 'react';

const Sidebar: React.FC = () => (
  <Flex
    w="50px"
    h="100vh"
    bg="blue.900"
    color="white"
    flexDir="column"
    align="center"
    pt={4}
    boxShadow="dark-lg"
  >
    <MenuItem icon={CheckCircleIcon} isSelected />
  </Flex>
);

export type MenuItemProps = {
  icon: ComponentWithAs<'svg', IconProps>;
  isSelected?: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, isSelected }) => {
  return (
    <Flex
      justify="center"
      bg={isSelected ? 'cyan.700' : 'blue.900'}
      w="100%"
      py={2}
      cursor="pointer"
    >
      <Icon boxSize={8} />
    </Flex>
  );
};

export default Sidebar;
