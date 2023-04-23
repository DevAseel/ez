import { useRouter } from "next/router";
import Profile from "~/layouts/Profile";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Text,
  AvatarBadge,
  VStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
export default function UserProfile() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data: userData } = api.users.getUser.useQuery(
    { userId: id },
    {
      enabled: id !== undefined && sessionData !== undefined,
    }
  );
  const { data: userStatusData } = api.status.getLatestByUser.useQuery(
    { userId: id },
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const isUserActive = () => {
    const currentTime = new Date();
    if (
      userStatusData?.hours !== 0 &&
      userStatusData?.createdAt &&
      currentTime.getTime() >=
        userStatusData?.createdAt.getTime() +
          userStatusData?.hours * userStatusData?.mins * 60 * 1000
    ) {
      return false;
    }
    if (
      userStatusData?.createdAt &&
      currentTime.getTime() >=
        userStatusData?.createdAt.getTime() + userStatusData?.mins * 60 * 1000
    ) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Profile>
      <Grid
        h="100%"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        p={4}
      >
        <GridItem
          rowSpan={1}
          colSpan={1}
          bg="gray.900"
          padding={4}
          rounded="md"
        >
          <VStack>
            <Avatar
              size="2xl"
              src={
                userStatusData?.image
                  ? userStatusData?.image
                  : "https://cdn.discordapp.com/embed/avatars/2.png"
              }
            >
              {isUserActive() ? (
                <AvatarBadge
                  borderColor="#1D4044"
                  boxSize="1.25em"
                  bg="green.500"
                  bottom="6%"
                  right="6%"
                />
              ) : (
                <AvatarBadge
                  borderColor="#1D4044"
                  boxSize="0.8em"
                  bg="red.500"
                  bottom="6%"
                  right="6%"
                />
              )}
            </Avatar>
            <VStack>
              <Text textAlign="center" width="100%">
                {userData?.name}
              </Text>
              {userStatusData?.status ? (
                <Text width="100%" fontSize="sm">
                  {userStatusData.status}
                </Text>
              ) : (
                ""
              )}
            </VStack>
          </VStack>
        </GridItem>
        <GridItem
          rowSpan={1}
          colSpan={2}
          bg="gray.900"
          padding={4}
          rounded="md"
        ></GridItem>
        <GridItem
          rowSpan={1}
          colSpan={2}
          bg="gray.900"
          padding={4}
          rounded="md"
        ></GridItem>
      </Grid>
    </Profile>
  );
}
