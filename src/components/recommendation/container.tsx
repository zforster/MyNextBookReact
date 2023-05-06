import { Card, Center, Text, Divider, Menu, ActionIcon } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useState } from "react";
import { RecommendationResponse } from "../../datatypes/recommendation";
import Book from "./book";
import { DateTime } from "luxon";
import { IconCopy, IconDotsVertical } from "@tabler/icons";
import { notifications } from "@mantine/notifications";

type BookContainerProps = {
  recommendationResponse: RecommendationResponse;
};

const BookContainer = ({ recommendationResponse }: BookContainerProps) => {
  const [resetCollapse, setResetCollapse] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const date = new Date(recommendationResponse?.timestamp);
  const localTimestamp = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();

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
                navigator.clipboard.writeText(
                  `${window.location}#/recommendation/${recommendationResponse.recommendationId}`
                );
                notifications.show({
                  title: "Success",
                  message: "Link Copied!",
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
    </Card>
  );
};

export default BookContainer;
