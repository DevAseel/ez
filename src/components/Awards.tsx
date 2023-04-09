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
      <Heading as="h1" size="xl" pl="4" pt="1 " noOfLines={1}>
        Awards 🎉
      </Heading>
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        padding="4"
      >
        {allAwards?.map((award) => (
          <Card key={award.id} bg="#171923">
            <CardHeader>
              <Heading size="md">{award.award}</Heading>
            </CardHeader>
            <CardBody fontSize="7xl" textAlign="center">
              {award.emoji}
            </CardBody>
            <CardFooter>
              {haki >= award.karma ? (
                <Button color="teal.400" colorScheme="teal">
                  {award.karma}
                  <WhatshotIcon />
                </Button>
              ) : (
                <Tooltip
                  label={
                    "You don't have enough Haki, you need " +
                    (award.karma - haki).toString() +
                    " to unlock the award."
                  }
                  fontSize="xs"
                >
                  <Button isDisabled color="teal.400" colorScheme="teal">
                    {award.karma}
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