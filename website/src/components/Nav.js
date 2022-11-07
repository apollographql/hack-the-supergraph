import SettingsModal from './SettingsModal';
import {Box, Flex} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {Logo} from './Logo';

export default function Nav() {
  return (
    <Flex
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      p="4"
    >
      <Box as={Link} to="/">
        <Logo />
      </Box>
      <SettingsModal />
    </Flex>
  );
}
