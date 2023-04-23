import React, { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import UserHero from "~/components/UserHero";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Loading from "~/components/Loading";

type MainLayoutProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainLayoutProps) => {
  const { data: sessionData } = useSession();
  const { data: pointsData } = api.points.getLatest.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const { data: statusData, isLoading } = api.status.getLatest.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const [haki, setHaki] = useState(0);

  useEffect(() => {
    if (pointsData?.points) setHaki(Math.round(pointsData?.points * 0.1));
  }, [pointsData]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
            <Header
              userId={sessionData?.user.id ? sessionData?.user.id : "#"}
            />
          </GridItem>
          <GridItem bg="#171923" rowSpan={12} colSpan={1} w="100%">
            <UserHero
              pointsData={pointsData}
              statusData={statusData}
              haki={haki}
            />
          </GridItem>
          <GridItem rowSpan={10} colSpan={4}>
            {children}
          </GridItem>
          <GridItem pl="2" rowSpan={1} colSpan={4} position="relative">
            <Footer />
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default Main;
