import React from "react";
import { Avatar, AvatarBadge, Stack, Text, Badge } from "@chakra-ui/react";
import { Divider, Center, Button, Tooltip, Flex } from "@chakra-ui/react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Logout from "@mui/icons-material/Logout";
import type { Points, Status } from "@prisma/client";
import { useSession, signOut } from "next-auth/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
type UserHeroProps = {
  pointsData: Points | null | undefined;
  statusData: Status | null | undefined;
  haki: number;
};

const UserHero = ({ pointsData, statusData, haki }: UserHeroProps) => {
  const { data: sessionData } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Stack direction="row">
            <Text fontSize="sm" fontWeight="bold">
              {sessionData?.user.name}
            </Text>
            <Tooltip label="logout" placement="top">
              <Logout onClick={onOpen} style={{ fontSize: "1rem" }} />
            </Tooltip>
          </Stack>
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
            <Tooltip label="Points" fontSize="xs">
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
            <Tooltip label="Karma" fontSize="xs">
              <WhatshotIcon fontSize="small" />
            </Tooltip>

            <Badge
              bg="#1A202C"
              size="sm"
              colorScheme="white"
              textAlign="center"
            >
              {haki}
            </Badge>
            <Tooltip
              hasArrow
              label={statusData?.status}
              fontSize="xs"
              fontStyle="italic"
            >
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
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bgColor="#171923">
          <ModalHeader fontWeight="bold">Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="sm">
            Leaving is never easy, but seeing you go feels like losing a slice
            of our daily happiness pie. We will miss you and your unique flavor.
            Safe travels, dear friend! 👋
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              size="sm"
              onClick={() => void signOut()}
            >
              Leave
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Stay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserHero;
