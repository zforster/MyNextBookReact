import {
  AppShell,
  Card,
  MantineProvider,
  Center,
  Text,
  Divider,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";

// apis
import { endpoints } from "./apis/recommendation";
import Book from "./components/book";
import { HeaderBanner } from "./components/header";
import { useSelector } from "react-redux";
import { useState } from "react";

const App = () => {
  const [resetCollapse, setResetCollapse] = useState(false);

  const { data } = useSelector(
    endpoints.getRecommendationsFromText.select("recommendation-search")
  );

  return (
    <MantineProvider
      theme={{
        primaryShade: 3,
        colorScheme: "dark",
        primaryColor: "teal",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AppShell header={<HeaderBanner />}>
        <Center>
          {data && (
            <Card p="xl" withBorder>
              <Card.Section p="xs">
                <Text
                  sx={{ maxWidth: "500px" }}
                  size={"sm"}
                  lineClamp={3}
                  align="center"
                >
                  {data.userInput}
                </Text>
              </Card.Section>

              <Divider my="xs" />

              <Card.Section p="xs">
                <Carousel
                  onSlideChange={() => {
                    setResetCollapse(true);
                  }}
                  slideGap="xl"
                  maw={500}
                  mx="auto"
                  withIndicators
                  loop
                >
                  {data?.books?.map((book) => (
                    <Carousel.Slide
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Book
                        recommendation={book}
                        resetCollapse={resetCollapse}
                        setResetCollapse={setResetCollapse}
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </Card.Section>
            </Card>
          )}
        </Center>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
