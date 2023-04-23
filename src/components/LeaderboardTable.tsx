import React from "react";
import { Table, Thead, Tbody, Tr, Th, Stack } from "@chakra-ui/react";
import { Td, TableCaption, TableContainer, Heading } from "@chakra-ui/react";
import type { Points } from "@prisma/client";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
type LeaderboardTable = {
  allPoints: Points[] | undefined;
};

const LeaderboardTable = ({ allPoints }: LeaderboardTable) => {
  return (
    <Stack spacing={6}>
      <Heading as="h1" size="md" pl="4" py="2" noOfLines={1}>
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
              <Th fontSize="xs" textAlign="center" color="#A0AEC0">
                Rank
              </Th>
              <Th fontSize="xs" color="#A0AEC0">
                User
              </Th>
              <Th fontSize="xs" color="#A0AEC0" isNumeric>
                Points
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {allPoints?.slice(0, 3).map((user, index) => (
              <Tr key={index}>
                <Td color="#A0AEC0" textAlign="center" fontSize="xs">
                  {index + 1}
                </Td>
                <Td textTransform="capitalize" color="teal.400" fontSize="xs">
                  <Link as={NextLink} href={`/profile/${user.userId}`}>
                    {user.userName}
                  </Link>
                </Td>
                <Td isNumeric color="teal.400" fontSize="xs">
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
