/* eslint-disable */
import Loading from "@/Components/Loading";
import { LOGIN_USER } from "@/context/Actions/actions";
import { useGlobalContext } from "@/context/globalContext";
import React, { useEffect, useState } from "react";

const useGetUser = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [gateName, setGateName] = useState();
  const { dispatch } = useGlobalContext();

  useEffect(() => {
    const user = sessionStorage.getItem("login");
    setLoading(false);
    if (user) {
      setUser(user);
      dispatch({
        type: LOGIN_USER,
        payload: {
          userName: user,
        },
      });
      return;
    } else {
      setUser("");
      return;
    }
  }, []);

  if (loading) <Loading />;

  return { user, loading };
};

export default useGetUser;
