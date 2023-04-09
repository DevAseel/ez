import React from "react";
import { Avatar, AvatarBadge, Stack, Text, Badge } from "@chakra-ui/react";
import { Divider, Center, Button, Tooltip } from "@chakra-ui/react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import type { Points, Status } from "@prisma/client";
import { useSession } from "next-auth/react";

type UserHeroProps = {
  pointsData: Points | null | undefined;
  statusData: Status | null | undefined;
};

const UserHero = ({ pointsData, statusData }: UserHeroProps) => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Stack direction="row" spacing={4} justifyContent="center" paddingTop="8">
        <Avatar
          size="md"
          src={
            sessionData?.user.image
              ? sessionData?.user.image
              : "https://cdn.discordapp.com/embed/avatars/2.png"
          }
        >
          <AvatarBadge borderColor="#1D4044" boxSize="1.25em" bg="green.500" />
        </Avatar>
        <Stack direction="column" minW="8rem">
          <Text fontSize="sm" fontWeight="bold">
            Aseel Al Rawahi
          </Text>
          <Badge
            bg="#1A202C"
            size="sm"
            colorScheme="white"
            textAlign="center"
            padding="0"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Tooltip label="Points, life time points" fontSize="xs">
              <LocalFireDepartmentIcon fontSize="small" />
            </Tooltip>

            <Badge
              bg="#1A202C"
              size="sm"
              colorScheme="white"
              textAlign="center"
            >
              {pointsData?.points}
            </Badge>
            <Tooltip label="Karma, used to claim rewards" fontSize="xs">
              <WhatshotIcon fontSize="small" />
            </Tooltip>

            <Badge
              bg="#1A202C"
              size="sm"
              colorScheme="white"
              textAlign="center"
            >
              14
            </Badge>
            <Tooltip hasArrow label={statusData?.status} fontSize="xs">
              <Badge
                bg="#1A202C"
                size="sm"
                colorScheme="white"
                textAlign="center"
                padding="0"
              >
                <Button colorScheme="teal" size="xs">
                  🚀
                </Button>
              </Badge>
            </Tooltip>
          </Badge>
        </Stack>
      </Stack>
      <Center>
        <Divider
          orientation="horizontal"
          width="80%"
          borderColor="#2D3748"
          paddingY="2"
        />
      </Center>
    </>
  );
};

export default UserHero;
