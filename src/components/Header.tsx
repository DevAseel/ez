import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      height="100%"
      px="12"
    >
      <Link href="/">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          px="2"
          w="12rem"
        >
          EZ
        </Text>
      </Link>
      <Flex justifyContent="space-between" alignItems="center" fontSize="sm">
        <Text pl="8">Profile</Text>
        <Text pl="8">Status</Text>
        <Link href="/settings">
          <Text pl="8">Settings</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
