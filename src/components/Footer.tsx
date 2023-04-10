import React from "react";
import { Text, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Text
        fontSize="xs"
        position="absolute"
        bottom="2"
        right="50%"
        transform="auto"
        translate="yes"
        translateX="50%"
        translateY="0"
        fontWeight="thin"
      >
        Developed & maintained by{" "}
        <Link color="teal.500" href="https://github.com/DevAseel" isExternal>
          @DevAseel
        </Link>{" "}
        -{" "}
        <Link
          color="teal.500"
          href="https://github.com/DevAseel/ez/issues/new"
          isExternal
        >
          Report a bug
        </Link>{" "}
        -{" "}
        <Link
          color="teal.500"
          href="https://github.com/DevAseel/ez/issues/new"
          isExternal
        >
          Request a feature
        </Link>
      </Text>
    </>
  );
};

export default Footer;
