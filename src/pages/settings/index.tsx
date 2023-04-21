import React from "react";
import Main from "~/layouts/Main";
import Link from "next/link";
import {
  VStack,
  Text,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import { useToast, Flex, Select, Textarea, Button } from "@chakra-ui/react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { timezones, type Timezone } from "~/utils/timezones";
import { api } from "~/utils/api";
import { getSession, useSession } from "next-auth/react";
import type { GetSessionParams } from "next-auth/react";

type userInput = {
  bio: string;
  workingHours: string;
  timeZone: string;
  location: string;
  githubAccount: string;
};

const Settings = () => {
  const tz: Timezone[] = timezones;
  const utils = api.useContext();
  const { data: sessionData } = useSession();
  const toast = useToast();

  const { data: userSettings } = api.settings.userSettings.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const updateUserSettings = api.settings.updateUserSettings.useMutation({
    onSuccess: async () => {
      await utils.settings.invalidate();
    },
  });

  const createUserSettings = api.settings.addUserSettings.useMutation({
    onSuccess: async () => {
      await utils.settings.invalidate();
    },
  });

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as userInput;
    // check if this's the first time user updates the settings
    if (!userSettings) {
      createUserSettings.mutate({
        bio: data.bio,
        workingHours: data.workingHours,
        timeZone: data.timeZone,
        location: data.location,
        githubAccount: data.githubAccount,
      });
      toast({
        title: "Profile updated!",
        description: "Congratulations on your first profile update!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    if (userSettings) {
      const { userId, ...rest } = userSettings;
      const userSettingsData = rest;

      if (JSON.stringify(userSettingsData) !== JSON.stringify(data)) {
        updateUserSettings.mutate({
          bio: data.bio,
          workingHours: data.workingHours,
          timeZone: data.timeZone,
          location: data.location,
          githubAccount: data.githubAccount,
        });
        toast({
          title: "Profile updated!",
          description: "Awesome, your profile is now updated!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Oops!",
          description: "It looks like your profile is up to date!",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };
  return (
    <Main>
      <VStack
        padding="4"
        width="80%"
        paddingTop="8"
        align="start"
        as="form"
        onSubmit={handleSubmit}
      >
        <Breadcrumb
          spacing="6px"
          separator={<ChevronRightIcon style={{ fontSize: "0.8rem" }} />}
          fontSize="xs"
        >
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link href="#">Profile</Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Link href="#">Settings</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Text
          fontSize="2xl"
          textAlign="left"
          paddingTop="4"
          fontWeight="medium"
        >
          Profile Settings
        </Text>
        <Divider orientation="horizontal" width="80%" borderColor="#2D3748" />
        <Flex flexDirection="column" width="80%">
          <Text fontSize="sm" pb="2" fontWeight="bold" paddingTop="4">
            Bio
          </Text>
          <Textarea
            placeholder={
              userSettings?.bio ? userSettings.bio : "tell us about yourself"
            }
            borderColor="#2D3748"
            fontWeight="light"
            name="bio"
            required
          />

          <Text fontSize="sm" pb="2" fontWeight="bold" paddingTop="4">
            Working Hours
          </Text>
          <Input
            placeholder={
              userSettings?.workingHours
                ? userSettings.workingHours
                : "What's your working hours?"
            }
            fontWeight="light"
            borderColor="#2D3748"
            width="max-width"
            name="workingHours"
            required
          />
          <Text fontSize="sm" pb="2" fontWeight="bold" paddingTop="4">
            Timezone
          </Text>
          <Select
            placeholder={
              userSettings?.timeZone
                ? userSettings.timeZone
                : "select your timezone"
            }
            borderColor="#2D3748"
            fontWeight="light"
            color="#718096"
            name="timeZone"
            required
          >
            {tz.map((zone, index) => {
              return (
                <option key={index} value={zone.text}>
                  {zone.text}
                </option>
              );
            })}
          </Select>
          <Text fontSize="sm" pb="2" fontWeight="bold" paddingTop="4">
            Location
          </Text>
          <Input
            placeholder={
              userSettings?.workingHours
                ? userSettings.workingHours
                : "What's your working hours?"
            }
            fontWeight="light"
            borderColor="#2D3748"
            width="max-width"
            name="location"
            required
          />

          <Text fontSize="sm" pb="2" fontWeight="bold" paddingTop="4">
            Github Account
          </Text>
          <InputGroup size="sm">
            <InputLeftAddon
              bgColor="#2D3748"
              borderColor="#2D3748"
              height="auto"
              fontWeight="light"
            >
              github.com/
            </InputLeftAddon>
            <Input
              placeholder={
                userSettings?.githubAccount
                  ? userSettings.githubAccount
                  : "What's your github username?"
              }
              fontWeight="light"
              borderColor="#2D3748"
              name="githubAccount"
              required
            />
          </InputGroup>
          <Button
            mt="8"
            backgroundColor="teal"
            variant="outline"
            colorScheme="teal"
            width="20%"
            type="submit"
          >
            Update Profile
          </Button>
        </Flex>
      </VStack>
    </Main>
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
export default Settings;
