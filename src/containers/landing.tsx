import {
  Button,
  Center,
  Container,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import { Helmet } from "react-helmet-async";
import "../styles/animation.css";

import { useMediaQuery } from "@mantine/hooks";

const Landing = () => {
  const isMobile = useMediaQuery("(max-width: 41em)");

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Helmet>
        <title>PagePundit | AI Book Recommendations</title>
        <link rel="canonical" href={`${window.location}`} />
      </Helmet>
      <Center
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "50px",
        }}
      >
        <Title py="xl" size={isMobile ? "h5" : "h2"} color="#16b576">
          PagePundit
        </Title>

        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            textShadow: "0 3px 0 #e2e2e2",
          }}
        >
          <Title size={isMobile ? "25px" : "50px"} align="center" px="xl">
            AI Book Recommendations
            <span
              style={{
                paddingLeft: "10px",
                fontSize: isMobile ? "25px" : "50px",
              }}
            >
              📖
            </span>
          </Title>
        </Container>

        <Text
          maw="500px"
          align="center"
          size={isMobile ? "15px" : "20px"}
          py="xl"
          px="xl"
          color="#71717a"
        >
          Let{" "}
          <span style={{ color: "#2e2e2e", fontWeight: "bold" }}>
            Artifical Intelligence
          </span>{" "}
          take the hassle out of finding your next great read
        </Text>

        <Container py="xl">
          <Button
            className="gradient-button"
            style={{
              background:
                "linear-gradient(60deg, #16b576, #5073b8, #1098ad, #07b39b, #6fba82)",
              animation: "gradientAnimation 3.5s ease infinite alternate",
              backgroundSize: "300% 300%",
            }}
            size={isMobile ? "sm" : "md"}
            onClick={() => window.open("/#/home", "_self")}
          >
            Get Started Now!
          </Button>
        </Container>
      </Center>
    </MantineProvider>
  );
};

export default Landing;
