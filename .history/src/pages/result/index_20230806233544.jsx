/* eslint-disable */
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Result = () => {
  const [user, setUser] = useState("");
  const [singleResult, setSingleResult] = useState([]);

  const fetchSingleResult = () => {
    return axios.get(`/api/results`);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["IndividualResult"],
    queryFn: () => fetchSingleResult(),
  });

  useEffect(() => {
    setUser(sessionStorage.getItem("username"));
    // setSingleResult(data?.data[user]);
    // console.log(data?.data);
    // const unique = [...new Set(data?.data[user].map((item) => item.question))];

    const uniqueResult = [
      ...new Map(
        data?.data[user].map((item) => [item["question"], item])
      ).values(),
    ];
    const chartData = uniqueResult.map((item) => {
      return {
        name: `Question${item.question}`,
        uv: 3490,
        pv: item.duration,
        amt: 2100,
      };
    });
    // console.log(chartData);

    setSingleResult(chartData);

    return () => {};
  }, [data]);

  if (isLoading) return "Loading...";

  return (
    <Box width="100vw" height="100vh" display="grid" placeItems="center">
      <Text fontSize="3rem" color="whatsapp.200">
        Showing Results Here for User: {user}
      </Text>
      {singleResult && (
        <ResponsiveContainer width="50%" height="50%">
          <BarChart
            width={70}
            height={50}
            data={singleResult || []}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={50}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export const graphData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default Result;
