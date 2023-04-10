import React from "react";
import { Flex, Text, Link } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      height="100%"
      px="12"
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        px="2"
        w={"12rem"}
      >
        LOGO
      </Text>
      <Flex
        // width="15rem"
        justifyContent="space-between"
        alignItems="center"
        fontSize="sm"
      >
        <Link pl="8">Profile</Link>
        <Link pl="8">Status</Link>
        <Link pl="8">Settings</Link>
      </Flex>
    </Flex>
  );
};

export default Header;
