import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const mutation = useMutation(
    (newTodo) => {
      return axios.post("/api/login", newTodo);
    },
    {
      onSuccess: () => {
        return router.replace("/");
      },
    }
  );

  const handleSubmit = () => {
    var nameRegex = /^[a-zA-Z0-9_.]+$/.test(username);
    // /^[a-z][a-z]+/gi
    setError(false);
    if (nameRegex) {
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("page", 1);
      mutation.mutate({ username: username });
    } else if (!nameRegex) {
      setError(true);
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="grid"
      placeItems="center"
      gap="-10rem"
    >
      <Box display="grid" placeItems="center" gap="5rem">
        <Input
          onChange={(a) => setUsername(a.target.value)}
          value={username}
          maxWidth="35rem"
          width="30rem"
          border="2px solid black"
          p="1.7rem 1rem"
          fontSize="1.2rem"
          placeholder="Enter Login Name"
          _placeholder={{
            color: "green",
          }}
          _hover={{
            border: "2px solid black",
          }}
          _focus={{
            border: "none",
            outline: "none",
          }}
          _active={{
            border: "none",
            outline: "none",
          }}
          _selected={{
            border: "none",
            outline: "none",
          }}
        />

        <Button
          size="lg"
          isLoading={mutation.isLoading}
          width="10rem"
          height="4rem"
          onClick={handleSubmit}
        >
          Submit
        </Button>

        {mutation.isError ? (
          <Text> {mutation.error?.response?.data}</Text>
        ) : null}
        {error && (
          <Text color="red" fontSize="1.7rem">
            Please enter valid username
          </Text>
        )}
        {mutation.isSuccess ? <Text>Todo added!</Text> : null}
      </Box>
    </Box>
  );
};

export default Login;
