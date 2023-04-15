import React from "react";
import { Flex, Text, Link as UILink } from "@chakra-ui/react";
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
          w={"12rem"}
        >
          LOGO
        </Text>
      </Link>
      <Flex justifyContent="space-between" alignItems="center" fontSize="sm">
        <UILink pl="8">Profile</UILink>
        <UILink pl="8">Status</UILink>
        <Link href="/settings">
          <UILink pl="8">Settings</UILink>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
