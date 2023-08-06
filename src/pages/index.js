/* eslint-disable */
import Quiz from "@/Components/Quiz";
import { Inter, Poppins, Roboto } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: ["100", "300", "400"], subsets: ["latin"] });
const poppins = Poppins({
  weight: ["100", "200", "400"],
  subsets: ["devanagari"],
});

export default function Home() {
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loginName = sessionStorage.getItem("username");
    console.log(loginName);
    if (loginName) {
      setUser(loginName);
      return;
    } else {
      router.replace("/login");
    }
  }, []);

  if (user)
    return (
      <>
        <Head>
          <title>LRC Quiz Game</title>
          <meta
            name="description"
            content="Honeywell Automation India Limited"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main
          className={poppins.className}
          style={{
            height: "100%",
            maxHeight: "90vh",
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          <Navbar />
          <Quiz />
        </main>
      </>
    );
}
