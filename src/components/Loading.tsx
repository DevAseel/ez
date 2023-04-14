import React from "react";
import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.400"
        size="xl"
      />
    </div>
  );
};

export default Loading;
