import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import UserHero from "~/components/UserHero";
import { api } from "~/utils/api";
import { getSession, useSession } from "next-auth/react";

const Zone = () => {
  const { data: sessionData } = useSession();

  const {
    data: pointsData,
    refetch: refetchPoints,
    isLoading: isPointsLoading,
  } = api.points.getLatest.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const {
    data: statusData,
    refetch: refetchStatus,
    isLoading: isStatusLoading,
  } = api.status.getLatest.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(5, 1fr)"
      h="100vh"
      gap="0"
      color="blackAlpha.700"
      fontWeight="bold"
      bg="#1A202C"
    >
      <GridItem pl="2" bg="#171923" rowSpan={1} colSpan={5}>
        Header
      </GridItem>
      <GridItem bg="#171923" rowSpan={12} colSpan={1} w="100%">
        <UserHero pointsData={pointsData} statusData={statusData} />
      </GridItem>
      <GridItem pl="2" rowSpan={10} colSpan={4}>
        Main
      </GridItem>
      <GridItem pl="2" rowSpan={1} colSpan={1}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default Zone;
