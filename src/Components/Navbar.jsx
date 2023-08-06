/* eslint-disable */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { toast } from "react-toastify";

const Navbar = () => {
  const [menu, setMenu] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [loginUser, setLoginUser] = useState(
    sessionStorage.getItem("username")
  );
  const router = useRouter();
  const [wish, setWish] = useState("");

  useEffect(() => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr >= 1 && curHr < 6) {
      setWish("it's Midnight,");
      return;
    }
    if (curHr <= 6) {
      setWish("it's Early Morning,");
      return;
    }
    if (curHr < 12) {
      setWish("Good Morning,");
      return;
    }
    if (curHr >= 12 && curHr < 17) {
      setWish("Good Afternoon,");
      return;
    }
    if (curHr >= 17 && curHr <= 19) {
      setWish("Good Evening,");
      return;
    } else {
      setWish("Good Night,");
      return;
    }
  });
  return (
    <nav>
      <Box
        className={isDarkTheme ? "bg-gray-800" : "white"}
        shadow="xl"
        mb="2rem"
        fontSize="md"
      >
        <Flex
          height="11vh"
          width="100vw"
          maxWidth="1700px"
          margin="0 auto"
          justifyContent="space-between"
          alignItems="center"
          padding="0 2rem"
        >
          {/* Logo */}
          <Box flex="4">
            <Image src="/Logo.png" width="200" height="200" alt="Logo" />
          </Box>

          {/* Right User Side */}
          <Flex
            flex="2"
            justifyContent="flex-end"
            alignItems="center"
            gap="2rem"
            position="relative"
          >
            <Text
              color={isDarkTheme ? "white" : "gray.700"}
              display="flex"
              alignItems="center"
            >
              {wish}
              <span
                style={{
                  marginLeft: "5px",
                  textTransform: "capitalize",
                  fontSize: "1.2rem",
                }}
              >
                {loginUser}
              </span>
            </Text>

            <Popover>
              <PopoverTrigger>
                <Button
                  bg="transparent"
                  _hover={{
                    bg: "transparent",
                  }}
                >
                  <Avatar bg="blue.500" size="md" cursor="pointer" />
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent width="15rem" shadow="dark-lg">
                  <PopoverArrow />
                  <PopoverHeader>
                    <Text fontSize=".9rem" fontWeight="light" ml="1rem">
                      Hello, {loginUser}
                    </Text>
                  </PopoverHeader>
                  <PopoverCloseButton
                    _hover={{
                      bg: "blue.500",
                      color: "white",
                    }}
                  />
                  {/* <PopoverBody>
                    <Link
                      style={{
                        cursor: "pointer",
                      }}
                      href={`/users/:${userId}`}
                    >
                      <Button
                        variant="ghost"
                        textAlign="left"
                        _hover={{
                          bg: "transparent",
                        }}
                      >
                        Your Profile
                      </Button>
                    </Link>
                  </PopoverBody> */}
                  <PopoverFooter>
                    <Button
                      variant="ghost"
                      textAlign="left"
                      _hover={{
                        bg: "trnsparent",
                      }}
                      onClick={() => {
                        sessionStorage.removeItem("login");
                        toast.success(`${loginUser} Logged-Out Successfully`, {
                          position: "top-right",
                          autoClose: 2500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                        router.replace("/login");
                      }}
                    >
                      Logout
                      <HiOutlineLogout
                        fontSize="1.2rem"
                        style={{
                          marginLeft: "1rem",
                        }}
                      />
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
          </Flex>
        </Flex>
      </Box>
    </nav>
  );
};

export default Navbar;
