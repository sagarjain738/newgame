/* eslint-disable */
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

const ButtonTimer = ({
  page,
  setSubTimer,
  setSubTimerEnabled,
  subTimer,
  setSubmitTimer,
  setSubmitTimerEnabled,
  setEnableWarning,
}) => {
  useEffect(() => {
    let times = setInterval(() => {
      setSubTimer((prev) => {
        if (prev <= 0) {
          clearInterval(times);
          setSubTimer(0);
          setSubTimerEnabled(false);
          setSubmitTimer(5);
          setSubmitTimerEnabled(true);
          setEnableWarning(true);
          return;
        }
        return prev - 1;
      });
    }, 2000);

    return () => clearInterval(times);
  }, [page]);

  return (
    <Box width="100vw" height="50vh" display="grid" placeItems="center">
      <Text fontSize="2rem">{subTimer}</Text>
    </Box>
  );
};

export default ButtonTimer;
