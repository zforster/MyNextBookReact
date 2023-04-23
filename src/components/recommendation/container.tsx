import { Card, Center, Text, Divider } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";
import { RecommendationResponse } from "../../datatypes/recommendation";
import Book from "./book";
import { DateTime } from "luxon";

type BookContainerProps = {
  recommendationResponse: RecommendationResponse;
};

const BookContainer = ({ recommendationResponse }: BookContainerProps) => {
  const [resetCollapse, setResetCollapse] = useState(false);

  const date = new Date(recommendationResponse?.timestamp);
  const localTimestamp = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();

  return (
    <Center p="xl">
      <Card p="xl" withBorder>
        <Card.Section p="xs">
          <Text size={"xs"} align="center">
            {`Posted ${DateTime.fromISO(localTimestamp).toRelative()}`}
          </Text>
          <Text
            sx={{ maxWidth: "500px" }}
            size={"sm"}
            lineClamp={3}
            align="center"
          >
            {recommendationResponse?.userInput}
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
            {recommendationResponse?.books?.map((book) => (
              <Carousel.Slide
                key={`${book.title} ${book.subtitle}`}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Book
                  key={book.subtitle}
                  recommendation={book}
                  resetCollapse={resetCollapse}
                  setResetCollapse={setResetCollapse}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Card.Section>
      </Card>
    </Center>
  );
};

export default BookContainer;
