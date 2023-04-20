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
  Flex,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { timezones, type Timezone } from "~/utils/timezones";

const Settings = () => {
  const tz: Timezone[] = timezones;
  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
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
            placeholder="tell us about yourself"
            borderColor="#2D3748"
            fontWeight="light"
            name="bio"
          />

          <Text fontSize="sm" pb="2" fontWeight="bold" paddingTop="4">
            Working Hours
          </Text>
          <Input
            placeholder="What's your working hours?"
            fontWeight="light"
            borderColor="#2D3748"
            width="max-width"
            name="workingHours"
          />
          <Text fontSize="sm" pb="2" fontWeight="bold" paddingTop="4">
            Timezone
          </Text>
          <Select
            placeholder="select your timezone"
            borderColor="#2D3748"
            fontWeight="light"
            color="#718096"
            name="timeZone"
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
            placeholder="What's your working hours?"
            fontWeight="light"
            borderColor="#2D3748"
            width="max-width"
            name="location"
          />

          <Text fontSize="sm" pb="2" fontWeight="bold" paddingTop="4">
            Github Account
          </Text>
          <InputGroup size="sm">
            <InputLeftAddon
              bgColor="#2D3748"
              placeholder="What's your status?"
              borderColor="#2D3748"
              height="auto"
              fontWeight="light"
            >
              github.com/
            </InputLeftAddon>
            <Input
              placeholder="your github username"
              fontWeight="light"
              borderColor="#2D3748"
              name="githubAccount"
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

export default Settings;
