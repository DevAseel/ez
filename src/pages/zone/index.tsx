import React, { useState, useEffect } from "react";
import { Grid, GridItem, Stack, Heading } from "@chakra-ui/react";
import { api } from "~/utils/api";
import { getSession, useSession } from "next-auth/react";
import LeaderboardTable from "~/components/LeaderboardTable";
import Awards from "~/components/Awards";
import Status from "~/components/Status";
import Head from "next/head";
import type { GetSessionParams } from "next-auth/react";
import Main from "~/layouts/Main";

const Zone = () => {
  const { data: sessionData } = useSession();

  const { data: allAwards } = api.awards.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const { data: allStatus } = api.status.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const { data: allPoints } = api.points.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const { data: pointsData } = api.points.getLatest.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const [haki, setHaki] = useState(0);

  useEffect(() => {
    if (pointsData?.points) setHaki(Math.round(pointsData?.points * 0.1));
  }, [pointsData]);

  return (
    <>
      <Head>
        <title>EZ - Employee Engagement Zone</title>
        <meta name="description" content="Visibility made easy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(4, 1fr)"
          gap={4}
          h="85vh"
          padding="4"
        >
          <GridItem
            w="100%"
            h="100%"
            bg="teal.800"
            rowSpan={1}
            colSpan={2}
            borderRadius="md"
          >
            <Stack spacing={6}>
              <Heading as="h1" size="md" pl="4" py="2" noOfLines={1}>
                Feed ✨
              </Heading>
            </Stack>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#171923"
            rowSpan={1}
            colSpan={2}
            borderRadius="md"
          >
            <LeaderboardTable allPoints={allPoints} />
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#171923"
            rowSpan={1}
            colSpan={2}
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
            <Heading as="h1" size="md" pl="4" py="2" noOfLines={1}>
              Streaks 🎯
            </Heading>
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            bg="#171923"
            rowSpan={1}
            colSpan={1}
            borderRadius="md"
          >
            <Awards haki={haki} allAwards={allAwards} />
          </GridItem>
        </Grid>
      </Main>
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
