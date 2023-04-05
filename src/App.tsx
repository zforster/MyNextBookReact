import { AppShell, Card, MantineProvider, Center, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

// apis
import { endpoints } from "./apis/recommendation";
import Book from "./components/book";
import { HeaderBanner } from "./components/header";
import { useSelector } from "react-redux";
import Nav from "./components/nav";

const App = () => {
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
      <AppShell header={<HeaderBanner />} navbar={<Nav />}>
        <Center>
          {data && (
            <Card p="xl">
              <Card.Section p="xs">
                <Text sx={{ maxWidth: "500px" }} size={"md"} lineClamp={3}>
                  {data.userInput}
                </Text>
              </Card.Section>

              <Card.Section p="xs">
                <Carousel
                  slideGap="xl"
                  maw={500}
                  mx="auto"
                  withIndicators
                  loop
                  height={400}
                >
                  {data?.books?.map((book) => (
                    <Carousel.Slide>
                      <Center>
                        <Book recommendation={book} />
                      </Center>
                    </Carousel.Slide>
                  ))}
                </Carousel>
              </Card.Section>

              <Card.Section p="xs">
                <Text>Regenerate Response</Text>
              </Card.Section>
            </Card>
          )}
        </Center>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
