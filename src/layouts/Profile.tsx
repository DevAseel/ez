import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { useSession } from "next-auth/react";

type MainLayoutProps = {
  children: React.ReactNode;
};

const Profile = ({ children }: MainLayoutProps) => {
  const { data: sessionData } = useSession();
  return (
    <>
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
          <Header userId={sessionData?.user.id ? sessionData?.user.id : "#"} />
        </GridItem>
        <GridItem rowSpan={10} colSpan={5}>
          {children}
        </GridItem>
        <GridItem pl="2" rowSpan={1} colSpan={5} position="relative">
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
};

export default Profile;
