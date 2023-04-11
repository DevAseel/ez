import React, { useState, useEffect } from "react";
import { Grid, GridItem, Stack, Heading } from "@chakra-ui/react";
import UserHero from "~/components/UserHero";
import { api } from "~/utils/api";
import { getSession, useSession } from "next-auth/react";
import LeaderboardTable from "~/components/LeaderboardTable";
import Awards from "~/components/Awards";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import Status from "~/components/Status";
import Head from "next/head";
import type { GetSessionParams } from "next-auth/react";

const Zone = () => {
  const { data: sessionData } = useSession();

  const { data: allAwards, isLoading: isAllAwardsLoading } =
    api.awards.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });

  const {
    data: allStatus,
    refetch: refetchAllStatus,
    isLoading: isAllStatusLoading,
  } = api.status.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const {
    data: allPoints,
    refetch: refetchAllPoints,
    isLoading: isAllPointsLoading,
  } = api.points.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

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

  const [haki, setHaki] = useState(0);

  useEffect(() => {
    if (pointsData?.points) setHaki(Math.round(pointsData?.points * 0.1));
  }, [pointsData]);

  return (
    <>
      <Head>
        <title>EZ - Employee engagement Zone</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <GridItem bg="#171923" rowSpan={1} colSpan={5}>
          <Header />
        </GridItem>
        <GridItem bg="#171923" rowSpan={12} colSpan={1} w="100%">
          <UserHero
            pointsData={pointsData}
            statusData={statusData}
            haki={haki}
          />
        </GridItem>
        <GridItem rowSpan={10} colSpan={4}>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={4}
            h="85vh"
            padding="4"
          >
            <GridItem
              w="100%"
              h="100%"
              bg="teal.800"
              rowSpan={1}
              colSpan={1}
              borderRadius="md"
            >
              <Stack spacing={6}>
                <Heading as="h1" size="md" pl="4" pt="1 " noOfLines={1}>
                  Feed ✨
                </Heading>
              </Stack>
            </GridItem>
            <GridItem
              w="100%"
              h="100%"
              bg="#171923"
              rowSpan={1}
              colSpan={1}
              borderRadius="md"
            >
              <LeaderboardTable allPoints={allPoints} />
            </GridItem>
            <GridItem
              w="100%"
              h="100%"
              bg="#171923"
              rowSpan={1}
              colSpan={1}
              borderRadius="md"
              overflowY="scroll"
            >
              <Status allStatus={allStatus} />
            </GridItem>
            <GridItem
              w="100%"
              h="100%"
              bg="teal.800"
              rowSpan={1}
              colSpan={1}
              borderRadius="md"
            >
              <Awards haki={haki} allAwards={allAwards} />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem pl="2" rowSpan={1} colSpan={4} position="relative">
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
};

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default Zone;
