import React from "react";
import { Table, Thead, Tbody, Tr, Th, Stack } from "@chakra-ui/react";
import { Td, TableCaption, TableContainer, Heading } from "@chakra-ui/react";
import type { Points } from "@prisma/client";

type LeaderboardTable = {
  allPoints: Points[] | undefined;
};

const LeaderboardTable = ({ allPoints }: LeaderboardTable) => {
  return (
    <Stack spacing={6}>
      <Heading as="h1" size="xl" pl="4" py="1" noOfLines={1}>
        Leaderboard 🚀
      </Heading>
      <TableContainer>
        <Table variant="unstyled">
          <TableCaption
            fontSize="xs"
            fontStyle="italic"
            color="#A0AEC0"
            fontWeight="thin"
          >
            Leaderboard table updates automatically.
          </TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center" color="#A0AEC0">
                Rank
              </Th>
              <Th color="#A0AEC0">User</Th>
              <Th color="#A0AEC0" isNumeric>
                Points
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {allPoints?.map((user, index) => (
              <Tr key={index}>
                <Td color="#A0AEC0" textAlign="center">
                  {index + 1}
                </Td>
                <Td textTransform="capitalize" color="teal.400">
                  {user.userName}
                </Td>
                <Td isNumeric color="teal.400">
                  {user.points}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default LeaderboardTable;