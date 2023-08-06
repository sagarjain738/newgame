/* eslint-disable */
import { Box, Button, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import Loading from "./Loading";
import Timer from "./Timer";
import ButtonTimer from "./ButtonTimer";
import SubmitTimer from "./SubmitTimer";
import Link from "next/link";

const Quiz = ({ userName }) => {
  const [question, setQuestions] = useState([]);
  const [mainTimerEnabled, setMainTimerEnabled] = useState(true);
  const [mainTimer, setMainTimer] = useState(2);
  const [subTimerEnabled, setSubTimerEnabled] = useState(false);
  const [subTimer, setSubTimer] = useState(0);
  const [submitTimerEnabled, setSubmitTimerEnabled] = useState(false);
  const [submitTimer, setSubmitTimer] = useState(0);
  const [page, setPage] = useState(sessionStorage.getItem("page"));
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [enableWarning, setEnableWarning] = useState(false);
  const [user, setUser] = useState(sessionStorage.getItem("username"));
  const [showResult, setShowResult] = useState(false);

  const fetchProjects = (page = 1) =>
    fetch("/api/game?question=" + page).then((res) => res.json());

  const { isLoading, data } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    {
      keepPreviousData: true,
    }
  );

  const mutation = useMutation((newTodo) => {
    return axios.post("/api/game", newTodo);
  });

  const handleSubmit = () => {
    mutation.mutate({
      name: user,
      question: parseInt(page),
      result: answer === correctAnswer,
      duration: parseInt(10 - submitTimer),
    });
    if (page == 5) {
      setPage((prev) => +prev + 1);
      sessionStorage.setItem("page", page);
      setShowResult(true);
      setMainTimer(0);
      setMainTimerEnabled(false);
      setSubTimer(0);
      setSubTimerEnabled(false);
      setSubmitTimer(0);
      setSubmitTimerEnabled(false);
      return;
    }
    setAnswer("");
    setCorrectAnswer("");
    setPage((prev) => +prev + 1);
    sessionStorage.setItem("page", page);
    setMainTimer(5);
    setMainTimerEnabled(true);
    setSubTimer(0);
    setSubTimerEnabled(false);
    setSubmitTimer(0);
    setSubmitTimerEnabled(false);
  };

  useEffect(() => {
    if (page == 5) {
      setShowResult(true);
    }
  }, []);

  if (isLoading) return <Loading />;
  if (mutation.isLoading) return <Loading />;

  if (mainTimerEnabled)
    return (
      <Timer
        page={page}
        setMainTimer={setMainTimer}
        setMainTimerEnabled={setMainTimerEnabled}
        mainTimer={mainTimer}
        setSubTimer={setSubTimer}
        setSubTimerEnabled={setSubTimerEnabled}
      />
    );

  if (!showResult)
    return (
      <Box
        style={{
          display: "grid",
          placeItems: "center",
          height: "50%",
          padding: "0 2rem",
        }}
      >
        {/* Radio Buttons */}
        {data.map((item, index) => {
          return (
            <Box key={index + 1} m="1.7rem 0">
              <Text fontSize="3rem" mb="2rem">
                {item.Question}
              </Text>
              <RadioGroup
                key={index}
                onChange={(a) => {
                  setAnswer(a);
                  setCorrectAnswer(item?.answer);
                }}
              >
                <Stack direction="row">
                  {item.options.map((option, index2) => {
                    return (
                      <Radio value={option} key={index + index2}>
                        {option}
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </Box>
          );
        })}

        {/* Timer For Submitting Answer */}
        {submitTimerEnabled && (
          <SubmitTimer
            page={page}
            setSubmitTimer={setSubmitTimer}
            setSubmitTimerEnabled={setSubmitTimerEnabled}
            submitTimer={submitTimer}
            handleSubmit={handleSubmit}
          />
        )}

        {/* Timer To Read Question */}
        {subTimerEnabled && (
          <ButtonTimer
            page={page}
            setSubTimer={setSubTimer}
            setSubTimerEnabled={setSubTimerEnabled}
            subTimer={subTimer}
            setSubmitTimer={setSubmitTimer}
            setSubmitTimerEnabled={setSubmitTimerEnabled}
            setEnableWarning={setEnableWarning}
          />
        )}

        {!subTimerEnabled && (
          <Button
            height="3rem"
            width="15rem"
            bg="teal.700"
            fontSize="1.2rem"
            _hover={{
              bg: "teal.500",
            }}
            isLoading={false}
            colorScheme="blue"
            spinner={<BeatLoader size={8} color="white" />}
            onClick={handleSubmit}
            isDisabled={!answer}
          >
            Submit Answer
          </Button>
        )}

        {!answer && enableWarning && (
          <Text mt="2rem" color="red">
            Please Select an Answer
          </Text>
        )}
      </Box>
    );

  if (showResult || page == 5)
    return (
      <Box height="100vh" width="100vw" display="grid" placeItems="center">
        <Button height="5rem" width="30rem" padding="3rem" fontSize="2rem">
          <Link href="/result">Go To Result</Link>
        </Button>
      </Box>
    );
};

export default Quiz;
