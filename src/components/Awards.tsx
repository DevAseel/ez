import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading, Stack, Button, SimpleGrid, Tooltip } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { type Awards } from "@prisma/client";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { api } from "~/utils/api";

type AwardsParams = {
  haki: number;
  allAwards: Awards[] | undefined;
};

const Awards = ({ allAwards, haki }: AwardsParams) => {
  const toast = useToast();
  const utils = api.useContext();
  const updateAward = api.awards.update.useMutation({
    onSuccess: async () => {
      await utils.awards.invalidate();
    },
  });

  const handleStatusUpdateSubmission = (awardId: string) => {
    updateAward.mutate({
      id: awardId,
    });

    toast({
      title: "Award Claimed",
      description: "Stay tight, your award is on the way!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

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
              {award.isClaimed ? (
                award.awardedUser && (
                  <Tooltip
                    placement="auto-start"
                    label={"Calimed by " + award.awardedUser.toString()}
                    fontSize="xs"
                  >
                    <Button isDisabled color="teal.400" colorScheme="teal">
                      <WhatshotIcon />
                    </Button>
                  </Tooltip>
                )
              ) : haki >= award.haki ? (
                <Tooltip label="claim" fontSize="xs" placement="auto-start">
                  <Button
                    color="teal.400"
                    colorScheme="teal"
                    onClick={() => handleStatusUpdateSubmission(award.id)}
                  >
                    {award.haki}
                    <WhatshotIcon />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip
                  placement="auto-start"
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
