import {
  AppShell,
  Center,
  Container,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";
import { Helmet } from "react-helmet-async";

const Landing = () => {
  const mainTitle = () => (
    <Center style={{ display: "flex", flexDirection: "column" }}>
      <Title pt="xl" size="h2" color="#16b576">
        PagePundit
      </Title>

      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Title size="40px" pt="lg" align="center">
          AI Book Recommendations
          <span
            style={{
              paddingLeft: "10px",
              fontSize: "40px",
            }}
          >
            📖
          </span>
        </Title>
      </Container>

      <Text maw="500px" align="center" size="20px" pt="lg" color="#71717a">
        Let{" "}
        <span style={{ color: "#2e2e2e", fontWeight: "bold" }}>
          Artifical Intelligence
        </span>{" "}
        take the hassle out of finding your next great read
      </Text>
    </Center>
  );

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell>
        <Helmet>
          <title>PagePundit</title>
          <link rel="canonical" href={`${window.location}`} />
        </Helmet>
        {mainTitle()}
      </AppShell>
    </MantineProvider>
  );
};

export default Landing;
