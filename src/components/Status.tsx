import React from "react";
import {
  Stack,
  Heading,
  Flex,
  Avatar,
  Code,
  Text,
  Card,
  CardBody,
  Tag,
} from "@chakra-ui/react";
import { Status } from "@prisma/client";

type StatusParams = {
  allStatus: Status[] | undefined;
};

const Status = ({ allStatus }: StatusParams) => {
  return (
    <>
      <Flex bg="#171923" w="100%" pb="1" position="sticky" zIndex="99" top="0">
        <Heading as="h1" size="xl" pl="4" pt="1 " noOfLines={1}>
          Status Updates 🔥
        </Heading>
      </Flex>
      <Stack spacing={6} pt={4} pl={4} pr={4}>
        <Card w="100%" alignSelf="start" bgColor="transparent" shadow="none">
          {allStatus?.map((status, index) => (
            <CardBody
              key={index}
              position="relative"
              bgColor={index % 2 === 0 ? "#1A202C" : "teal.800"}
              borderRadius="md"
              marginBottom="3"
            >
              <Flex justifyContent="start">
                <Stack position="relative">
                  <Avatar
                    size="md"
                    src={
                      status.image
                        ? status.image
                        : "https://cdn.discordapp.com/embed/avatars/2.png"
                    }
                  />
                  <Tag
                    colorScheme="gray"
                    size="xs"
                    borderRadius="full"
                    position="absolute"
                    bottom="35%"
                    right="-10%"
                  >
                    🚀
                  </Tag>
                </Stack>

                <Flex direction="column" pl="4" w="100%">
                  <Text fontSize="sm" fontWeight="medium" ml="2">
                    {status.userName}
                  </Text>
                  <Code colorScheme="teal" w="100%" p="2" m="2">
                    {status.status}
                  </Code>
                </Flex>
              </Flex>
              <Text
                fontSize="10px"
                fontWeight="medium"
                position="absolute"
                right="2"
                p="2"
                bottom="0"
                color="gray.500"
              >
                {status.createdAt.toLocaleString()}
              </Text>
            </CardBody>
          ))}
        </Card>
      </Stack>
    </>
  );
};

export default Status;
