import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import { TiHome } from 'react-icons/ti';

import React from 'react';
import Communities from './Communities';

const Directory: React.FC = () => {

  return (
    <Menu>
      <MenuButton
        cursor='pointer'
        padding='0px 6px'
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{
          oultine: '1px solid', outlineColor: 'gray.200'
        }}
      >
        <Flex align='center' justify='space-between' width={{ base: 'auto', lg: '200px' }}>
          <Flex align='center' width={{ base: '40px', md: 'auto' }} mr={{ base: 0, md: 2 }}>
            <Icon as={TiHome} fontSize={24} mr={{ base: 1, md: 2 }} />
            <Flex display={{ base: 'none', lg: 'flex' }}>
              <Text fontSize='10pt' fontWeight={600}>Home</Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities/>
      </MenuList>
    </Menu>
  )
}

export default Directory;

