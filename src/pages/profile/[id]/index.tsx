import { useRouter } from "next/router";
import Profile from "~/layouts/Profile";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Text,
  Flex,
  AvatarBadge,
  VStack,
  HStack,
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
      <Flex p="4">
        <HStack>
          <Avatar
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
              />
            ) : (
              <AvatarBadge
                borderColor="#1D4044"
                boxSize="1.25em"
                bg="red.500"
              />
            )}
          </Avatar>
          <VStack>
            <Text>{userData?.name}</Text>
            {userStatusData?.status ? (
              <Text fontSize="sm">{userStatusData.status}</Text>
            ) : (
              ""
            )}
          </VStack>
        </HStack>
      </Flex>
    </Profile>
  );
}
