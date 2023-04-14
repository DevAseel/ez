import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading, Stack, Button, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { type Awards } from "@prisma/client";
import WhatshotIcon from "@mui/icons-material/Whatshot";

type AwardsParams = {
  haki: number;
  allAwards: Awards[] | undefined;
};

const Awards = ({ allAwards, haki }: AwardsParams) => {
  return (
    <Stack spacing={6}>
      <Heading as="h1" size="md" pl="4" py="2" noOfLines={1}>
        Week 1 Awards 🏆
      </Heading>
      <SimpleGrid
        spacing={1}
        templateColumns="repeat(1, minmax(1rem, 1fr))"
        padding="2"
      >
        {allAwards?.map((award) => (
          <Card
            key={award.id}
            bg="#1A202C"
            size="sm"
            flexDir="row"
            alignItems="center"
            justifyContent="center"
            height="5rem"
          >
            <CardHeader alignSelf="start">
              <Heading size="xs">{award.award}</Heading>
            </CardHeader>
            <CardBody fontSize="5xl" textAlign="center">
              {award.emoji}
            </CardBody>
            <CardFooter>
              {haki >= award.haki ? (
                <Button color="teal.400" colorScheme="teal">
                  {award.haki}
                  <WhatshotIcon />
                </Button>
              ) : (
                <Tooltip
                  label={
                    (award.haki - haki).toString() +
                    " out of " +
                    award.haki.toString() +
                    " Haki left"
                  }
                  fontSize="xs"
                >
                  <Button isDisabled color="teal.400" colorScheme="teal">
                    {award.haki}
                    <WhatshotIcon />
                  </Button>
                </Tooltip>
              )}
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default Awards;
