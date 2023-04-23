import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

type HeaderProps = {
  userId: string;
};
const Header = ({ userId }: HeaderProps) => {
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
        <Link pl="8" as={NextLink} href={`/profile/${userId}`}>
          Profile
        </Link>
        <Link pl="8" as={NextLink} href={`#`}>
          Status
        </Link>
        <Link pl="8" as={NextLink} href={`/profile/settings`}>
          Settings
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
