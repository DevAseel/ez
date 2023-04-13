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
  Grid,
} from "@chakra-ui/react";
import { Status } from "@prisma/client";

type StatusParams = {
  allStatus: Status[] | undefined;
};

const Status = ({ allStatus }: StatusParams) => {
  const statusCardsColors = ["#1A202C", "teal.800"];
  const pattern = statusCardsColors.concat(statusCardsColors.slice().reverse());

  return (
    <>
      <Flex bg="#171923" w="100%" pb="1" position="sticky" zIndex="99" top="0">
        <Heading as="h1" size="md" pl="4" py="2" noOfLines={1}>
          Status Updates 🔥
        </Heading>
      </Flex>
      <Stack spacing={2} pt={4} pl={4} pr={4}>
        <Card w="100%" alignSelf="start" bgColor="transparent" shadow="none">
          <Grid
            templateRows="repeat(1, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            {allStatus?.map((status, index) => (
              <CardBody
                key={index}
                position="relative"
                // bgColor={index % 2 === 0 ? "#1A202C" : "teal.800"}
                bgColor={pattern[index % pattern.length]}
                borderRadius="md"
                marginBottom="2"
              >
                <div className="w-inherit relative">
                  <Flex
                    position="absolute"
                    top="0"
                    transform="auto"
                    translate="yes"
                    translateX="-75%"
                    translateY="-100%"
                  >
                    <Stack position="relative">
                      <Avatar
                        size="sm"
                        src={
                          status.image
                            ? status.image
                            : "https://cdn.discordapp.com/embed/avatars/2.png"
                        }
                      />
                      <Flex
                        // colorScheme="gray"
                        // size="xs"
                        borderRadius="full"
                        position="absolute"
                        top="10%"
                        right="-10%"
                      >
                        {status.emoji}
                      </Flex>
                    </Stack>
                  </Flex>

                  <Flex direction="column" w="100%" pl="2">
                    <Text fontSize="0.9rem" fontWeight="normal">
                      {status.userName}
                    </Text>
                    <Code
                      colorScheme="teal"
                      w="100%"
                      fontSize="xs"
                      my="2"
                      fontWeight="normal"
                      py="1"
                      pl="2"
                    >
                      {status.status}
                    </Code>
                  </Flex>
                </div>
                <Text
                  fontSize="0.5rem"
                  fontWeight="normal"
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
          </Grid>
        </Card>
      </Stack>
    </>
  );
};

export default Status;
