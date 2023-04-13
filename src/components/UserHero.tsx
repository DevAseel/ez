import React, { type ChangeEvent, useState } from "react";
import type { Points, Status } from "@prisma/client";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Logout from "@mui/icons-material/Logout";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSession, signOut } from "next-auth/react";
import { AvatarBadge, Stack, Text, Badge, Avatar } from "@chakra-ui/react";
import { Modal, ModalOverlay, Flex, Select, useToast } from "@chakra-ui/react";
import { Divider, Center, Button, ModalCloseButton } from "@chakra-ui/react";
import { ModalHeader, ModalFooter, ModalBody } from "@chakra-ui/react";
import { ModalContent, useDisclosure, Tooltip, Input } from "@chakra-ui/react";
import { api } from "~/utils/api";

type UserHeroProps = {
  pointsData: Points | null | undefined;
  statusData: Status | null | undefined;
  haki: number;
};

type emojiData = {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywards: string[];
  shortcodes: string;
};

const UserHero = ({ pointsData, statusData, haki }: UserHeroProps) => {
  const { data: sessionData } = useSession();
  const {
    isOpen: isLogoutModalOpen,
    onOpen: onLogoutModalOpen,
    onClose: onLogoutModalClose,
  } = useDisclosure();

  const {
    isOpen: isStatusModalOpen,
    onOpen: onStatusModalOpen,
    onClose: onStatusModalClose,
  } = useDisclosure();

  const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] = useState(false);

  const handleEmojiSelector = () => {
    setIsEmojiSelectorOpen(!isEmojiSelectorOpen);
  };
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const logSelectedEmojiName = (emoji: emojiData) => {
    setSelectedEmoji(emoji.native);
    setIsEmojiSelectorOpen(!isEmojiSelectorOpen);
  };

  const [userUpdatedStatus, setUserUpdatedStatus] = useState("");

  const handleUserUpdatingStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserUpdatedStatus(event.target.value);
  };

  const [userUpdatedStatusHours, setUserUpdatedStatusHours] = useState("");
  const [userUpdatedMins, setUserUpdatedMins] = useState("");

  const handleUserUpdatingHours = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserUpdatedStatusHours(event.target.value);
  };

  const handleUserUpdatingMins = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserUpdatedMins(event.target.value);
  };

  const utils = api.useContext();
  // mutation
  const postStatus = api.status.addNew.useMutation({
    onSuccess: async () => {
      await utils.status.invalidate();
    },
  });
  const postPoints = api.points.addNew.useMutation({
    // onSuccess: async () => {
    //   await refetchPoints(), await refetchAllPoints();
    // },
  });
  const toast = useToast();
  const handleStatusUpdateSubmission = () => {
    if (sessionData?.user.name) {
      postStatus.mutate({
        status: userUpdatedStatus,
        userName: sessionData.user.name,
        emoji: selectedEmoji ? selectedEmoji : "✋",
        hours: parseInt(userUpdatedStatusHours),
        mins: parseInt(userUpdatedMins),
      });

      if (!pointsData?.points) {
        postPoints.mutate({
          points: 1,
          userName: sessionData.user.name,
        });
      } else {
        postPoints.mutate({
          points: pointsData?.points + 1,
          userName: sessionData.user.name,
        });
      }
    }

    onStatusModalClose();
    toast({
      title: "Status updated.",
      description: "Your status is now updated.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

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
              <Logout
                onClick={onLogoutModalOpen}
                style={{ fontSize: "12px", cursor: "pointer" }}
              />
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
              <LocalFireDepartmentIcon
                fontSize="small"
                style={{ cursor: "pointer" }}
              />
            </Tooltip>

            <Badge
              bg="#1A202C"
              size="sm"
              colorScheme="white"
              textAlign="center"
            >
              {pointsData ? pointsData?.points : 0}
            </Badge>
            <Tooltip label="Karma" fontSize="xs">
              <WhatshotIcon fontSize="small" style={{ cursor: "pointer" }} />
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
              label={
                statusData
                  ? statusData?.status
                  : "click to add your first status"
              }
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
                <Button
                  colorScheme="teal"
                  size="xs"
                  onClick={onStatusModalOpen}
                >
                  {statusData?.emoji}
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
        onClose={onStatusModalClose}
        isOpen={isStatusModalOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bgColor="#171923">
          <ModalHeader fontWeight="bold">Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="sm" p="1" px="6">
            <Flex
              position="relative"
              justifyContent="center"
              alignItems="center"
              marginBottom="4"
            >
              {isEmojiSelectorOpen && (
                <Flex position="absolute" zIndex="99" top="0" left="12%">
                  <Picker data={data} onEmojiSelect={logSelectedEmojiName} />
                </Flex>
              )}
              <Button
                colorScheme="teal"
                style={{ backgroundColor: "teal" }}
                onClick={handleEmojiSelector}
              >
                {selectedEmoji ? selectedEmoji : "✋"}
              </Button>

              <Input
                placeholder="What's your status?"
                marginLeft="1"
                borderColor="#2D3748"
                onChange={handleUserUpdatingStatus}
              />
            </Flex>
            <Flex direction="column">
              <Text fontSize="xs" mb="2">
                Clear after:
              </Text>
              <Flex justifyContent="start" alignItems="center">
                <Text fontSize="xs" mx="2">
                  Hours:
                </Text>
                <Select
                  placeholder="hours"
                  borderColor="#2D3748"
                  size="sm"
                  onChange={handleUserUpdatingHours}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </Select>
                <Text fontSize="xs" mx="2">
                  Minutes:
                </Text>
                <Select
                  placeholder="minutes"
                  borderColor="#2D3748"
                  size="sm"
                  onChange={handleUserUpdatingMins}
                >
                  <option value="5">5</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
                </Select>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {userUpdatedStatus && userUpdatedMins && userUpdatedStatusHours ? (
              <Button
                colorScheme="teal"
                variant="outline"
                size="sm"
                onClick={() => handleStatusUpdateSubmission()}
              >
                Update
              </Button>
            ) : (
              <Button colorScheme="teal" variant="outline" size="sm" isDisabled>
                Update
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isCentered
        onClose={onLogoutModalClose}
        isOpen={isLogoutModalOpen}
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
              onClick={onLogoutModalClose}
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
