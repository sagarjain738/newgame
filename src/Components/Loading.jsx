/* eslint-disable */
import Image from "next/image";
import React from "react";
import loader from "/public/loader.svg";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      {/* <Image priority src={loader} alt="Loading" width={300} height={300} /> */}
      <HashLoader color="red" />
    </div>
  );
};

export default Loading;
