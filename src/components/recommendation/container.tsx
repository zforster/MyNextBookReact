import { Card, Center, Text, Divider, Menu, ActionIcon } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";
import { RecommendationResponse } from "../../datatypes/recommendation";
import Book from "./book";
import { DateTime } from "luxon";
import { IconCopy, IconDotsVertical } from "@tabler/icons";
import { notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";
import ReactGA from "react-ga4";

type BookContainerProps = {
  recommendationResponse: RecommendationResponse;
  defaultSlide?: number;
};

const BookContainer = ({
  recommendationResponse,
  defaultSlide,
}: BookContainerProps) => {
  const [resetCollapse, setResetCollapse] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(defaultSlide || 0);

  const date = new Date(recommendationResponse?.timestamp);
  const localTimestamp = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();

  const isMobile = useMediaQuery("(max-width: 41em)");

  if (isMobile === undefined) {
    return null;
  }
  return (
    <Card withBorder maw={"500px"}>
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <Menu opened={openMenu} onChange={setOpenMenu}>
          <Menu.Target>
            <ActionIcon size="sm">
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                if (`${window.location}`.includes("#/recommendation/")) {
                  navigator.clipboard.writeText(`${window.location}`);
                } else {
                  navigator.clipboard.writeText(
                    `${window.location}#/recommendation/${recommendationResponse.recommendationId}/${currentSlide}`
                  );
                }
                notifications.show({
                  title: "Success",
                  message: "Link Copied!",
                });
                ReactGA.event({
                  category: "Book Reccomendation",
                  action: "Copy URL",
                  label: recommendationResponse.recommendationId,
                });
              }}
              icon={<IconCopy size={14} />}
            >
              Copy Link
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      <Center>
        <Text size={"xs"} align="center">
          {`Posted ${DateTime.fromISO(localTimestamp).toRelative()}`}
        </Text>
      </Center>
      <Center>
        <Text
          sx={{ maxWidth: "500px" }}
          size={"sm"}
          lineClamp={3}
          align="center"
        >
          {recommendationResponse?.userInput}
        </Text>
      </Center>

      <Divider my="xs" />

      <Carousel
        onSlideChange={() => {
          setResetCollapse(true);
        }}
        slideGap="xl"
        maw={500}
        mx="auto"
        withIndicators
        loop
        initialSlide={defaultSlide || 0}
        onNextSlide={() => setCurrentSlide((prevSlide) => prevSlide + 1)}
        onPreviousSlide={() => setCurrentSlide((prevSlide) => prevSlide - 1)}
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
              isMobile={isMobile}
              key={book.subtitle}
              recommendation={book}
              resetCollapse={resetCollapse}
              setResetCollapse={setResetCollapse}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Card>
  );
};

export default BookContainer;
